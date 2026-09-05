// This is a TEMPLATE, not your real navbarLinks.js.
// I don't have your existing file's content, so merge the `megaMenu` field
// below into whichever links (Cats/Dogs-style categories) should get a
// dropdown. Links without `megaMenu` behave exactly as before.

export const homeNavbarLinks = [
  { id: "home", name: "Home", path: "/" },

  {
    id: "pet-shop",
    name: "Pet Shop",
    path: "/pet-shop",
    megaMenu: [
      {
        title: "Dog Food",
        items: [
          { label: "Dry Food", path: "/pet-shop/dog/dry-food" },
          { label: "Wet Food", path: "/pet-shop/dog/wet-food" },
          { label: "Puppy Food", path: "/pet-shop/dog/puppy-food" },
        ],
      },
      {
        title: "Dog Toys",
        items: [
          { label: "Chew Toys", path: "/pet-shop/dog/chew-toys" },
          { label: "Balls & Chasers", path: "/pet-shop/dog/balls" },
          { label: "Interactive Toys", path: "/pet-shop/dog/interactive-toys" },
        ],
      },
      {
        title: "Grooming",
        items: [
          { label: "Shampoos", path: "/pet-shop/grooming/shampoos" },
          { label: "Brushes & Combs", path: "/pet-shop/grooming/brushes" },
          {
            label: "Trimmers",
            path: "/pet-shop/grooming/trimmers",
            badge: "New",
          },
        ],
      },
    ],
  },

  {
    id: "pharmacy",
    name: "Pharmacy",
    path: "/animal-pharmacy",
    megaMenu: [
      {
        title: "Pharmacy",
        items: [
          { label: "Dewormer", path: "/animal-pharmacy/dewormer" },
          { label: "Tick & Fleas", path: "/animal-pharmacy/tick-fleas" },
          { label: "Skin Care", path: "/animal-pharmacy/skin-care" },
          { label: "Supplements", path: "/animal-pharmacy/supplements" },
        ],
      },
    ],
  },

  { id: "vet", name: "Consult a Vet", path: "/vet" },
  { id: "adoption", name: "Adoption", path: "/adoption" },
];

export const appNavbarLinks = homeNavbarLinks;
