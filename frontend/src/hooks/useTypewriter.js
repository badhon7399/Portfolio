import { useState, useEffect } from 'react';

const useTypewriter = (texts, typingSpeed = 150, deletingSpeed = 75, pauseTime = 2000) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let timeout;

        if (isTyping) {
            if (displayText === texts[currentIndex]) {
                // Pause before starting to delete
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, pauseTime);
            } else {
                // Type the next character
                timeout = setTimeout(() => {
                    setDisplayText(texts[currentIndex].slice(0, displayText.length + 1));
                }, typingSpeed);
            }
        } else {
            if (displayText === '') {
                // Move to next text
                setCurrentIndex((current) => (current + 1) % texts.length);
                setIsTyping(true);
            } else {
                // Delete the last character
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, deletingSpeed);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, currentIndex, isTyping, texts, typingSpeed, deletingSpeed, pauseTime]);

    return displayText;
};

export default useTypewriter; 