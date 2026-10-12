/**
 * reviews.js
 * A curated pool of SEO-friendly review templates for a mobile repair shop.
 * Templates use {shop}, {owner}, {location} as placeholders — filled at runtime.
 * Designed to sound natural, vary in tone/length, and rank for local repair keywords.
 */

const REVIEW_TEMPLATES = [
  // ── Long-form, high keyword density ──
  `Absolutely brilliant service at {shop} in {location}! {owner} personally handled my phone repair and fixed it within the hour. The screen replacement was done with original-quality parts and looks brand new. If you're searching for a reliable mobile repair shop near {location}, this is THE place. Highly recommend! ⭐⭐⭐⭐⭐`,

  `I had a cracked screen and a dead battery on my phone. Took it to {shop} in {location} and {owner} fixed both issues same day! The pricing was transparent, no hidden charges. Best mobile repair experience I've ever had. Will definitely return for any future device issues.`,

  `Outstanding mobile repair service by {owner} at {shop}! My phone had water damage and I thought it was gone forever, but {owner} revived it completely. The attention to detail and expertise shown was incredible. Trusted mobile technician in {location} — highly recommended for any smartphone or tablet repair!`,

  `{shop} in {location} is a gem! Walked in with a shattered display and walked out 45 minutes later with a perfectly working phone. {owner} is skilled, honest, and very reasonably priced. No upselling, just genuine repair expertise. This is my go-to mobile repair shop from now on.`,

  // ── Medium-form, conversational ──
  `Really impressed with the quick turnaround at {shop}. {owner} diagnosed the charging port issue in minutes and had it fixed in under 30 minutes. Professional, friendly and affordable. 5 stars without hesitation!`,

  `Best phone repair shop in {location}! {owner} repaired my Samsung with precision and care. He explained exactly what was wrong and what he'd do to fix it. No surprises on the bill. This kind of honest service is rare — absolute 5-star experience.`,

  `I've tried several repair shops before but {shop} is on another level. {owner} personally works on every device, which gives you confidence that your phone is in expert hands. Fixed my iPhone camera and speaker issue perfectly. Strongly recommended!`,

  `Came in with a dead phone and left with a fully working device, all thanks to {owner} at {shop}. Fair prices, fast service, and genuine care for the customer. Don't go anywhere else for mobile repairs in {location}!`,

  `{owner} at {shop} is a true professional. Fixed my phone's broken display and also noticed a loose battery connector — fixed that too at no extra charge. This level of service is why this shop deserves every 5-star review it gets!`,

  // ── Short punchy reviews ──
  `Quick, affordable, and excellent quality repair at {shop} in {location}. {owner} is the best mobile technician around. 10/10 would recommend to anyone with a broken phone!`,

  `Fixed in 30 minutes, works like new. {owner} at {shop} is amazing. Highly recommended for any mobile repair in {location}!`,

  `{shop} = best mobile repair in {location}. {owner} fixed my phone perfectly. Honest pricing, fast service, great results. Go here!`,

  // ── Specific repair scenarios ──
  `My phone fell in water and I panicked! Rushed to {shop} and {owner} performed water damage treatment immediately. Two days later my phone was completely fine. Couldn't be more grateful. Exceptional service and genuine expertise in {location}!`,

  `Needed a battery replacement for my old phone. {owner} at {shop} used a genuine-quality battery and the phone now lasts all day again. Service was quick and priced fairly. This is the kind of local business that deserves your support!`,

  `Dropped my phone and shattered the back glass. Went to {shop} in {location} and {owner} replaced it perfectly — looks completely factory fresh. The craftsmanship is top-notch. Very happy with the result!`,

  `{owner} at {shop} repaired my phone's speaker and microphone issue that another shop couldn't fix. He took the time to properly diagnose the problem. Truly an expert technician. If you have a phone problem in {location}, this is the place to go.`,

  `Fantastic experience at {shop}! {owner} is incredibly skilled and takes pride in his work. My phone's charging port was replaced quickly and now charges perfectly. Honest, professional, and affordable — what more could you ask for?`,

  `Visited {shop} after my phone screen went black after a drop. {owner} fixed it the same day. He's thorough, explains the repair clearly, and charges a fair price. One of the best mobile repair shops I've been to in {location}. Fully recommend!`,
];

/**
 * Returns a random review template filled with shop, owner, and location details.
 * @param {Object} config
 * @param {string} config.shop - Shop name
 * @param {string} config.owner - Owner name
 * @param {string} config.location - Shop location/area
 * @returns {string} A complete, ready-to-post review
 */
function getRandomReview({ shop, owner, location }) {
  const template = REVIEW_TEMPLATES[Math.floor(Math.random() * REVIEW_TEMPLATES.length)];
  return template
    .replaceAll('{shop}', shop)
    .replaceAll('{owner}', owner)
    .replaceAll('{location}', location);
}

export { REVIEW_TEMPLATES, getRandomReview };
