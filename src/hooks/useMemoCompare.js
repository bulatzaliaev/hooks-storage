import { useEffect, useRef } from 'react';
export default function useMemoCompare(value, compare) {
    var previousRef = useRef(null);
    var previous = previousRef.current;
    var isEqual = compare(previous, value);
    useEffect(function () {
        if (!isEqual) {
            previousRef.current = value;
        }
    });
    return isEqual ? previous : value;
}
