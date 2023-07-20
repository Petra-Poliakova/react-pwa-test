import React from 'react'

const CloneDeepTest = () => {
  function porovnajObjekty(objekt1, objekt2) {
    // Kontrola, či sú obidva objekty undefined
    if (objekt1 === undefined && objekt2 === undefined) {
      return true;
    }
  
    // Kontrola, či je len jeden objekt undefined
    if (objekt1 === undefined || objekt2 === undefined) {
      return false;
    }
  
    // Kontrola, či sú obidva objekty null
    if (objekt1 === null && objekt2 === null) {
      return true;
    }
  
    // Kontrola, či je len jeden objekt null
    if (objekt1 === null || objekt2 === null) {
      return false;
    }
  
    // Porovnanie vlastností objektov
    var vlastnosti1 = Object.getOwnPropertyNames(objekt1);
    var vlastnosti2 = Object.getOwnPropertyNames(objekt2);
  
    // Kontrola počtu vlastností
    if (vlastnosti1.length !== vlastnosti2.length) {
      return false;
    }
  
    // Porovnanie hodnôt vlastností
    for (var i = 0; i < vlastnosti1.length; i++) {
      var vlastnost = vlastnosti1[i];
      if (objekt1[vlastnost] !== objekt2[vlastnost]) {
        return false;
      }
    }
  
    // Ak sa dostaneme sem, objekty sa rovnajú
    return true;
  }
  
  // Príklady použitia
  var objektA = { x: 10, y: 20 };
  var objektB = { x: 10, y: 20 };
  var objektC = { x: 5, y: 10 };
  
  console.log(porovnajObjekty(objektA, objektB)); // true
  console.log(porovnajObjekty(objektA, objektC)); // false
  console.log(porovnajObjekty(objektA, undefined)); // false
  console.log(porovnajObjekty(null, null)); // true
  
  return (
    <div>CloneDeepTest</div>
  )
}

export default CloneDeepTest


// import React from 'react'

// const CloneDeepTest = () => {
//     /////////////////////////////////////////////////////////////////////////////////////
//     //Example for Creating Shallow Copies by Looping Through Objects
//     const originalObjectA = {
//         a: 5,
//         nestedObject: {
//             b: 10
//         }
//     };

//     const copiedObjectA = {};

//     for (let key in originalObjectA) {
//         copiedObjectA[key] = originalObjectA[key];
//     }

//     console.log('originalObjectA before',originalObjectA);      // { a: 5, nestedObject: { b: 10 } }
//     console.log('copiedObjectA before',copiedObjectA);        // { a: 5, nestedObject: { b: 10 } }

//     // Modifying the nested object in the copied object
//     copiedObjectA.nestedObject.b = 20;

//     console.log('originalObjectA', originalObjectA);      // { a: 5, nestedObject: { b: 20 } }
//     console.log('copiedObjectA', copiedObjectA);        // { a: 5, nestedObject: { b: 20 } }


//     //////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //With recursive
//     function deepCopy(obj) {


//         // Skontrolujeme, či je vstupná hodnota objektom


//         if (typeof obj !== 'object' || obj === null) {
//             return obj; // Ak nie je objektom, vrátime pôvodnú hodnotu
//         }

//         let copiedObj = Array.isArray(obj) ? [] : {}; // Vytvoríme prázdny objekt alebo pole

//         for (let key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 copiedObj[key] = deepCopy(obj[key]); // Rekurzívne zavoláme deepCopy pre každú vlastnosť objektu
//             }
//         }

//         return copiedObj;
//     }

//     const originalObject = {
//         a: 5,
//         nestedObject: {
//             b: 10
//         }
//     };

//     const copiedObject = deepCopy(originalObject);

//     console.log('originalObject before',originalObject);      // { a: 5, nestedObject: { b: 10 } }
//     console.log('copiedObject before', copiedObject);        // { a: 5, nestedObject: { b: 10 } }

//     // Modifikácia vnoreného objektu v skopírovanom objekte
//     copiedObject.nestedObject.b = 20;

//     console.log('originalObject',originalObject);      // { a: 5, nestedObject: { b: 10 } }
//     console.log('copiedObject',copiedObject);        // { a: 5, nestedObject: { b: 20 } }
//   return (
//     <div>CloneDeepTest</div>
//   )
// }

// export default CloneDeepTest

 //useEffect(() => {

    //    if (wait) return;

    //    if (typeof previousFilter.current !== 'undefined' && isEqual(previousFilter.current, state.filter)) return;

    //    var includeCount = false;
        
    //    if (typeof previousFilter.current === 'undefined' || !isEqual(previousFilter.current.data, state.filter.data)) {
    //        includeCount = true; //zistujeme ci je previousFilter.current nedefinované alebo sa lisi od state.filter ak ano nastavujeme ho na true 
    //    }
    //    previousFilter.current = cloneDeep(state.filter); //zaistime ze previousFilter.current ma rovnaku hodnotu ako state.filter

    //    console.log('cloneDeep(state.filter)', previousFilter.current);
    //    console.log('state.filter', state.filter);

    //    LoadData(includeCount);

    //}, [state.filter, LoadData, wait]);

    //Celkovo možno povedať, že tento kód slúži na monitorovanie zmien v state.filter a vykonáva akciu LoadData len v prípade,
    //že sa zmení hodnota state.filter alebo wait.Taktiež sa používa premenná previousFilter.current na ukladanie predchádzajúcej hodnoty state.filter a porovnávanie zmien.
    //Premenná includeCount slúži na určenie, či sa má do funkcie LoadData zahrnúť počet záznamov(true) alebo nie(false).