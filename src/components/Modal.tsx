import { useState } from "react";


interface ModalProps {
  isOpen: boolean;
  cancle: () => void;
  editValue: { value: string; idx: number };
  save: (value: string, idx: number) => void;
}

const Modal = ({ isOpen, cancle, editValue, save }: ModalProps) => {
  const [value, setValue] = useState(editValue.value);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-blue-500 opacity-15  z-30"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
          <input
            placeholder="Edit Task"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 bg-white dark:bg-gray-800 dark:text-white mb-2 outline-none"
          />
          <div className="flex justify-center gap-2">
            <button
              onClick={cancle}
              className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => save(value, editValue.idx)}
              className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;