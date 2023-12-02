const shadesOfPink = [
  "#FFC0CB", // Pink
  "#FFB6C1", // Light Pink
  "#FF69B4", // Hot Pink
  "#FF1493", // Deep Pink
  "#C71585", // Medium Violet Red
];

const shadesOfPurple = [
  "#800080", // Purple
  "#4B0082", // Indigo
  "#8A2BE2", // Blue Violet
  "#9370DB", // Medium Purple
  "#9932CC", // Dark Orchid
];

const shadesOfOrange = [
  "#FFA500", // Orange
  "#FF8C00", // Dark Orange
  "#FF7F50", // Coral
  "#FF6347", // Tomato
  "#FF4500", // Orange Red
];

const shadesOfYellow = [
  "#FFFF00", // Yellow
  "#FFD700", // Gold
  "#FFA500", // Orange
  "#FF8C00", // Dark Orange
  "#FF7F50", // Coral
];

const drawFlower = (x, y, ctx) => {

  // Set the number of petals
  const numPetals = 5 + Math.floor(Math.random() * 5);;

  // Set the radius of the petals and the flower's center
  const petalRadius = 6 + Math.floor(Math.random() * 7);
  const centerRadius = 4 + Math.floor(Math.random() * 7);

  let index = Math.floor(Math.random() * shadesOfPink.length);
  const shadeOfPink = shadesOfPink[index];
  index = Math.floor(Math.random() * shadesOfPurple.length);
  const shadeOfPurple = shadesOfPurple[index];

  // Draw the flower
  for (let i = 0; i < numPetals; i++) {
    // Calculate the angle and position for each petal
    const angle = (2 * Math.PI * i) / numPetals;
    const petalX = x + Math.cos(angle) * petalRadius;
    const petalY = y + Math.sin(angle) * petalRadius;

    // Draw the petal as a circle
    ctx.beginPath();
    ctx.arc(petalX, petalY, petalRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = shadeOfPink;
    ctx.fill();
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = shadeOfPurple;
    ctx.stroke();
  }

  index = Math.floor(Math.random() * shadesOfOrange.length);
  const shadeOfOrange = shadesOfOrange[index];
  index = Math.floor(Math.random() * shadesOfYellow.length);
  const shadeOfYellow = shadesOfYellow[index];
  
  // Draw the center of the flower
  ctx.beginPath();
  ctx.arc(x, y, centerRadius, 0, 2 * Math.PI, false);
  ctx.fillStyle = shadeOfYellow;
  ctx.fill();
  ctx.lineWidth = 0.1;
  ctx.strokeStyle = shadeOfOrange;
  ctx.stroke();
};

export default drawFlower;
