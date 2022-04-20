import { colorSortedArray, swap } from "../helpers";

export const bubbleSort = async (array, renderBars) => {
    const delay = false;
    for (let i = 0; i < array.length; i++) {
        for (let j = array.length - 1; j > i; j--) {
            array[i].note = "bubble-i";
            array[j].note = "bubble-j";

            // await renderBars(array, delay);
            if (array[i].number > array[j].number) {
                swap(array, i, j);
                await renderBars(array, delay);
            }
            array[i].note = "none";
            array[j].note = "none";
        }
    }
};
