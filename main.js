import { v4 } from "uuid";
import "./styles/index.scss";
const arraySize = 10;
const createBar = (item) => {
    //bar wrapper
    const barWrapper = document.createElement("div");
    barWrapper.classList.add("wrapper");
    barWrapper.style.width = `${(1 / arraySize) * (true ? 80 : 100)}%`;

    //bar
    const bar = document.createElement("div");
    bar.classList.add("bar");
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

const renderBars = (array) => {
    const graph = document.querySelector(".graph");
    array.map((item) => {
        graph.appendChild(createBar(item));
    });
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

const onStart = () => {
    const array = getRandomArray(10);
    renderBars(array);
};

onStart();
