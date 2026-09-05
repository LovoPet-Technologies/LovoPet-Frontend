import ShopLayout from "../components/layout/ShopLayout";
import { pharmacyProducts, pharmacyCategories } from "../data/pharmacyData";

export default function AnimalPharmacy() {
  return (
    <ShopLayout
      heroTitle="Animal Pharmacy"
      heroSubtitle="Trusted medications and veterinary care essentials."
      categories={pharmacyCategories}
      products={pharmacyProducts}
    />
  );
}
