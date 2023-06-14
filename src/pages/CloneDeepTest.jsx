import React, { useState } from 'react';
import useDeepCompareEffect from '../hooks/useDeepCompareEffect';

const CloneDeepTest = () => {
    const initialData = [
        {
          id: 1,
          name: 'Item 1',
          items: ['Apple', 'Banana', 'Orange']
        },
        {
          id: 2,
          name: 'Item 2',
          items: ['Grapes', 'Kiwi', 'Watermelon']
        },
        {
          id: 3,
          name: 'Item 3',
          items: ['Pineapple', 'Mango', 'Strawberry']
        }
      ];
    
      const [data, setData] = useState(initialData);
      const [filteredData, setFilteredData] = useState(data);
      const [filter, setFilter] = useState('');
    
      useDeepCompareEffect(() => {
        const filtered = data.filter(item => {
          return item.items.some(subItem => subItem.includes(filter));
        });
    
        setFilteredData(filtered);
      }, [data, filter]);
    
      const handleFilterChange = event => {
        setFilter(event.target.value);
      };
    
      return (
        <div>
          <input type="text" value={filter} onChange={handleFilterChange} />
          <ul>
            {filteredData.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    
};

export default CloneDeepTest;


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