import { Modal } from "@/components/common/modal";
import { PricingSection } from "@/components/layout/sections/pricing";
import React from "react";

export default function PricingModal({ open, setOpen }: any) {
  const onClose = () => {
    setOpen(!open);
  };
  return (
    <Modal open={open} onClose={onClose} className="max-w-full min-w-full">
      <PricingSection />
    </Modal>
  );
}
