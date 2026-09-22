export function getPetHighlights(pet) {
  return [
    `Vaccinated: ${pet.vaccinated ? "Yes" : "Pending"}`,
    `Neutered / Spayed: ${pet.neutered ? "Yes" : "No"}`,
    `Health Condition: ${pet.healthStatus}`,
    `Location: ${pet.location}`,
  ];
}

export function getPetKeyBenefits(pet) {
  return [
    {
      title: "Temperament",
      detail: pet.temperament ? pet.temperament.join(", ") : "Friendly",
    },
    { title: "Age & Size", detail: `${pet.age} • ${pet.size}` },
    {
      title: "Suitable Environment",
      detail: "Great for loving family homes and apartment living.",
    },
  ];
}

export function getRelatedPets(currentPet, allPets = [], limit = 4) {
  return allPets.filter((p) => p.id !== currentPet.id).slice(0, limit);
}
