"use client";

import { useAuthCheck } from "../Common/AuthCheckProvider";
import Modal from "../Common/Modal";
import WhoYouAre from "./WhoYouAre/WhoYouAre";

const LoginModal = () => {
  const { loginModalOpen } = useAuthCheck();

  if (!loginModalOpen) return null;
  return (
    <Modal isOpen>
      <WhoYouAre />
    </Modal>
  );
};

export default LoginModal;
