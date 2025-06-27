import React, { useCallback, useState } from "react";

interface PageNameModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit: (pageName: string) => void;
  defaultValue?: string;
  isEdit?: boolean;
}

const PageNameModal: React.FC<PageNameModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValue = "",
  isEdit,
}) => {
  const [name, setName] = useState(defaultValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(name);
      setName("");
    },
    [onSubmit, name]
  );
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/70  z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Rename your page" : "Name your form page"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="page name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {"Cancel"}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-flagged text-white hover:bg-flagged/80 cursor-pointer"
            >
              {"Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageNameModal;
