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
        const validExpression = /^[0-9+\-*/().\s]*$/;
        const input = outputScreen.value.trim();

        if (!validExpression.test(input)) {
            throw new Error("Invalid characters in expression");
        }

        const result = new Function(`return ${outputScreen.value}`)();

        if (result.toString().length > MAX_LENGTH) {
            alert("Screen limit!");
            outputScreen.value = "";
        } else {
            outputScreen.value = parseFloat(result.toFixed(10));
        }
    } catch (err) {
        alert("Invalid Expression");
        outputScreen.value = "";
    }
}

function Clear() {
    outputScreen.value = "";
}

function Delete() {
    str = outputScreen.value;
    outputScreen.value = str.substring(0, -1);
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/[0-9+\-*/().]/.test(key)) {
        display(key);
    }

    if (key === "Enter") {
        calculate();
    }

    if (key === "Backspace") {
        Delete();
    }

    if (key === "Escape") {
        Clear();
    }
});