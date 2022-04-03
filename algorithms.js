export const bubbleSort = async (array, renderBars) => {
    const delay = 1;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            array[i].note = "bubble-i";
            array[j].note = "bubble-j";

            await renderBars(array, delay);
            if (array[i].number < array[j].number) {
                //highlight match
                array[i].note = "bubble-i";
                array[j].note = "bubble-i";
                await renderBars(array, delay);
                swap(array, i, j);
                await renderBars(array, delay);
            }
            array[i].note = "none";
            array[j].note = "none";
        }
    }

    //color sorted
    colorSortedArray(array, renderBars);
};

export const concurrentQuickSort = async (array, start, end, renderBars) => {
    if (start >= end) {
        return;
    }

    let index = await partition(array, start, end, renderBars);
    array[index].note = "none";

    await Promise.all([
        concurrentQuickSort(array, start, index - 1, renderBars),
        concurrentQuickSort(array, index + 1, end, renderBars),
    ]);
};
export const quickSort = async (array, start, end, renderBars) => {
    if (start >= end) {
        return;
    }

    let index = await partition(array, start, end, renderBars);
    await quickSort(array, start, index - 1, renderBars);
    await quickSort(array, index + 1, end, renderBars);
};

const partition = async (array, start, end, renderBars) => {
    let pivotIndex = start;
    let pivotValue = array[end];
    array[pivotIndex].note = "pivot";

    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            array[i].note = "to-sort";
        }
    }

    for (let i = start; i < end; i++) {
        if (array[i].number < pivotValue.number) {
            swap(array, i, pivotIndex);
            await renderBars(array, 20);
            array[pivotIndex].note = "none";

            pivotIndex++;
            array[pivotIndex].note = "pivot";
        }
    }

    swap(array, pivotIndex, end);

    await renderBars(array, 20);

    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            array[i].note = "none";
        }
    }
    array[pivotIndex].note = "none";
    return pivotIndex;
};

export const insertionSort = async (array, renderBars) => {
    for (let i = 0; i < array.length; i++) {
        array[i].note = "done";
        await renderBars(array, 50);
        while (i > 0 && array[i].number < array[i - 1].number) {
            swap(array, i, i - 1);
            array[i].note = "bubble-j";
            array[i - 1].note = "done";
            await renderBars(array, 50);
            i--;
        }

        array[i].note = "none";
    }
    return array;
};
//merge sort in-place implementation from www.geeksforgeeks.org/in-place-merge-sort/
export const mergeSort = async (array, left, right, renderBars) => {
    if (left < right) {
        let mid = left + Math.floor((right - left) / 2);

        await mergeSort(array, left, mid, renderBars);
        await mergeSort(array, mid + 1, right, renderBars);

        await merge(array, left, mid, right, renderBars);
    }
};
const merge = async (array, start, mid, end, renderBars) => {
    let start2 = mid + 1;
    if (array[mid].number <= array[start2].number) {
        return;
    }
    while (start <= mid && start2 <= end) {
        if (array[start].number <= array[start2].number) {
            start++;
            continue;
        }
        let value = array[start2].number;
        let index = start2;
        while (index != start) {
            array[index].number = array[index - 1].number;
            index--;
        }
        array[start].number = value;
        array[start].note = "bubble-j";
        array[end].note = "done";
        await renderBars(array, false);
        array[start].note = "none";
        array[end].note = "none";
        start++;
        mid++;
        start2++;
    }
};
export const colorSortedArray = async (array, renderBars, delay) => {
    array.forEach((item) => {
        item.note = "none";
    });
    renderBars(array);
    if (!delay) {
        delay = 5;
    }
    for (let i = 0; i < array.length; i++) {
        array[i].note = "done";
        await renderBars(array, delay);
    }
};

const swap = (array, index1, index2) => {
    const temp = array[index1].number;
    array[index1].number = array[index2].number;
    array[index2].number = temp;
};
