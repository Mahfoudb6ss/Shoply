"use client";

import type { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export const CategoryFilter = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("category");

  const setCategory = (value?: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (!value) {
      newParams.delete("category");
    } else {
      newParams.set("category", value);
    }
    router.push(`/products?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={current ? "outline" : "default"}
        onClick={() => setCategory(undefined)}
        size="sm"
      >
        All
      </Button>
      {categories.map(category => (
        <Button
          key={category.id}
          variant={current === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => setCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

