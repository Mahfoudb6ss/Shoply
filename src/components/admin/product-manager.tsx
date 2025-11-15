"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DataTable } from "@/components/ui/data-table";
import { ImageUploader } from "@/components/admin/image-uploader";
import { formatCurrency } from "@/utils/currency";
import type { Product } from "@/types";

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

export const ProductManager = ({ products }: { products: Product[] }) => {
  const [open, setOpen] = useState(false);
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
            <ImageUploader
              onUpload={async files => {
                if (!files.length) return;
                const formData = new FormData();
                formData.append("file", files[0]);
                await fetch("/api/upload", {
                  method: "POST",
                  body: formData
                });
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
};

