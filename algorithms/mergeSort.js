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
