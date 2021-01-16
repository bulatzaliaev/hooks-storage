import { useState } from 'react';
export default function useLocalStorage(key, initialValue) {
    var _a = useState(function () {
        try {
            var item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.log(error);
            return initialValue;
        }
    }), storedValue = _a[0], setStoredValue = _a[1];
    var setValue = function (value) {
        try {
            var valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
}
