import React from "react";

import ShopLayout from "../components/layout/ShopLayout";
import { petShopProducts, petShopCategories } from "../data/petShopData";

export default function PetShop() {
  return (
    <ShopLayout
      heroTitle="Pet Shop"
      heroSubtitle="Everything your pet needs, in one place."
      categories={petShopCategories}
      products={petShopProducts}
    />
  );
}
