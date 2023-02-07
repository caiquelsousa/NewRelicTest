function minHeapRoot(arr, i, len, compareKey) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let min = i;

  if (left < len && arr[left][compareKey] < arr[min][compareKey]) {
    min = left;
  }

  if (right < len && arr[right][compareKey] < arr[min][compareKey]) {
    min = right;
  }

  if (min != i) {
    swap(arr, i, min);
    minHeapRoot(arr, min, len, compareKey);
  }
}

function swap(arr, indexA, indexB) {
  let temp = arr[indexA];

  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
}

const heapSortFunc = {
  min: minHeapRoot,
};

function heapSort(arr, type = 'min', compareKey) {
  let len = arr.length;

  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapSortFunc[type](arr, i, len, compareKey);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    len--;

    heapSortFunc[type](arr, 0, len, compareKey);
  }
}

export function minHeapSort(arr, compareKey) {
  heapSort(arr, 'min', compareKey);
}
