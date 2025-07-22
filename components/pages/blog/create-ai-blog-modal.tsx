import { Modal } from "@/components/common/modal";
import React from "react";
import { AiBlogForm } from "../sections/createAiBlog";

export default function CreateAiBlogModal({
  open,
  onClose,
  handleSubmit,
}: any) {
  return (
    <Modal open={open} onClose={onClose} className="">
      <AiBlogForm onSubmit={handleSubmit} />
    </Modal>
  );
}
