import { useEffect, useRef } from 'react';

export default function useMemoCompare(value: any, compare: Function) {
    const previousRef = useRef(null);
    const previous = previousRef.current;
    const isEqual = compare(previous, value);

    useEffect(() => {
        if (!isEqual) {
            previousRef.current = value;
        }
    });

    return isEqual ? previous : value;
}