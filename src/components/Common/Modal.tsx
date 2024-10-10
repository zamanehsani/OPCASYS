"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-blue opacity-50 " />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6  shadow-lg dark:bg-dark-2"
      >
        <div>{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
