import { Modal } from "@/components/common/modal";
import React from "react";
import { AiEbookForm } from "../sections/AiEbookForm";

export default function CreateAiEbookModal({
  open,
  onClose,
  handleSubmit,
}: any) {
  return (
    <Modal open={open} onClose={onClose} className="">
      <AiEbookForm onSubmit={handleSubmit} />
    </Modal>
  );
}
