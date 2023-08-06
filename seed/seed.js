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
    {name: "Kallie Smith", type: "Cat", isCat: "true", isDog: "false", likes: "likes naps, catnip, cuddles, and playing with hair"}, 
    {name: "Savannah Smith", type: "Dog", isCat: "false", isDog: "true", likes:"likes kids, walks, peanut butter, and ice cubes"}, 
    {name: "Edwin Smith", type: "Cat", isCat: "true", isDog: "false", likes: "likes catnip, naps, lizards, and chicken"}, 
    {name: "Cinnamon", type: "Cat", isCat: "true", isDog: "false", likes: "likes quiet, playing with toys, tuna, and pillows"}, 
    {name: "Nutmeg", type: "Cat", isCat: "true", isDog: "false", likes: "likes fish, catnip balls, cuddles, and birds"}, 
    {name: "Betsy", type: "Rabbit", isCat: "false", isDog: "false", likes: "likes carrots, sunshine, naps, and playtime"}, 
    {name: "Yoda", type: "Dog", isCat: "false", isDog: "true", likes: "likes cuddles, walks, beef, and rubber balls"}, 
    {name: "Leia", type: "Dog", isCat: "false", isDog: "true", likes: "likes squirrels, naps, people, and bones"}, 
    {name: "Fluffy", type: "Dog", isCat: "false", isDog: "true", likes: "likes cuddles, quiet, chew toys, and chicken"}, 
  ])
  const owner = await Owner.create([
    {name: "Michael Smith"}, 
    {name: "Elizabeth Smith"}, 
    {name: "Kat Houston"}, 
    {name: "Amber Libby"}, 
    {name: "Mikayla Brown"}, 
    {name: "Blake Brown"}, 
    {name: "Mia Brown"}, 
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
