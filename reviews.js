/**
 * reviews.js
 * Category-aware pool of SEO-friendly review templates.
 * Each category key maps to 3+ unique review templates.
 * Templates use {shop}, {owner}, {location} as placeholders.
 */

const REVIEW_POOL = {
  battery: [
    `My phone's battery was draining within hours — {owner} at {shop} replaced it perfectly and now it lasts all day! Transparent pricing, same-day service. Best mobile repair shop in {location}. Highly recommend!`,
    `Took my phone to {shop} in {location} for a battery replacement. {owner} had it done in 30 minutes using a great quality battery. The phone feels brand new again. Honest, fast, and affordable — 5 stars without hesitation!`,
    `{shop} in {location} is incredible! {owner} replaced my dead battery quickly and even tested it before handing it back. The phone charges perfectly and holds charge all day. Best mobile technician in {location}!`,
  ],
  display: [
    `Cracked my screen badly and was devastated. Walked into {shop} in {location} and {owner} fixed it perfectly — the display looks factory fresh! Completed in under an hour. Brilliant service, fair pricing. Fully recommended!`,
    `{owner} at {shop} replaced my shattered display with precision and care. The screen quality is excellent, touch response is perfect. If you need a screen repair in {location}, this is your place. 10/10!`,
    `Dropped my phone and shattered the screen. {shop} in {location} saved the day — {owner} repaired it same day and it looks completely new. Exceptional quality work and very reasonable pricing!`,
  ],
  speaker: [
    `My phone's speaker and microphone stopped working. {owner} at {shop} in {location} diagnosed and fixed both issues quickly. Calls are crystal clear now! Great service, honest pricing. Highly recommend for any audio issue!`,
    `Visited {shop} for a speaker issue — {owner} cleaned and repaired it properly. Sound quality is back to perfect. Quick, professional service in {location}. This is my go-to repair shop from now on!`,
    `{owner} at {shop} fixed my phone's mic issue that two other shops couldn't solve. He took time to properly diagnose the problem. Sound is perfect again. True expert mobile technician in {location}!`,
  ],
  software: [
    `My phone was completely frozen and unresponsive. {owner} at {shop} in {location} resolved the software issue quickly without losing my data. Knowledgeable, professional, and very affordable. Highly recommended!`,
    `{shop} in {location} is amazing! {owner} fixed my software problem — phone was stuck in a boot loop — within the hour. All my data was safe. Brilliant technical expertise and excellent service!`,
    `Phone was running extremely slow and crashing. {owner} at {shop} sorted the software issue professionally and now it runs like new. Best tech support in {location}. Very satisfied!`,
  ],
  charging: [
    `My phone wouldn't charge at all. {owner} at {shop} in {location} replaced the charging port and it works perfectly now! Quick 40-minute fix, very reasonable price. Brilliant service — I'm so relieved!`,
    `Went to {shop} with a loose charging port issue. {owner} fixed it quickly and efficiently. Phone charges perfectly now. No upselling, just honest repair expertise in {location}. Strongly recommended!`,
    `{owner} at {shop} repaired my charging port that had been damaged for weeks. Diagnosed it accurately, fixed it fast. Superb service and very fair pricing in {location}. Will definitely return!`,
  ],
  camera: [
    `Camera on my phone was blurry and the rear lens was cracked. {owner} at {shop} in {location} replaced it perfectly — photos look stunning again. Quick, precise repair work. Excellent service!`,
    `Took my phone to {shop} in {location} for a camera repair. {owner} fixed both front and rear cameras the same day. The image quality is flawless. Best mobile repair service I've experienced!`,
    `{shop} in {location} is fantastic! {owner} repaired my phone camera professionally — no more blurry shots. Great craftsmanship, honest pricing. Highly recommend for any camera-related repair!`,
  ],
  water: [
    `My phone fell in water and I thought it was gone forever! Rushed to {shop} and {owner} immediately began water damage treatment. Two days later my phone was completely revived. Exceptional expertise in {location}!`,
    `{owner} at {shop} in {location} worked miracles on my water-damaged phone. He's thorough, patient, and incredibly skilled. So grateful — I thought I'd lost everything. Best mobile technician around!`,
    `Water damaged my phone and {shop} was recommended to me. {owner} treated it professionally and recovered it fully. Truly impressive skill. If you have a water damage emergency in {location}, go here immediately!`,
  ],
  back: [
    `Dropped my phone and shattered the back glass. {owner} at {shop} in {location} replaced it perfectly — looks completely factory fresh. Amazing attention to detail and very reasonable price!`,
    `{shop} in {location} replaced my cracked back panel perfectly. {owner} matched the colour exactly and the finish is flawless. Quick, professional, affordable. Really happy with the result!`,
    `Needed a back glass replacement and {owner} at {shop} delivered perfect results. The phone looks brand new. Great workmanship and excellent value in {location}. Highly recommend!`,
  ],
  other: [
    `Outstanding mobile repair service at {shop} in {location}! {owner} diagnosed my phone issue accurately and fixed it the same day. Professional, honest, and very reasonably priced. Will definitely return!`,
    `{shop} in {location} is a gem! {owner} is skilled, friendly, and genuinely cares about doing a perfect job. My phone works flawlessly again. Go-to repair shop in {location} — highly recommended!`,
    `Brilliant experience at {shop}! {owner} repaired my phone with expertise and care. Transparent about costs, no hidden charges. Fast turnaround. Best mobile repair in {location} without a doubt!`,
  ],
};

/** Generic pool used when no category is specified */
const GENERIC_REVIEWS = [
  `Absolutely brilliant service at {shop} in {location}! {owner} personally handled my phone repair and fixed it within the hour. Original-quality parts, transparent pricing. If you need a reliable mobile repair shop near {location}, this is THE place. Highly recommend! ⭐⭐⭐⭐⭐`,
  `{shop} in {location} is a gem! {owner} is incredibly skilled and honest. No upselling, just genuine expertise. Fixed my phone perfectly — this is my go-to mobile repair shop from now on.`,
  `Fantastic experience at {shop}! {owner} is thorough, explains the repair clearly, and charges a fair price. One of the best mobile repair shops in {location}. Fully recommend!`,
];

/**
 * Returns a random review template filled with shop/owner/location details.
 * Optionally filters to the specified repair category.
 * @param {Object} opts
 * @param {string} opts.shop
 * @param {string} opts.owner
 * @param {string} opts.location
 * @param {string} [opts.category]
 * @returns {string}
 */
function getRandomReview({ shop, owner, location, category }) {
  const pool = (category && REVIEW_POOL[category]) ? REVIEW_POOL[category] : GENERIC_REVIEWS;
  const template = pool[Math.floor(Math.random() * pool.length)];
  return template
    .replaceAll('{shop}', shop)
    .replaceAll('{owner}', owner)
    .replaceAll('{location}', location);
}

export { REVIEW_POOL, getRandomReview };
