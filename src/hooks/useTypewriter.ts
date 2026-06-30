'use client';

import { useState, useEffect, useCallback } from 'react';

export function useTypewriter(messages: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (messages.length === 0) return;

    const currentMessage = messages[currentIndex];
    if (!currentMessage) return;

    let charIndex = 0;
    setIsTyping(true);
    setDisplayText('');

    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayText(currentMessage.slice(0, charIndex));
      if (charIndex >= currentMessage.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30 + Math.random() * 20);

    return () => clearInterval(typeInterval);
  }, [currentIndex, messages]);

  const next = useCallback(() => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, messages.length]);

  const isComplete = currentIndex >= messages.length - 1 && !isTyping;

  return { displayText, isTyping, currentIndex, next, isComplete, total: messages.length };
}
