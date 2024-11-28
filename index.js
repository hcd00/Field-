const soccerField = document.querySelector('.soccer-field');

// Add event listeners to handle dragging
document.querySelectorAll('.container').forEach(player => {
    player.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id); // Store the player's ID
    });
});

// Allow dropping and calculate the new grid position
soccerField.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
});

soccerField.addEventListener('drop', (e) => {
    e.preventDefault();

    const playerId = e.dataTransfer.getData('text/plain'); // Retrieve the player's ID
    const player = document.getElementById(playerId);

    // Get the bounding box of the soccer field
    const fieldRect = soccerField.getBoundingClientRect();

    // Calculate the grid cell based on the drop coordinates
    const columnCount = 6; // Matches the number of grid-template-columns
    const rowCount = 5;    // Matches the number of grid-template-rows
    const cellWidth = fieldRect.width / columnCount;
    const cellHeight = fieldRect.height / rowCount;

    const x = e.clientX - fieldRect.left;
    const y = e.clientY - fieldRect.top;

    // Determine the grid column and row (1-based index)
    const column = Math.min(columnCount, Math.max(1, Math.ceil(x / cellWidth)));
    const row = Math.min(rowCount, Math.max(1, Math.ceil(y / cellHeight)));

    // Update player's grid position
    player.style.gridColumnStart = column;
    player.style.gridRowStart = row;
});