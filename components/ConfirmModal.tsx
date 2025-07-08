'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // prevent scroll
    return () => {
    document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-lg font-bold">Confirm Delete</h2>
        <p className="text-sm text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-1 border rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-1 bg-red-600 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
