// Constants for cube dimensions
const SIZE = 4; // 4x4x4 cube
const PIECE_SIZE = 25; // Smaller size for each cube piece

// Create the cube dynamically
function createCube(container) {
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      for (let z = 0; z < SIZE; z++) {
        const piece = document.createElement('div');
        piece.classList.add('cube-piece');

        // Position the piece in 3D space
        piece.style.transform = `
          translateX(${(x - SIZE / 2) * PIECE_SIZE}px)
          translateY(${(y - SIZE / 2) * PIECE_SIZE}px)
          translateZ(${(z - SIZE / 2) * PIECE_SIZE}px)
        `;

        // Add faces to the piece
        const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
        faces.forEach(face => {
          const faceElement = document.createElement('div');
          faceElement.classList.add('face', face);

          // Set initial color to black
          faceElement.style.backgroundColor = 'black';

          // Add click event to change color
          faceElement.addEventListener('click', () => {
            const selectedColor = document.getElementById('color-select').value;
            faceElement.style.backgroundColor = selectedColor;
          });

          piece.appendChild(faceElement);
        });

        container.appendChild(piece);
      }
    }
  }
}

// Populate the color dropdown with options, including black
document.addEventListener('DOMContentLoaded', () => {
  const colorSelect = document.getElementById('color-select');

  // Check if the dropdown is already populated
  if (colorSelect.children.length > 0) return;

  // Define the list of colors, including "Black"
  const colors = ['red', 'blue', 'green', 'white', 'yellow', 'orange', 'black'];

  // Add each color as an option
  colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color.charAt(0).toUpperCase() + color.slice(1); // Capitalize first letter
    colorSelect.appendChild(option);
  });
});

// Handle mouse events for dragging
document.addEventListener('mousedown', (event) => {
  const target = event.target.closest('.cube-container');
  if (!target) return;

  let isDragging = true;
  let lastMousePosition = { x: event.clientX, y: event.clientY };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(moveEvent) {
    if (!isDragging) return;

    const dx = moveEvent.clientX - lastMousePosition.x;
    const dy = moveEvent.clientY - lastMousePosition.y;

    const currentRotation = target.style.transform.match(/rotateX\((-?\d+)deg\) rotateY\((-?\d+)deg\)/);
    let rotationX = currentRotation ? parseInt(currentRotation[1]) : -30;
    let rotationY = currentRotation ? parseInt(currentRotation[2]) : -45;

    rotationX += dy;
    rotationY += dx;

    target.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    lastMousePosition = { x: moveEvent.clientX, y: moveEvent.clientY };
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
});

// Initialize the cube
const cubeContainer = document.getElementById('cube-container');
createCube(cubeContainer);