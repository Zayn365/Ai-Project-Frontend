import { Modal } from "@/components/common/modal";
import React from "react";
import { EbookForm } from "../sections/EbookForm";

export default function CreateEbookModal({ open, onClose, handleSubmit }: any) {
  return (
    <Modal open={open} onClose={onClose} className="">
      <EbookForm onSubmit={handleSubmit} />
    </Modal>
  );
}
