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

          // Assign random patterns to each face
          const patterns = ['pattern-checkerboard', 'pattern-stripes', 'pattern-dots'];
          const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
          faceElement.classList.add(randomPattern);

          piece.appendChild(faceElement);
        });

        container.appendChild(piece);
      }
    }
  }
}

// Create multiple cubes
function createCubes() {
  const cubesContainer = document.getElementById('cubes-container');

  for (let i = 0; i < NUM_CUBES; i++) {
    const cubeContainer = document.createElement('div');
    cubeContainer.classList.add('cube-container');
    cubesContainer.appendChild(cubeContainer);

    // Create the pieces for this cube
    createCube(cubeContainer);
  }
}

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