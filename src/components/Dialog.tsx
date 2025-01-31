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

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto sticky">
        <div className="p-6">
          {children}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 text-gray-900 hover:text-gray-700 font-semibold"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const DialogContent: React.FC<ContentProps> = ({
  children,
  className,
}) => <div className={className}>{children}</div>;

export const DialogHeader: React.FC<ContentProps> = ({
  children,
  className,
}) => <div className={`mb-4 ${className || ''}`}>{children}</div>;

export const DialogTitle: React.FC<ContentProps> = ({
  children,
  className,
}) => (
  <h2 className={`text-xl font-semibold ${className || ''}`}>{children}</h2>
);
