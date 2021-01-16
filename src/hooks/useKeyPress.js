import { useEffect, useState } from 'react';
export default function useKeyPress(targetKey) {
    var _a = useState(false), keyPressed = _a[0], setKeyPressed = _a[1];
    var downHandler = function (_a) {
        var key = _a.key;
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };
    var upHandler = function (_a) {
        var key = _a.key;
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
    useEffect(function () {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return function () {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);
    return keyPressed;
}
