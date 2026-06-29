import { useState, useEffect, useRef } from 'react';

export const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (value === '') {
            if (timerRef.current) clearTimeout(timerRef.current);
            setDebouncedValue(value);
            return;
        }

        timerRef.current = window.setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debouncedValue;
};