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

export const swap = (array, index1, index2) => {
    const temp = array[index1].number;
    array[index1].number = array[index2].number;
    array[index2].number = temp;
};
