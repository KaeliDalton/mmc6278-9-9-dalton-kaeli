//PUT ME IN CONTROLLERS AND UPDATE REFERENCED LATER!!!!!
const { json } = require('stream/consumers')
const {Pets, Owner} = require('../models')
const {findByIdAndUpdate} = require('../models/Pets')
const {findByIdAndDelete} = require('../models/Pets')


async function create(req, res, next) {
    try{
        const {name, type, owner} = req.body
        if (!(name && type)) return res.status(400).send('must include name and type')

        const pet = await Pets.create({name, type, owner})
        return res.status(200).json(pet)
    } catch (err){
        console.log(err.message)
    }
}
//doesnt work currently
async function get(req, res) {
    try{
        const petId = req.params.id
        const pet = await Pets.findOne({_id: petId}).populate("name")
        res.render('pet', {pet})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

async function getAll(req, res) {
    try {
        const mongoQuery = {}
        const showPets = await Pets
        .find(mongoQuery)
        .populate({
            path: 'owner'
        })
        const pets = showPets.map(pet => {
            pet = pet.toObject()
            const name = JSON.stringify(req.query.owner)
            return pet
        })
        res.render('seePets', {
            pets
        })
    } catch(err) {
        res.status(500).send(err.message)
    }
}

async function update(req, res){
    try {
        const {name, type, owner} = req.body
        const petId = req.params.id

        if(!(name && type)) return res.status(400).send("must include name and type")

        const pet = await Pets.findByIdAndUpdate(petId, {name, type, owner})
        return res.status(200).json(pet)
    } catch(err) {
        res.status(500).send(err.message)
    }
}

async function remove(req, res, next) {
    const petId = req.params.id
    const pet = await Pets.findByIdAndDelete(petId)
    return res.status(200).send('Pet removed')
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove
}