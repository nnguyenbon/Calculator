const MAX_LENGTH = 35;
let outputScreen = document.getElementById("output-screen");

function display(num) {
    if (outputScreen.value.length < MAX_LENGTH) {
        outputScreen.value += num;
    } else {
        alert("Screen limit!");
    }
}

function calculate() {
    try {
        const input = outputScreen.value.trim();

        if (!/^[\d+\-*/().\s%]+$/.test(input)) {
            throw new Error("Invalid characters");
        }

        const processedInput = input.replace(/(\d+(\.\d+)?)%/g, "($1*0.01)");

        if (/^\d+(\.\d+)?%$/.test(input)) {
            const singleResult = new Function(`return ${processedInput}`)();
            outputScreen.value = parseFloat(singleResult.toFixed(10));
            return;
        }

        const result = new Function(`return ${outputScreen.value}`)();

        if (result === Infinity || result === -Infinity || isNaN(result)) {
            throw new Error("Mathematical error");
        }

        if (result.toString().length > MAX_LENGTH) {
            alert("Screen limit!");
            outputScreen.value = "";
        } else {
            outputScreen.value = parseFloat(result.toFixed(10));
            addHistory(input, outputScreen.value);
        }
    } catch (err) {
        alert(err.message || "Invalid Expression");
        outputScreen.value = "";
    }
}

function Clear() {
    outputScreen.value = "";
}

function Delete() {
    str = outputScreen.value;
    outputScreen.value = str.substring(0, str.length - 1);
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/[0-9+\-*/%().]/.test(key)) {
        display(key);
    }

    if (key === "Enter") {
        calculate();
    }

    if (key === "Backspace") {
        Delete();
    }

    if (key === "Delete") {
        Clear();
    }
});

function addHistory(expression, result) {
    const historyList = document.getElementById("history-list");
    const historyItem = document.createElement("li");

    historyItem.textContent = `${expression} = ${result}`;
    historyList.appendChild(historyItem);

    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.firstElementChild);
    }
}