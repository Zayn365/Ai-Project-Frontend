import { Modal } from "@/components/common/modal";
import React from "react";
import { BlogForm } from "../sections/createBlog";

export default function CreateBlogModal({ open, onClose, handleSubmit }: any) {
  return (
    <Modal open={open} onClose={onClose} className="">
      <BlogForm onSubmit={handleSubmit} />
    </Modal>
  );
}
