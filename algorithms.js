export const bubbleSort = async (array, renderBars) => {
    const delay = 100;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            array[i].note = "bubble-i";
            array[j].note = "bubble-j";

            await renderBars(array, delay);
            if (array[i].number > array[j].number) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                await renderBars(array, delay);
            }
            array[i].note = "none";
            array[j].note = "none";
        }
    }

    // return array;
};
