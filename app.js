/* =============================================
   app.js — Relax Mobile Review Widget
   ============================================= */

import { getRandomReview } from './reviews.js';

/* ─── CONFIGURATION (edit these values) ─── */
const CONFIG = {
  shopName:       'Relax Mobile',          // ← Your shop name
  ownerName:      'Tejas',                 // ← Owner's first name
  location:       'Your Area, City',       // ← Shop locality (for SEO in reviews)
  googleMapsUrl:  'https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID_HERE', // ← Google Maps review link
  whatsappNumber: '919999999999',          // ← WhatsApp number (country code + number, no +)
  geminiApiKey:   'YOUR_GEMINI_API_KEY',   // ← Free Gemini API key from https://aistudio.google.com
};
/* ─────────────────────────────────────────── */

/* ─── DOM References ─── */
const stars           = document.querySelectorAll('.star-btn');
const generateBtn     = document.getElementById('generateBtn');
const regenBtn        = document.getElementById('regenBtn');
const reviewSection   = document.getElementById('reviewSection');
const reviewText      = document.getElementById('reviewText');
const copyBtn         = document.getElementById('copyBtn');
const proceedBtn      = document.getElementById('proceedBtn');
const feedbackSection = document.getElementById('feedbackSection');
const feedbackText    = document.getElementById('feedbackText');
const sendWhatsApp    = document.getElementById('sendWhatsApp');
const loadingSkeleton = document.getElementById('loadingSkeleton');
const ratingLabel     = document.getElementById('ratingLabel');
const toastContainer  = document.getElementById('toastContainer');
const shopNameEl      = document.getElementById('shopName');
const ownerNameEl     = document.getElementById('ownerName');
const ownerNameEl2    = document.getElementById('ownerName2');
const categorySection = document.getElementById('categorySection');
const catChips        = document.querySelectorAll('.cat-chip');

/* ─── State ─── */
let selectedRating   = 0;
let selectedCategory = null;   // { category, label }
let generatedReview  = '';
let isGenerating     = false;

/* ─── Init ─── */
function init() {
  // Inject config into page
  if (shopNameEl) shopNameEl.textContent = CONFIG.shopName;
  if (ownerNameEl) ownerNameEl.textContent = CONFIG.ownerName;
  if (ownerNameEl2) ownerNameEl2.textContent = CONFIG.ownerName;

  // Bind star events
  stars.forEach((star) => {
    star.addEventListener('click', () => handleStarClick(parseInt(star.dataset.value)));
    star.addEventListener('mouseenter', () => highlightStars(parseInt(star.dataset.value)));
    star.addEventListener('mouseleave', () => highlightStars(selectedRating));
  });

  generateBtn?.addEventListener('click', handleGenerate);
  regenBtn?.addEventListener('click', handleGenerate);
  copyBtn?.addEventListener('click', handleCopy);
  proceedBtn?.addEventListener('click', handleProceed);
  sendWhatsApp?.addEventListener('click', handleWhatsApp);

  // Category chip clicks
  catChips.forEach((chip) => {
    chip.addEventListener('click', () => handleCategoryClick(chip));
  });
}

/* ─── Star Rating ─── */
function handleStarClick(rating) {
  selectedRating = rating;
  highlightStars(rating);
  updateRatingLabel(rating);

  // Auto-generate if category is already selected
  if (selectedCategory) {
    handleGenerate();
  } else {
    ratingLabel.textContent = `${RATING_LABELS[rating]} — Select repair category above`;
  }
}

function highlightStars(count) {
  stars.forEach((star) => {
    const val = parseInt(star.dataset.value);
    star.classList.toggle('active', val <= count);
    star.setAttribute('aria-checked', val <= count ? 'true' : 'false');
  });
}

const RATING_LABELS = ['', 'Poor 😞', 'Fair 😐', 'Good 😊', 'Very Good 😃', 'Excellent! 🌟'];
function updateRatingLabel(rating) {
  ratingLabel.textContent = RATING_LABELS[rating] || '';
  ratingLabel.className = `rating-label rating-${rating}`;
}

/* ─── Category Selection ─── */
function handleCategoryClick(chip) {
  // Deselect all chips
  catChips.forEach((c) => {
    c.classList.remove('selected');
    c.setAttribute('aria-pressed', 'false');
  });

  // Select clicked chip
  chip.classList.add('selected');
  chip.setAttribute('aria-pressed', 'true');

  selectedCategory = {
    category: chip.dataset.category,
    label: chip.dataset.label,
  };

  // Auto-generate if rating is already selected
  if (selectedRating > 0) {
    updateRatingLabel(selectedRating);
    handleGenerate();
  } else {
    ratingLabel.textContent = `Selected: ${selectedCategory.label} — Tap stars to rate 👇`;
  }
}

function resetCategorySelection() {
  selectedCategory = null;
  catChips.forEach((c) => {
    c.classList.remove('selected');
    c.setAttribute('aria-pressed', 'false');
  });
}

/* ─── Review Generation ─── */
async function handleGenerate() {
  if (!selectedRating || !selectedCategory) return;
  if (isGenerating) return;
  isGenerating = true;

  // Hide old sections and show skeleton
  reviewSection.hidden = true;
  feedbackSection.hidden = true;
  loadingSkeleton.hidden = false;
  loadingSkeleton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  if (generateBtn) {
    generateBtn.disabled = true;
    generateBtn.textContent = '✨ Generating...';
  }
  if (regenBtn) {
    regenBtn.disabled = true;
    regenBtn.textContent = '🔄 Generating...';
  }

  try {
    if (selectedRating === 5) {
      generatedReview = await generateAIReview();
      loadingSkeleton.hidden = true;
      showReviewSection(generatedReview);
    } else {
      // Private feedback flow — pre-fill with a soft template including category
      const catInfo = selectedCategory ? ` regarding my ${selectedCategory.label}` : '';
      generatedReview = `Hi ${CONFIG.ownerName}, I visited ${CONFIG.shopName}${catInfo} and wanted to share some feedback privately. I gave ${selectedRating} star(s) because: `;
      loadingSkeleton.hidden = true;
      showFeedbackSection(generatedReview);
    }
  } catch (err) {
    loadingSkeleton.hidden = true;
    showToast('Generation failed. Using template.', 'error');
    if (selectedRating === 5) {
      generatedReview = getRandomReview({
        shop: CONFIG.shopName,
        owner: CONFIG.ownerName,
        location: CONFIG.location,
        category: selectedCategory?.category
      });
      showReviewSection(generatedReview);
    } else {
      showFeedbackSection(`Hi ${CONFIG.ownerName}, I wanted to share private feedback about ${CONFIG.shopName}. `);
    }
  } finally {
    isGenerating = false;
    if (generateBtn) {
      generateBtn.disabled = false;
      generateBtn.textContent = '✨ Generate My Review';
    }
    if (regenBtn) {
      regenBtn.disabled = false;
      regenBtn.textContent = '🔄 Try Another';
    }
  }
}

async function generateAIReview() {
  const catLabel = selectedCategory?.label || 'mobile phone';

  // 1. Try Chrome built-in AI (Gemini Nano)
  if (typeof window !== 'undefined' && window.LanguageModel) {
    try {
      const canCreate = await window.LanguageModel.availability();
      if (canCreate === 'available' || canCreate === 'downloading') {
        const session = await window.LanguageModel.create({
          systemPrompt: `You are an expert review writer. Write genuine, SEO-optimized Google Maps reviews for a mobile phone repair shop called "${CONFIG.shopName}" in ${CONFIG.location}. The owner, ${CONFIG.ownerName}, personally repairs every device. Reviews should sound natural, be 80-120 words, mention the location and owner name naturally, use relevant keywords, and end positively.`
        });
        const review = await session.prompt(
          `Write a unique 5-star Google Maps review for ${CONFIG.shopName}. The customer had a "${catLabel}" repaired. Make it sound like a real happy customer, naturally mentioning the type of repair. Do NOT include star emojis at the start. Write only the review text, nothing else.`
        );
        session.destroy();
        return review.trim();
      }
    } catch (e) {
      console.warn('Chrome AI unavailable, trying Gemini API:', e);
    }
  }

  // 2. Try Gemini API (cloud, any browser)
  if (CONFIG.geminiApiKey && CONFIG.geminiApiKey !== 'YOUR_GEMINI_API_KEY') {
    try {
      const prompt = `Write a unique, genuine-sounding 5-star Google Maps review for a mobile phone repair shop called "${CONFIG.shopName}" located in ${CONFIG.location}. The owner's name is ${CONFIG.ownerName} who personally repairs every device. The customer came in for: "${catLabel}". Naturally mention this repair type in the review. The review should be 80-120 words, sound like a real happy customer, include relevant SEO keywords (mobile repair, quick service, etc.), mention the location and owner's name, and end with a strong recommendation. Write only the review text, no intro, no star symbols at the start.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${CONFIG.geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 200 }
          })
        }
      );
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch (e) {
      console.warn('Gemini API failed, using static templates:', e);
    }
  }

  // 3. Static template fallback
  return getRandomReview({
    shop: CONFIG.shopName,
    owner: CONFIG.ownerName,
    location: CONFIG.location,
    category: selectedCategory?.category,
  });
}

/* ─── UI Sections ─── */
function showReviewSection(text) {
  reviewText.value = text;
  reviewSection.hidden = false;
  reviewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  // Auto-resize textarea
  autoResize(reviewText);
}

function showFeedbackSection(prefill) {
  feedbackText.value = prefill;
  feedbackSection.hidden = false;
  feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  feedbackText.focus();
  feedbackText.setSelectionRange(feedbackText.value.length, feedbackText.value.length);
  autoResize(feedbackText);
}

/* ─── Copy & Redirect ─── */
async function handleCopy() {
  const text = reviewText.value.trim();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast('✅ Review copied to clipboard!', 'success');
    copyBtn.textContent = '✅ Copied!';
    setTimeout(() => { copyBtn.textContent = '📋 Copy Review'; }, 2500);
  } catch {
    showToast('Copy failed — please select and copy manually.', 'error');
  }
}

async function handleProceed() {
  const text = reviewText.value.trim();
  if (!text) return;

  // Copy first, then open Google Maps
  try {
    await navigator.clipboard.writeText(text);
    showToast('✅ Copied! Opening Google Maps...', 'success');
  } catch {
    showToast('Opening Google Maps... (please paste your review manually)', 'info');
  }

  setTimeout(() => {
    window.open(CONFIG.googleMapsUrl, '_blank', 'noopener,noreferrer');
  }, 1000);
}

/* ─── WhatsApp Feedback ─── */
function handleWhatsApp() {
  const text = feedbackText.value.trim();
  if (!text) {
    showToast('Please type your feedback first.', 'info');
    return;
  }
  const encoded = encodeURIComponent(text);
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  showToast('Opening WhatsApp...', 'success');
}

/* ─── Toast Notifications ─── */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('visible'));
  });

  // Auto-remove
  setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 3500);
}

/* ─── Textarea Auto-resize ─── */
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

document.querySelectorAll('textarea').forEach((ta) => {
  ta.addEventListener('input', () => autoResize(ta));
});

/* ─── Kick off ─── */
init();
