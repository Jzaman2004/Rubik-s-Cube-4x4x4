// Constants for cube dimensions
const SIZE = 4; // 4x4x4 cube
const PIECE_SIZE = 25; // Smaller size for each cube piece
const NUM_CUBES = 11; // Total number of cubes to display

// Create a single cube dynamically
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

// Create multiple cubes and labels
function createCubes() {
  const cubesContainer = document.getElementById('cubes-container');
  const labelsContainer = document.createElement('div');
  labelsContainer.classList.add('labels-container');
  document.body.appendChild(labelsContainer);

  const cubeSelect = document.getElementById('cube-select');

  for (let i = 0; i < NUM_CUBES; i++) {
    // Create cube container
    const cubeContainer = document.createElement('div');
    cubeContainer.classList.add('cube-container');
    cubeContainer.dataset.cubeId = i; // Assign a unique ID to each cube
    cubesContainer.appendChild(cubeContainer);

    // Create the pieces for this cube
    createCube(cubeContainer);

    // Add cube to the dropdown
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `Cube ${i + 1}`;
    cubeSelect.appendChild(option);

    // Create label for this cube
    const label = document.createElement('div');
    label.classList.add('cube-label');
    label.textContent = `Cube ${i + 1}`;

    // Add click event to select the cube
    label.addEventListener('click', () => {
      cubeSelect.value = i; // Select the corresponding cube in the dropdown
    });

    labelsContainer.appendChild(label);
  }
}

// Populate the color dropdown with options, ensuring no duplicates
document.addEventListener('DOMContentLoaded', () => {
  const colorSelect = document.getElementById('color-select');

  // Check if the dropdown is already populated
  if (colorSelect.children.length > 0) return;

  const colors = ['red', 'blue', 'green', 'white', 'yellow', 'orange', 'black'];
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

// Initialize the cubes
createCubes();