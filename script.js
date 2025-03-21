// DOM Elements
const container = document.querySelector(".container");
const slider = document.getElementById("gridSizeSlider");
const label = document.getElementById("gridSizeLabel");
const colorPicker = document.getElementById("colorPicker");
const btnColor = document.querySelector(".btn-color");
const btnColorMode = document.querySelector(".btn-colors-mode");
const btnRGBMode = document.querySelector(".btn-rgb-mode");
const btnEraserMode = document.querySelector(".btn-eraser-mode");
const btnHideBorder = document.querySelector(".btn-hide-border");
const btnClear = document.querySelector(".btn-clear");
const bgColorPicker = document.getElementById("background-colorPicker");
const btnBgColor = document.querySelector(".btn-bgcolor");

// Mode settings
const modeButtons = [btnColorMode, btnRGBMode, btnEraserMode];
let isDrawing = false;
let currentMode = "color";
let selectedColor = "#000000"; // Default color
let selectedBgColor = "#171717"; // Default background color

// Set default mode when the page loads
window.addEventListener("DOMContentLoaded", () => {
    setActiveMode("color", btnColorMode);
    createGrid(16);
});

// Create grid dynamically
function createGrid(size) {
    container.innerHTML = "";
    container.style.setProperty("--grid-size", size);

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.backgroundColor = selectedBgColor; // Use selected background color
        container.appendChild(square);
    }
}

// Generate random RGB color
function getRandomColor() {
    return `rgb(${rand(256)}, ${rand(256)}, ${rand(256)})`;
}
function rand(max) {
    return Math.floor(Math.random() * max);
}

// Drawing event listeners
container.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("square")) return;
    isDrawing = true;
    applyColor(e.target);
    e.preventDefault();
});

container.addEventListener("mousemove", (e) => {
    if (!isDrawing || !e.target.classList.contains("square")) return;
    applyColor(e.target);
    e.preventDefault();
});

document.addEventListener("mouseup", () => {
    isDrawing = false;
});

// Apply color based on selected mode
function applyColor(square) {
    if (currentMode === "color") {
        square.style.backgroundColor = selectedColor;
    } else if (currentMode === "rgb") {
        square.style.backgroundColor = getRandomColor();
    } else if (currentMode === "eraser") {
        square.style.backgroundColor = selectedBgColor; // Restore selected background color
    }
}

// Color Picker Button
btnColor.addEventListener("click", () => colorPicker.click());
colorPicker.addEventListener("input", (e) => {
    selectedColor = e.target.value;
    btnColor.style.backgroundColor = selectedColor;
});

// Mode Selection
function setActiveMode(mode, button) {
    currentMode = mode;
    modeButtons.forEach(btn => btn.classList.remove("active-mode"));
    button.classList.add("active-mode");
}

btnColorMode.addEventListener("click", () => setActiveMode("color", btnColorMode));
btnRGBMode.addEventListener("click", () => setActiveMode("rgb", btnRGBMode));
btnEraserMode.addEventListener("click", () => setActiveMode("eraser", btnEraserMode));

// Hide Border Button
btnHideBorder.addEventListener("click", () => {
    document.querySelectorAll(".square").forEach(square => {
        square.classList.toggle("no-border");
    });
});

// Clear Button - Reset to selected background color
btnClear.addEventListener("click", () => {
    document.querySelectorAll(".square").forEach(square => {
        square.style.backgroundColor = selectedBgColor;
    });
});

// Background Color Picker
btnBgColor.addEventListener("click", () => bgColorPicker.click());
bgColorPicker.addEventListener("input", (event) => {
  selectedBgColor = event.target.value;

  // Apply new background color to ALL squares
  document.querySelectorAll(".square").forEach(square => {
      square.style.backgroundColor = selectedBgColor;
  });

  // Update button color to match selected background
  btnBgColor.style.backgroundColor = selectedBgColor;
});

// Update Grid Size When Slider Changes
slider.addEventListener("input", () => {
    const newSize = slider.value;
    label.textContent = `${newSize} x ${newSize}`;
    createGrid(newSize);
});
