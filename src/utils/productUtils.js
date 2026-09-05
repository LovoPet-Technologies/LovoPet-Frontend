export function getRelatedProducts(product, allProducts = [], max = 4) {
  if (!product) return [];
  if (product.relatedIds && product.relatedIds.length > 0) {
    return product.relatedIds
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, max);
  }
  return allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, max);
}

export function getStockStatus(product) {
  if (!product) return { label: "In Stock", tone: "ok" };
  const { stock } = product;
  if (typeof stock === "number") {
    if (stock <= 0) return { label: "Out of stock", tone: "out" };
    if (stock <= 15) return { label: `Only ${stock} left`, tone: "low" };
    return { label: "In Stock", tone: "ok" };
  }
  if (stock === "out-of-stock") return { label: "Out of stock", tone: "out" };
  if (stock === "low-stock") return { label: "Only a few left", tone: "low" };
  return { label: "In Stock", tone: "ok" };
}

export function isOutOfStock(product) {
  return getStockStatus(product).tone === "out";
}

const FOOD_CATEGORIES = ["Dog Food", "Cat Food"];
const MEDICINE_CATEGORIES = [
  "Vitamins & Supplements",
  "Pain Relief",
  "Flea & Tick",
  "Skin Care",
];

export function isFood(product) {
  return FOOD_CATEGORIES.includes(product.category);
}
export function isMedicine(product) {
  return MEDICINE_CATEGORIES.includes(product.category);
}

export function getHighlights(product) {
  if (product.highlights) return product.highlights;

  if (isFood(product)) {
    return [
      "Complete & balanced nutrition for everyday feeding",
      `Made for ${product.category === "Dog Food" ? "dogs" : "cats"} by ${product.brand}`,
      "No artificial colors or preservatives added",
      "Resealable pack to keep food fresh for longer",
    ];
  }
  if (isMedicine(product)) {
    return [
      "Vet-recommended formulation",
      `Targeted support for ${product.category.toLowerCase()}`,
      "Easy to administer at home",
      "Suitable for regular use as directed",
    ];
  }
  return [
    "Durable, pet-safe materials",
    `Designed by ${product.brand} for everyday use`,
    "Easy to clean and maintain",
    "Great for indoor and outdoor use",
  ];
}

export function getKeyBenefits(product) {
  if (product.keyBenefits) return product.keyBenefits;

  if (isFood(product)) {
    return [
      {
        title: "Digestive Health",
        detail: "Balanced fiber content supports smooth digestion.",
      },
      {
        title: "Skin & Coat",
        detail: "Essential fatty acids help keep the coat soft and shiny.",
      },
      {
        title: "Immunity",
        detail:
          "Fortified with vitamins and minerals for everyday immunity support.",
      },
    ];
  }
  if (isMedicine(product)) {
    return [
      {
        title: "Fast Acting",
        detail: "Formulated to show visible results with regular use.",
      },
      {
        title: "Vet Formulated",
        detail: "Developed with veterinary guidance for safe home use.",
      },
      {
        title: "Trusted Brand",
        detail: `${product.brand} is a trusted name in pet healthcare.`,
      },
    ];
  }
  return [
    {
      title: "Built to Last",
      detail: "Reinforced construction handles daily play and use.",
    },
    {
      title: "Pet Approved",
      detail: "Designed to keep pets engaged and comfortable.",
    },
    {
      title: "Easy Care",
      detail: "Simple to clean, dries quickly, safe to reuse.",
    },
  ];
}

export function getHowToUse(product) {
  if (product.howToUse) return product.howToUse;

  if (isFood(product)) {
    return "Serve as per the feeding chart on the pack, based on your pet's weight and activity level. Keep fresh water available at all times. Transition gradually from the previous food over 5-7 days.";
  }
  if (isMedicine(product)) {
    return "Use as directed by your veterinarian or as mentioned on the label. Do not exceed the recommended dosage. Consult your vet before use if your pet is pregnant, nursing, or on other medication.";
  }
  if (product.category === "Toys") {
    return "Supervise play, especially during the first few sessions, and inspect regularly for wear. Replace if any small parts become loose.";
  }
  return "Check the size guide before use and adjust for a comfortable, secure fit. Clean with a damp cloth as needed.";
}

export function getIngredients(product) {
  if (product.ingredients) return product.ingredients;

  if (isFood(product)) {
    return "Meat/fish protein, whole grains or vegetables, animal fat, vitamins (A, D3, E), minerals, and natural preservatives. See pack for the complete ingredient list.";
  }
  if (isMedicine(product)) {
    return "Active ingredients as per label claim, along with pharmaceutical-grade excipients. Refer to the product packaging for the full composition.";
  }
  return null;
}

const SAMPLE_REVIEWERS = [
  "Aditi R.",
  "Rohan K.",
  "Meera S.",
  "Farhan A.",
  "Priya N.",
  "Vikram T.",
];
const SAMPLE_COMMENTS = [
  "My pet loves this, ordering again for sure.",
  "Good quality for the price, delivery was quick too.",
  "Noticed a difference within a couple of weeks of regular use.",
  "Exactly as described, packaging was neat and secure.",
  "Works well, though I wish it came in a bigger pack size.",
];

// Deterministic (seeded by product id) so reviews don't shuffle on re-render.
export function getReviews(product, count = 3) {
  if (product.reviewsList) return product.reviewsList;
  const seed = product.id || 1;
  return Array.from({ length: count }).map((_, i) => {
    const reviewerIdx = (seed + i) % SAMPLE_REVIEWERS.length;
    const commentIdx = (seed + i * 2) % SAMPLE_COMMENTS.length;
    const rating = Math.max(
      3,
      Math.min(5, Math.round(product.rating || 4) - (i === 2 ? 1 : 0)),
    );
    return {
      name: SAMPLE_REVIEWERS[reviewerIdx],
      rating,
      comment: SAMPLE_COMMENTS[commentIdx],
    };
  });
}

export function getRatingBreakdown(product) {
  const avg = product.rating || 4.5;
  const total = product.reviews || 0;
  const weights = [5, 4, 3, 2, 1].map((star) => {
    const distance = Math.abs(avg - star);
    return Math.max(0.02, 1 - distance / 2.5);
  });
  const weightSum = weights.reduce((a, b) => a + b, 0);
  return [5, 4, 3, 2, 1].map((star, idx) => ({
    star,
    pct: Math.round((weights[idx] / weightSum) * 100),
    count: Math.round((weights[idx] / weightSum) * total),
  }));
}
