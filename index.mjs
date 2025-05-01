const CAR = "car";
const GOAT = "goat";
const OPENED = "opened";
const NUMBER_EXECUTIONS = 1000000;

const selectRandomDoor = async () => {
  return Math.floor(Math.random() * 3);
};

const generateDoors = async () => {
  const goldenDoor = await selectRandomDoor();
  return [
    goldenDoor === 0 ? CAR : GOAT,
    goldenDoor === 1 ? CAR : GOAT,
    goldenDoor === 2 ? CAR : GOAT
  ]
};

const simulateGame = async (shouldSwitchDoor) => {
  const doors = await generateDoors();

  // Picking a random door
  let pickedDoor = await selectRandomDoor();

  // Opening door
  const firstGoatDoorIndex = doors.findIndex((door, index) => door === GOAT && index != pickedDoor);
  doors[firstGoatDoorIndex] = OPENED;

  if (!shouldSwitchDoor) {
    return doors[pickedDoor] === CAR;
  }
  return doors[pickedDoor] !== CAR;
};

const start = async () => {
  console.log("Simulating", NUMBER_EXECUTIONS, "games without switching door");
  const resultsWithoutSwitchingDoor = await Promise.all(Array(NUMBER_EXECUTIONS).fill().map(() => simulateGame(false)));
  const numberOfWinsWithoutSwitchingDoor = resultsWithoutSwitchingDoor.filter(result => result).length;
  const percentageWithoutSwitchingDoor = (numberOfWinsWithoutSwitchingDoor / NUMBER_EXECUTIONS) * 100;

  console.log("Simulating", NUMBER_EXECUTIONS, "games and switch door everytime");
  const resultsWhenSwitchingDoor = await Promise.all(Array(NUMBER_EXECUTIONS).fill().map(() => simulateGame(true)));
  const numberOfWinsWhenSwitchingDoor = resultsWhenSwitchingDoor.filter(result => result).length;
  const percentageWhenSwitchingDoor = (numberOfWinsWhenSwitchingDoor / NUMBER_EXECUTIONS) * 100;

  // Printing results
  console.log("Number of wins without switching door", numberOfWinsWithoutSwitchingDoor, " - ", percentageWithoutSwitchingDoor, "%");
  console.log("Number of wins when switching door", numberOfWinsWhenSwitchingDoor, "win percentage: ", percentageWhenSwitchingDoor, "%");
}

await start();