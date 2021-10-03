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
