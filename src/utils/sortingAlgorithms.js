export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mergeSort = async (array, setArray, speed) => {
  const animations = [];
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  
  for (let i = 0; i < animations.length; i++) {
    const [comparison, indices, values] = animations[i];
    const newArray = array.slice();
    
    if (comparison) {
      await sleep(speed);
      // Highlight comparison
      setArray({ 
        values: newArray, 
        comparing: indices 
      });
    } else {
      await sleep(speed);
      // Update values
      indices.forEach((index, idx) => {
        newArray[index] = values[idx];
      });
      setArray({ 
        values: newArray, 
        comparing: [] 
      });
    }
  }
  
  return array;
};

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  
  while (i <= middleIdx && j <= endIdx) {
    animations.push([true, [i, j], []]);
    
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([false, [k], [auxiliaryArray[i]]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([false, [k], [auxiliaryArray[j]]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  while (i <= middleIdx) {
    animations.push([true, [i, i], []]);
    animations.push([false, [k], [auxiliaryArray[i]]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  
  while (j <= endIdx) {
    animations.push([true, [j, j], []]);
    animations.push([false, [k], [auxiliaryArray[j]]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}