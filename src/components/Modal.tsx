import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setIsOpen } from "../redux/modalSlice";
import React from "react";

export default function ModalWrapper({
  children,
  title,
}: {
  handleOk?: () => Promise<void>;
  children: React.ReactNode;
  title: string;
}) {
  /* --------------------- STATE HOOK --------------------- */

  const { loading } = useSelector((state: RootState) => state.assignment);
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();

  /* --------------------- RENDER --------------------- */

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={() => dispatch(setIsOpen(false))}
      confirmLoading={loading}
      footer={null}
    >
      {children}
    </Modal>
  );
}
