"use client";
import { ChangeEvent, useRef } from "react";
import { useToast } from "@/shared/hooks";
import { Button, Icon } from "@/shared/components";
import { cn, imageToBase64 } from "@/shared/utils";

interface Props {
  children?: React.ReactNode;
  imageUrl: (url: string) => void;
  showIcon?: boolean;
  className?: string;
}

export const ImageFromDevice = ({ children, imageUrl, showIcon, className }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ message: "image-type", type: "info" });
      return;
    }

    /* check file size < 5MB */
    if (file.size > 5 * 1024 * 1024) {
      toast({ message: "image-size", type: "info" });
      return;
    }

    /* call onFileSelect callback and convert to base64 string for show preview */
    const url = await imageToBase64(file);
    imageUrl(url);
  };

  return (
    <div className="relative flex size-fit flex-col items-center">
      {showIcon ? children : <div onClick={() => fileInputRef.current?.click()}>{children}</div>}
      <label htmlFor="avatar-upload" className="flex w-full flex-row items-center gap-2">
        {showIcon && (
          <Button
            type="button"
            variant="tertiary"
            size="icon"
            className={cn("absolute right-0 -bottom-2 size-5 rounded-full", className)}
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon name="camera" className="size-3" />
          </Button>
        )}
        <input
          id="avatar-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
      </label>
    </div>
  );
};
