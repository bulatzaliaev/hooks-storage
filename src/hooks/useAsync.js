import { useEffect, useState, useCallback } from "react";
export default function useAsync(asyncFunction, immediate) {
    if (immediate === void 0) { immediate = true; }
    var _a = useState(false), pending = _a[0], setPending = _a[1];
    var _b = useState(null), value = _b[0], setValue = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    var callAsync = useCallback(function () {
        setPending(true);
        setValue(null);
        setError(null);
        return asyncFunction()
            .then(function (response) { return setValue(response); })
            .catch(function (error) { return setError(error); })
            .finally(function () { return setPending(false); });
    }, [asyncFunction]);
    useEffect(function () {
        if (immediate) {
            callAsync();
        }
    }, [callAsync, immediate]);
    return { callAsync: callAsync, pending: pending, value: value, error: error };
}
