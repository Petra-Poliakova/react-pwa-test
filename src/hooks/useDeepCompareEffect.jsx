import { useEffect, useRef } from 'react';

export const isDeepEqual = (valueA, valueB) => {

    const compareArrays = (A, B)=>{
        for (let i = 0; i < A.length; i++) {
            const result = compare(A[i], B[i])
            if (!result) return false
        }
        return true;
    }


    const compareObjects = (valA, valB) => {

        const keys = new Set([...Object.keys(valA), ...Object.keys(valB)]);

        for (let key of keys) {
            if (key in valA && key in valB) {
                const result = compare(valA[key], valB[key])
                if (!result) return false
            }
            else {
                return false
            }
        }

        return true;
    }


    const compare = (valA, valB) => {
        if (typeof valA === 'undefined' || typeof valB === 'undefined') {
            // ak oba true
            // ak iba jeden false
        }
        else if (valA == null || valB == null) {
            // ak oba true
            // ak iba jeden false
        }
        else if (valA.constructor === valB.constructor) {

            if (valA.constructor === Object) {
                return compareObjects(valA, valB)
            }
            else if (valA.constructor === Array) {
                return compareArrays(valA, valB)
            }
            else {
                const result = valA === valB   // string , number, bool
                if (!result) return false;
            }

        } else {
            return false
        }

    }

    return compareArrays(valueA, valueB)
};

export const useDeepEffect = (callback, dependencies) => {
    const previousDependencies = useRef([]);

    useEffect(() => {
        if (previousDependencies.current == null || !isDeepEqual(dependencies, previousDependencies.current)) {
            previousDependencies.current = dependencies;
            callback();
        }
        //console.log('deep effect');
    }, [dependencies]);
};



//Spustenie efektu (callback funkcie), v prípade ak sa závislosti (dependencies) zmenili.
//Porovnáva predchádzajúce a aktuálne závislosti, a ak sa líšia, spustí callback a aktualizuje hodnotu predošlých závislostí.



//import { useEffect, useRef } from 'react';

//const useDeepEffect = (callback: () => void, dependencies: any[]) => {
//    const previousDeps = useRef<any[]>([]);

//    useEffect(() => {
//        const isDeepEqual = (a: any, b: any): boolean => {
//            if (a === b) return true;

//            if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
//                return false;
//            }

//            const keysA = Object.keys(a);
//            const keysB = Object.keys(b);

//            if (keysA.length !== keysB.length) return false;

//            for (let key of keysA) {
//                if (!keysB.includes(key) || !isDeepEqual(a[key], b[key])) {
//                    return false;
//                }
//            }

//            return true;
//        };

//        const isDependencyEqual = isDeepEqual(previousDeps.current, dependencies);

//        if (!isDependencyEqual) {
//            callback();
//            previousDeps.current = dependencies;
//        }
//    }, [callback, dependencies]);
//};

//export default useDeepEffect;