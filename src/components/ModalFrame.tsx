import type { MouseEvent, ReactNode } from 'react';

type ModalFrameProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName: string;
  overlayClassName?: string;
  labelledBy?: string;
};

const overlayBaseClass =
  'fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-6 pt-12 sm:items-center sm:p-10';

export default function ModalFrame({
  isOpen,
  onClose,
  children,
  panelClassName,
  overlayClassName = '',
  labelledBy,
}: ModalFrameProps) {
  if (!isOpen) {
    return null;
  }

  const handleInnerClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`${overlayBaseClass} ${overlayClassName}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={onClose}
    >
      <div className={panelClassName} onClick={handleInnerClick}>
        {children}
      </div>
    </div>
  );
}
