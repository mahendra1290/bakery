import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CrossIcon = ({ onClick }: { onClick: () => void }) => (
  <svg
    onClick={onClick}
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6 cursor-pointer'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
  </svg>
);

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    if (open) {
      document.body.style.overflow = 'hidden';
      setMounted(true);
    } else {
      timer = setTimeout(() => {
        setMounted(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, [open]);

  if (!open && !mounted) return null;

  return createPortal(
    <div
      className={clsx(
        'fixed inset-0 bg-black z-50 transition-all duration-300',
        mounted && open ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none',
      )}
    >
      <div
        className={clsx(
          'p-4 sm:p-6 absolute transition-all duration-300 shadow-lg rounded-lg w-full sm:max-w-md bg-white mx-auto sm:bottom-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2',
          mounted && open
            ? 'bottom-0 sm:scale-100 sm:opacity-1'
            : '-bottom-full sm:scale-50 sm:opacity-0',
        )}
      >
        <p className='text-xl mb-2 flex justify-between items-center'>
          {title}
          <CrossIcon onClick={onClose} />
        </p>
        {children}
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default Modal;
