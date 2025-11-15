import type { Product } from "@/types";
import { ProductCard } from "@/components/store/product-card";

type ProductGridProps = {
  products: Product[];
};

export const ProductGrid = ({ products }: ProductGridProps) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

