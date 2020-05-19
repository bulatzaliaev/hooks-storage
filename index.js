import { useEffect, useState, useCallback, useRef } from 'react';

const useAsync = (asyncFunction, immediate = true) => {
    const [pending, setPending] = useState(false);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    const callAsync = useCallback(() => {
        setPending(true);
        setValue(null);
        setError(null);

        return asyncFunction()
            .then(response => setValue(response))
            .catch(error => setError(error))
            .finally(() => setPending(false));
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            callAsync();
        }
    }, [callAsync, immediate]);

    return { callAsync, pending, value, error };
};

function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = event => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            }

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            }
        },
        [ref, handler]
    );
}

function useMemoCompare(value, compare) {
    const previousRef = useRef();
    const previous = previousRef.current;
    const isEqual = compare(previous, value);

    useEffect(() => {
        if (!isEqual) {
            previousRef.current = value;
        }
    });

    return isEqual ? previous : value;
}

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);

            return initialValue;
        }
    });
    const setValue = value => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

module.exports = {
    useAsync,
    useOnClickOutside,
    useMemoCompare,
    useLocalStorage,
};