import { useState, useEffect } from 'react';

export const useImagePreloader = (src: string) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        setHasError(false);

        if (!src || src === 'N/A') {
            setHasError(true);
            return;
        }

        const img = new Image();
        img.src = src;

        img.onload = () => {
            setIsLoaded(true);
        };

        img.onerror = () => {
            setHasError(true);
        };
    }, [src]);

    return { isLoaded, hasError };
};