if (process.env.MONGODB_URI) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "SEEDING MONGODB PRODUCTION DATABASE!!!\n".repeat(3)
  );
  console.log("\x1b[31m%s\x1b[0m", "Don't forget to clear MONGODB_URI!\n");
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Run 'export MONGODB_URI=' or close this terminal after seeding.",
    "\n"
  );
} else {
  console.log("\x1b[33m%s\x1b[0m", "SEEDING MONGODB LOCAL DB");
}

const { Pets, Owner } = require("../models");
const { connection } = require("../config/connection");

connection.once("open", async function () {
  // insert a sample user
  // await User.create({ username: "banana", password: "meatloaf" })
  const pets = await Pets.create([
    {name: "Kallie Smith", type: "Cat", isCat: "true", isDog: "false"}, //0
    {name: "Savannah Smith", type: "Dog", isCat: "false", isDog: "true"}, //1
    {name: "Edwin Smith", type: "Cat", isCat: "true", isDog: "false"}, //2
    {name: "Cinnamon", type: "Cat", isCat: "true", isDog: "false"}, //3
    {name: "Nutmeg", type: "Cat", isCat: "true", isDog: "false"}, //4
    {name: "Betsy", type: "Rabbit", isCat: "false", isDog: "false"}, //5
    {name: "Yoda", type: "Dog", isCat: "false", isDog: "true"}, //6
    {name: "Leia", type: "Dog", isCat: "false", isDog: "true"}, //7
    {name: "Fluffy", type: "Dog", isCat: "false", isDog: "true"}, //8
  ])
  const owner = await Owner.create([
    {name: "Michael Smith"}, //0
    {name: "Elizabeth Smith"}, //1
    {name: "Kat Houston"}, //2
    {name: "Amber Libby"}, //3
    {name: "Mikayla Brown"}, //4
    {name: "Blake Brown"}, //5
    {name: "Mia Brown"}, //6
  ])
  pets[0].owner = [owner[0]._id, owner[1]._id];
  pets[1].owner = [owner[0]._id, owner[1]._id];
  pets[2].owner = [owner[0]._id, owner[1]._id];
  pets[3].owner = [owner[2]._id];
  pets[4].owner = [owner[2]._id];
  pets[5].owner = [owner[3]._id];
  pets[6].owner = [owner[4]._id, owner[5]._id, owner[6]._id];
  pets[7].owner = [owner[4]._id, owner[5]._id, owner[6]._id];
  pets[8].owner = [owner[4]._id, owner[5]._id, owner[6]._id];
  
  await Promise.all([
    ...pets.map(pet => pet.save()),
    ...owner.map(owner => owner.save())
  ]);
  connection.close();
});
