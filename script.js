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

const modeButtons = [btnColorMode, btnRGBMode, btnEraserMode]; // Store buttons for easy styling

let isDrawing = false;
let currentMode = "color"; // Default mode
let selectedColor = "#000000"; // Default color

// Set Color Mode as default when the page loads
window.addEventListener("DOMContentLoaded", () => {
  setActiveMode("color", btnColorMode);
});

let selectedBgColor = "#171717"; // Default background color

function createGrid(size) {
    container.innerHTML = ""; // Clear previous grid
    container.style.setProperty("--grid-size", size);

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.backgroundColor = selectedBgColor; // Apply selected background color
        container.appendChild(square);
    }
}

// Function to get a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Event Listeners for Drawing
container.addEventListener("mousedown", (event) => {
  if (!event.target.classList.contains("square")) return;
  isDrawing = true;
  applyColor(event.target);
  event.preventDefault();
});

container.addEventListener("mousemove", (event) => {
  if (!isDrawing || !event.target.classList.contains("square")) return;
  applyColor(event.target);
  event.preventDefault();
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
});

// Apply color based on mode
function applyColor(square) {
  if (currentMode === "color") {
    square.style.backgroundColor = selectedColor;
  } else if (currentMode === "rgb") {
    square.style.backgroundColor = getRandomColor();
  } else if (currentMode === "eraser") {
    square.style.backgroundColor = ""; // Reset to default
  }
}

btnColor.addEventListener("click", () => {
  colorPicker.click(); // Programmatically triggers the color picker
});

// Update selected color when picking a color
colorPicker.addEventListener("input", (event) => {
  selectedColor = event.target.value;
  btnColor.style.backgroundColor = selectedColor; // Visually show the selected color
});




// Function to set active mode
function setActiveMode(mode, button) {
  currentMode = mode;
  modeButtons.forEach(btn => btn.classList.remove("active-mode")); // Remove highlight from all buttons
  button.classList.add("active-mode"); // Highlight selected button
}

// Mode Selectors
btnColorMode.addEventListener("click", () => setActiveMode("color", btnColorMode));
btnRGBMode.addEventListener("click", () => setActiveMode("rgb", btnRGBMode));
btnEraserMode.addEventListener("click", () => setActiveMode("eraser", btnEraserMode));

// Hide Border
btnHideBorder.addEventListener("click", () => {
    document.querySelectorAll(".square").forEach(square => {
        square.classList.toggle("no-border");
    });
});



// Clear Button
btnClear.addEventListener("click", () => {
  document.querySelectorAll(".square").forEach(square => {
      square.style.backgroundColor = selectedBgColor; // Use selected background color
  });
});


// Open color picker when the button is clicked
btnBgColor.addEventListener("click", () => bgColorPicker.click());

// Change background color of all squares dynamically
bgColorPicker.addEventListener("input", (event) => {
  selectedBgColor = event.target.value; 

  // Apply the new background color to all squares
  document.querySelectorAll(".square").forEach(square => {
      square.style.backgroundColor = selectedBgColor;
  });

  // Update the background color of the button
  btnBgColor.style.backgroundColor = selectedBgColor;
});



// Update Grid Size When Slider Changes
slider.addEventListener("input", () => {
  const newSize = slider.value;
  label.textContent = `${newSize} x ${newSize}`;
  createGrid(newSize);
});

// Initial Grid Setup
createGrid(16);
