import { createContext, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

interface ToastContextType {
    showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);


const slideIn = keyframes`
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
`;

const ToastContainer = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: var(--bg-card, #1f1f27);
    color: var(--text-main, #fff);
    padding: 14px 24px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border-left: 4px solid var(--accent-color, #7b61ff);
    z-index: 9999;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: ${slideIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({
        message: '',
        isVisible: false,
    });

    const showToast = useCallback((message: string) => {
        setToast({ message, isVisible: true });

        setTimeout(() => {
            setToast((prev) => ({ ...prev, isVisible: false }));
        }, 2000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
        {children}
        {toast.isVisible && (
            <ToastContainer>
            <span>✨</span> {toast.message}
        </ToastContainer>
        )}
        </ToastContext.Provider>
    );
};
