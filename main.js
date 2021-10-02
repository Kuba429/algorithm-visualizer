import { v4 } from "uuid";
import { bubbleSort } from "./algorithms";
import "./styles/index.scss";
const arraySize = 20;
let array = [];

const createBarElement = (item) => {
    //bar wrapper
    const barWrapper = document.createElement("div");
    barWrapper.classList.add("wrapper");
    barWrapper.style.width = `${(1 / arraySize) * (true ? 80 : 100)}%`;

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
// const renderBars = (array) => {
//     const graph = document.querySelector(".graph");
//     graph.innerHTML = "";
//     array.forEach((item) => {
//         graph.appendChild(createBarElement(item));
//     });
// };
const renderBars = (array, delay) => {
    const graph = document.querySelector(".graph");
    if (delay === undefined) {
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
            }, delay);
        });
    }
};

const getRandomArray = (arraySize) => {
    const min = arraySize / 10;
    const max = arraySize - min;
    const array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push({
            number: Math.floor(Math.random() * max) + min,
            note: "none",
            id: v4(),
        });
    }

    return array;
};

const onStart = async () => {
    array = getRandomArray(arraySize);
    await renderBars(array);
};

onStart();

const testButton = document.querySelector(".test");
testButton.addEventListener("click", () => {
    renderBars(bubbleSort(array, renderBars));
});
