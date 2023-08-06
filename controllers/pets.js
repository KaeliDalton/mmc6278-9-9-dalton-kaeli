const { json } = require('stream/consumers')
const {Pets, Owner} = require('../models')
const {findByIdAndUpdate} = require('../models/Pets')
const {findByIdAndDelete} = require('../models/Pets')


async function create(req, res, next) {
    try{
        const {name, type, owner, id, isCat, isDog, likes} = req.body
        if (!(name && type)) return res.status(400).send('must include name and type')

        const pets = await Pets.create({name, type, owner, id, isCat, isDog, likes})
        return res.render("pet", {pets})
    } catch (err){
        console.log(err.message)
    }
}

async function get(req, res) {
    try{
        const pets = await Pets.findById(req.params.id)
       .populate('owner')
        res.render('pet', {pets})
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
        const {name, type, isCat, isDog, likes} = req.body
        const petId = req.params.id

        if(!(name && type)) return res.status(400).send("must include name and type")

        const pets = await Pets.findByIdAndUpdate(petId, {name, type, isCat, isDog, likes})
        return res.render("update", {pets})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

async function remove(req, res, next) {
    const petId = req.params.id
    const pets = await Pets.findByIdAndDelete(petId)
    return res.render("delete", {pets})
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove
}