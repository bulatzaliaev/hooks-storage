import { useEffect, useState, useCallback } from "react";
import { returningPromise } from '../utils';

export default function useAsync(asyncFunction: returningPromise, immediate: boolean = true): Object {
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
}