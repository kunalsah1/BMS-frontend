import React, { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-[90vw] max-h-[90vh] overflow-auto p-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold text-center text-black">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="overflow-auto max-h-[75vh] p-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
