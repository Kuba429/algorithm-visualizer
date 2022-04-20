import { swap } from "../helpers";

export const insertionSort = async (array, renderBars) => {
    for (let i = 0; i < array.length; i++) {
        array[i].note = "done";
        while (i > 0 && array[i].number < array[i - 1].number) {
            swap(array, i, i - 1);
            array[i - 1].note = "bubble-j";
            await renderBars(array, false);
            i--;
        }
        array[i].note = "none";
    }
    return array;
};
