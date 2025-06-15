import { Modal } from "@/components/common/modal";
import React from "react";
import { AiMusicForm } from "../sections/AiMusicForm";

export default function CreateAiMusicModal({
  open,
  onClose,
  handleSubmit,
  loading,
}: any) {
  return (
    <Modal open={open} onClose={onClose} className="">
      <AiMusicForm onSubmit={handleSubmit} loading={loading} />
    </Modal>
  );
}
