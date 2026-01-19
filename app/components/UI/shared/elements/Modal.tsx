"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  childrenOnly?: boolean;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel,
  childrenOnly,
  title,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div
        className="absolute inset-0 bg-background/20 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {childrenOnly ? (
        children
      ) : (
        <div className="relative flex flex-col items-center justify-center w-full max-w-lg liquid-glass rounded-3xl p-6 sm:p-8 custom-shadow animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2">
          {title && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-center">{title}</h3>
            </div>
          )}

          {children}
        </div>
      )}
    </div>,
    document.body
  );
}

interface BottomModalProps {
  title: string;
  description: ReactNode;
  actions: ReactNode;
  isVisible: boolean;
  className?: string;
}

export function BottomModal({
  title,
  description,
  actions,
  isVisible,
  className,
}: BottomModalProps) {
  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-5 left-5 ml-auto right-5 z-50 bg-background/90 p-6 rounded-xl shadow-2xl border liquid-glass-border-color custom-shadow flex flex-col gap-4 max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
      <div className="flex gap-3">{actions}</div>
    </div>
  );
}