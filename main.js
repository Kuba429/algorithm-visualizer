import { mergeSort } from "./algorithms/mergeSort";
import { bubbleSort } from "./algorithms/bubbleSort";
import { insertionSort } from "./algorithms/insertionSort";
import { quickSort, concurrentQuickSort } from "./algorithms/quickSort";
import "./styles/index.scss";
import { colorSortedArray } from "./helpers";
//non-scoped variables
let arraySize = 100;
let array = [];
let isSorting = false;
let delay = 10;

const createBarElement = (item) => {
    //bar wrapper
    const barWrapper = document.createElement("div");
    barWrapper.classList.add("wrapper");
    barWrapper.style.width = `${
        (1 / arraySize) * (arraySize < 150 ? 80 : 100)
    }%`;

    //bar
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.classList.add(item.note);
    bar.style.height = `${(item.number / arraySize) * 100}%`;

    //number
    const numberText = document.createElement("p");
    const numberTextNode = document.createTextNode(item.number);
    numberText.appendChild(numberTextNode);

    //appending children
    barWrapper.appendChild(bar);
    arraySize <= 100 && barWrapper.appendChild(numberText);
    return barWrapper;
};

export const renderBars = (array, delayBool) => {
    const graph = document.querySelector(".graph");
    if (delayBool === undefined && delayBool == false) {
        graph.innerHTML = "";
        array.forEach((item) => {
            graph.appendChild(createBarElement(item));
        });
        return array;
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                graph.innerHTML = "";
                array.forEach((item) => {
                    graph.appendChild(createBarElement(item));
                });
                resolve(array);
            }, delayBool);
        });
    }
};
const getRandomArray = (array, arraySize) => {
    array.length = 0;
    for (let i = 0; i < arraySize; i++) {
        array.push({
            number: i,
            note: "none",
        });
    }
    //shuffle
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};
const resetArray = () => {
    getRandomArray(array, arraySize);
    renderBars(array);
};
// export const scrollTop = ()=>{

// }
const onStart = () => {
    //get elements
    const newArrayButton = document.querySelector(".newArrayButton");
    const bubbleSortButton = document.querySelector(".bubbleSortButton");
    const mergeSortButton = document.querySelector(".mergeSortButton");
    const quickSortButton = document.querySelector(".quickSortButton");
    const concurrentQuickSortButton = document.querySelector(
        ".concurrentQuickSortButton"
    );
    const arraySizeSlider = document.querySelector(".arraySizeSlider");
    const insertionSortButton = document.querySelector(".insertionSortButton");
    //event listeners
    newArrayButton.addEventListener("click", resetArray);
    bubbleSortButton.addEventListener("click", () =>
        bubbleSort(array, renderBars)
    );
    mergeSortButton.addEventListener("click", async () => {
        await mergeSort(array, 0, array.length - 1, renderBars);
        await colorSortedArray(array, renderBars);
    });
    quickSortButton.addEventListener("click", async () => {
        await quickSort(array, 0, array.length - 1, renderBars);
        await colorSortedArray(array, renderBars);
    });

    concurrentQuickSortButton.addEventListener("click", async () => {
        await concurrentQuickSort(array, 0, array.length - 1, renderBars);
        await colorSortedArray(array, renderBars);
    });
    insertionSortButton.addEventListener("click", async () => {
        await insertionSort(array, renderBars);
        await colorSortedArray(array, renderBars);
    });

    arraySizeSlider.addEventListener("input", (e) => {
        arraySize = e.target.value;
        resetArray();
    });

    //last stage
    arraySize = arraySizeSlider.value;
    resetArray();
};

onStart();
