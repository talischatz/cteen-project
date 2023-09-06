import ProductsList from "@/components/products-list/ProductsList";

export default function StorePage() {
  return (
    <div className="full-container">
      <div className="text-4xl text-primary font-semibold mt-8 text-center">Store</div>
      <ProductsList />
    </div>
  );
}
