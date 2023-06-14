import { useEffect, useRef } from 'react';

export const isDeepEqual = (objectA, objectB) => {
    if (objectA === objectB) return true;

    if (typeof objectA !== 'object' || typeof objectB !== 'object' || objectA === null || objectB === null) {
        return false;
    }

    const keysA = Object.keys(objectA);
    const keysB = Object.keys(objectB);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key) || !isDeepEqual(objectA[key], objectB[key])) {
            return false;
        }
    }

    return true;
};

const useDeepCompareEffect = (callback, dependencies) => {
    const previousDependencies = useRef([]);

    useEffect(() => {
        if (!isDeepEqual(dependencies, previousDependencies.current)) {
            callback();
        }

        previousDependencies.current = dependencies;
    }, [callback, dependencies]);
};

export default useDeepCompareEffect;