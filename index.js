const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const cells = 3;
const width = 600;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element : document.body,
  engine  : engine,
  options : {
    wireframes : true,
    width      : width,
    height     : height
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// NOTE: Click & Drag
// World.add(
//   world,
//   MouseConstraint.create(engine, {
//     mouse : Mouse.create(render.canvas)
//   })
// );

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];

World.add(world, walls);

// NOTE: Generate Random Shapes
// for (let i = 0; i < 10; i++) {
//   if (Math.random() > 0.5) {
//     World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
//   }
//   else {
//     World.add(
//       world,
//       Bodies.circle(Math.random() * width, Math.random() * height, 35, {
//         render : { fillStyle: 'green' }
//       })
//     );
//   }
// }

// Maze Generation

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));

const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
  // If I have visited the call at [column, row], then return
  if (grid[row][column]) {
    return;
  }
  // Mark this cell as being visited
  grid[row][column] = true;
  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [ row - 1, column, 'up' ],
    [ row, column + 1, 'right' ],
    [ row + 1, column, 'down' ],
    [ row, column - 1, 'left' ]
  ]);

  // For each neighbor...
  for (let neighbor of neighbors) {
    const [ nextRow, nextColumn, direction ] = neighbor;

    // See if that neighbor is out of bounds
    if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
      continue;
    }

    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // Remove a wall from either the horizontals or verticals
    if (direction === 'left') {
      verticals[row][column - 1] = true;
    }
    else if (direction === 'right') {
      verticals[row][column] = true;
    }

    if (direction === 'up') {
      horizontals[row - 1][column] = true;
    }
    else if (direction === 'down') {
      horizontals[row][column] = true;
    }

    stepThroughCell(nextRow, nextColumn);
  }

  // Visit that next cell
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row) => {
  console.log(row);
});
