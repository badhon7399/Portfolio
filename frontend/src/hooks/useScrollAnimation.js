import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const useScrollAnimation = (threshold = 0.1) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: threshold,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return [ref, controls];
};

export default useScrollAnimation; 