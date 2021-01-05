import { useEffect, useState } from 'react';

export default function useKeyPress(targetKey: String): boolean {
    const [keyPressed, setKeyPressed] = useState(false);
    const downHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keyPressed;
}