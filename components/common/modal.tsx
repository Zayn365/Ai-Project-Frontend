import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, className, children }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPrimitive.Title data-slot="dialog-title" />
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay className="backdrop-blur-[40px] bg-[#FFFFFF08]" />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[80vw] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] gap-4 shadow-lg duration-200 sm:max-w-lg",
            "min-w-[525px] rounded-[17px] overflow-y-auto",
            className
          )}
        >
          {children}
          <DialogPrimitive.Close className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer">
            <XIcon className="" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
