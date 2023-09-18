import {
  MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

export function useModal({
  onClose, isOpen, animationDelay,
} : UseModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const close = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => { onClose(); setIsClosing(false); }, animationDelay);
    }
  }, [animationDelay, onClose]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    }
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(timerRef.current);
    };
  }, [isOpen, onKeyDown]);

  return { isClosing, isMounted, close };
}
