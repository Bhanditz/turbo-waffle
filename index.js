const { writeFile } = require("fs");
const { promisify } = require("util");
const packagejson = require("./package.json");

const setTimeoutPromise = promisify(setTimeout);

const logger = (delay, message) =>
  setTimeoutPromise(delay, message).then(m => {
    console.log(m);
  });

const { waffles } = packagejson;

const maxWaffles = 1e3;

const waffleMin = Math.min(waffles, maxWaffles);

const tooManyWaffles =
  waffles < maxWaffles
    ? []
    : [
        `hold on, nobody needs ${waffles} waffles`,
        1000,
        `I'm cutting you off. You can have ${waffleMin} waffles`,
        1000
      ];

const waffleArray = [...Array(waffleMin).keys()].map(d => "waffle");

const sequence = [
  "[1] preparing waffle irons...",
  1000,
  "[2] plugging in waffle irons...",
  1000,
  ...tooManyWaffles,
  `[3] pouring ${waffleMin} waffles...`,
  1000,
  `[4] cooking ${waffleMin} waffles with advanced waffle-making optimization algorithm`,
  2000,
  `[5] ensuring golden perfection with advanced golden-perfection-ensuring algorithm`,
  2000,
  "    ...almost there",
  1000,
  "[7] writing waffles to waffles.build.txt"
];

const fullDelay = sequence.reduce((acc, curr, i) => {
  if (i % 2 === 0) {
    logger(acc, curr);
    return acc;
  } else {
    return acc + curr;
  }
}, 0);

setTimeoutPromise(fullDelay, waffleArray).then(arr => {
  writeFile("waffle.build.txt", arr, err => {
    if (err) throw err;
    console.log("Waffles are done! Enjoy your waffles! 🎉");
  });
});
