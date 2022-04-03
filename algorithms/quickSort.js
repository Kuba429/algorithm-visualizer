import { swap } from "../helpers";

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
            await renderBars(array, false);
            array[pivotIndex].note = "none";

            pivotIndex++;
            array[pivotIndex].note = "pivot";
        }
    }

    swap(array, pivotIndex, end);

    await renderBars(array, false);

    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            array[i].note = "none";
        }
    }
    array[pivotIndex].note = "none";
    return pivotIndex;
};
