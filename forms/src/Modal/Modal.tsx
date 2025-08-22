import {useEffect, useCallback, type PropsWithChildren} from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

type ModalProps = PropsWithChildren <{
  isOpen: boolean;
  onClose: ()=>void;
}>

export const Modal = ({ isOpen, onClose, children }:ModalProps) => {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Блокировка скролла при открытии модального окна
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
