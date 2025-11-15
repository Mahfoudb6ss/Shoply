"use client";

import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DataTable } from "@/components/ui/data-table";
import { ImageUploader } from "@/components/admin/image-uploader";
import { formatCurrency } from "@/utils/currency";
import type { Product } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const columns: ColumnDef<Product>[] = [
  {
    header: "Name",
    accessorKey: "name"
  },
  {
    header: "Category",
    accessorKey: "categoryId"
  },
  {
    header: "Price",
    cell: ({ row }) => formatCurrency(row.original.price)
  },
  {
    header: "Stock",
    accessorKey: "stock"
  }
];

type Category = {
  id: string;
  name: string;
};

type ProductManagerProps = {
  products: Product[];
  categories: Category[];
};

const emptyForm = {
  name: "",
  description: "",
  price: "",
  discount: "",
  stock: "",
  categoryId: ""
};

export const ProductManager = ({ products, categories }: ProductManagerProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(prev => ({ ...prev, categoryId: categories[0]?.id ?? "" }));
  }, [categories]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          discount: form.discount ? Number(form.discount) : null,
          stock: Number(form.stock),
          categoryId: form.categoryId,
          images
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to create product");
      }

      toast.success("Product created");
      setForm(prev => ({ ...emptyForm, categoryId: categories[0]?.id ?? "" }));
      setImages([]);
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setPending(false);
    }
  };

  const handleInput =
    (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: event.target.value }));
    };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground">Manage the entire catalog.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New product</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={form.name} onChange={handleInput("name")} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={form.categoryId}
                    onValueChange={value => setForm(prev => ({ ...prev, categoryId: value }))}
                    disabled={!categories.length}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={handleInput("description")}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleInput("price")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (0-1)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="0.9"
                    step="0.01"
                    value={form.discount}
                    onChange={handleInput("discount")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={handleInput("stock")}
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label>Images</Label>
                <ImageUploader
                  onUpload={async files => {
                    if (!files.length) return;
                    const uploaded = await Promise.all(
                      files.map(async file => {
                        const formData = new FormData();
                        formData.append("file", file);
                        const res = await fetch("/api/upload", {
                          method: "POST",
                          body: formData
                        });
                        const data = await res.json().catch(() => null);
                        return data?.data?.url as string | undefined;
                      })
                    );
                    setImages(prev => [...prev, ...uploaded.filter(Boolean)]);
                  }}
                />
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {images.map(url => (
                      <div key={url} className="relative">
                        <img src={url} alt="" className="h-20 w-20 rounded-md object-cover" />
                        <button
                          type="button"
                          className="absolute -right-2 -top-2 rounded-full bg-black/70 px-1 text-xs text-white"
                          onClick={() => setImages(prev => prev.filter(img => img !== url))}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Saving..." : "Create product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
};

