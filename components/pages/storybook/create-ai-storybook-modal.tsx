import { Modal } from "@/components/common/modal";
import React from "react";
import { AiStoryForm } from "../sections/AiStoryForm";

export default function CreateAiStorybookModal({
  open,
  onClose,
  handleSubmit,
}: any) {
  return (
    <Modal open={open} onClose={onClose} className="">
      <AiStoryForm onSubmit={handleSubmit} />
    </Modal>
  );
}
