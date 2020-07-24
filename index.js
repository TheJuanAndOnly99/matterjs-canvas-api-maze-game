const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

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

const grid = Array(3).fill(null).map(() => Array(3).fill(false));

const verticals = Array(3).fill(null).map(() => Array(2).fill(false));

const horizontals = Array(2).fill(null).map(() => Array(3).fill(false));
