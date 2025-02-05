import React from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-lg">
        {/* Fixed Header with Close Button */}
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <DialogTitle>{' '}</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-900 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 flex-1">{children}</div>
      </div>
    </div>
  );
};

export const DialogContent: React.FC<ContentProps> = ({ children, className }) => (
  <div className={`p-4 ${className || ''}`}>{children}</div>
);

export const DialogHeader: React.FC<ContentProps> = ({ children, className }) => (
  <div className={`mb-4 ${className || ''}`}>{children}</div>
);

export const DialogTitle: React.FC<ContentProps> = ({ children, className }) => (
  <h2 className={`text-xl font-semibold ${className || ''}`}>{children}</h2>
);
