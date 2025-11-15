import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";
import { requireRole } from "@/lib/auth";

const f = createUploadthing();

export const uploadRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 6 } })
    .middleware(async () => {
      await requireRole(["admin"]);
      return {};
    })
    .onUploadComplete(({ file }) => ({
      url: file.url,
      key: file.key
    }))
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

