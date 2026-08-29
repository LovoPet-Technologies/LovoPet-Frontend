// components/homepage/homepageData.js
import {
  Stethoscope,
  Pill,
  ShoppingBag,
  Sparkles,
  PawPrint,
} from "lucide-react";

export const services = [
  {
    id: "consultation",
    icon: Stethoscope,
    tag: "Livestock, Farm & Pets",
    title: "Online Vet Consultation",
    highlight: "Consultation",
    shortTitle: "Vet Consultation",
    description:
      "Connect with licensed veterinarians for cows, horses, pets, birds, and exotics. Get remote diagnoses, prescriptions, and expert care advice from home.",
    cardDescription:
      "Talk to a licensed vet about any animal, from a worried puppy to a poorly hen.",
    image:
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?q=80&w=1920&h=1080&auto=format&fit=crop",
    ctaLabel: "Book a consultation",
    ctaPath: "/vet",
  },
  {
    id: "pharmacy",
    icon: Pill,
    tag: "All Species Prescriptions",
    title: "Animal Pharmacy",
    highlight: "Pharmacy",
    shortTitle: "Animal Pharmacy",
    description:
      "Order vet-verified medication, supplements, and vaccines for cattle, poultry, and household pets with fast and reliable delivery.",
    cardDescription:
      "Genuine, vet-verified medicines and supplements delivered to your door.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1920&h=1080&auto=format&fit=crop",
    ctaLabel: "Visit the pharmacy",
    ctaPath: "/animal-pharmacy",
  },
  {
    id: "petshop",
    icon: ShoppingBag,
    tag: "Pet & Farm Supplies",
    title: "Pet & Animal Shop",
    highlight: "Shop",
    shortTitle: "Animal Shop",
    description:
      "Quality feed, grooming tools, enclosures, and essentials for farm livestock, birds, and domestic pets curated by experts.",
    cardDescription:
      "Feed, grooming tools and everyday essentials, picked for every kind of animal.",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1920&h=1080&auto=format&fit=crop",
    ctaLabel: "Shop now",
    ctaPath: "/pet-shop",
  },
  {
    id: "ai-assistant",
    icon: Sparkles,
    tag: "Birds, Exotics & More",
    title: "AI Health Assistant",
    highlight: "Health Assistant",
    shortTitle: "AI Health Assistant",
    description:
      "Describe symptoms for any animal—from parrots and reptiles to dogs and cattle—and receive instant clinical triage advice.",
    cardDescription:
      "Describe a symptom and get instant, vet-informed triage for any animal.",
    image:
      "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1920&h=1080&auto=format&fit=crop",
    ctaLabel: "Try the assistant",
    ctaPath: "/services/ai-assistant",
  },
  {
    id: "adoption",
    icon: PawPrint,
    tag: "Rescue & Sanctuary",
    title: "Animal Adoption",
    highlight: "Adoption",
    shortTitle: "Adoption",
    description:
      "Browse verified rescues and shelters for dogs, cats, farm animals, and rescued livestock looking for a safe home.",
    cardDescription:
      "Verified rescues and shelters, for animals of every shape and size.",
    image:
      "https://images.unsplash.com/photo-1533318087102-b3ad366ed041?q=80&w=1920&h=1080&auto=format&fit=crop",
    ctaLabel: "Start adopting",
    ctaPath: "/adoption",
  },
];

export const barColors = ["#5C2A73", "#E86A33", "#8B9A5B"];
