"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageUploaderProps = {
  onUpload?: (files: File[]) => Promise<void> | void;
};

export const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const array = Array.from(files);
    setPreviews(array.map(file => URL.createObjectURL(file)));
    await onUpload?.(array);
  };

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border border-dashed p-8 text-center"
      onDragOver={event => event.preventDefault()}
      onDrop={event => {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
      }}
    >
      <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Drag and drop product shots or click to browse
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
      >
        Browse files
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={event => handleFiles(event.target.files)}
      />
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {previews.map(src => (
            <div key={src} className="overflow-hidden rounded-lg border">
              <img src={src} className="h-24 w-full object-cover" alt="Preview" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

