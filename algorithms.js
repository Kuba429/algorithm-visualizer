import { v4 } from "uuid";

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
                //swap
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                await renderBars(array, delay);
            }
            array[i].note = "none";
            array[j].note = "none";
        }
    }

    //color sorted
    colorSortedArray(array, renderBars);
};

export const colorSortedArray = async (array, renderBars, delay) => {
    if (!delay) {
        delay = 5;
    }
    for (let i = 0; i < array.length; i++) {
        array[i].note = "done";
        await renderBars(array, delay);
    }
};
