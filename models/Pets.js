const { Schema, model, models } = require('mongoose');

const PetSchema = new Schema({
 name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true
  },
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Owner'
    }
  ],
  identifier: {
    type: String
  },
  isCat: {
    type: Boolean,
  },
  isDog: {
    type: Boolean,
  },
  likes: {
    type: String,
  }
})

PetSchema.pre('save', async function(next){
  this.identifier = this.name
  .split('')
  .slice(0,1)
  .join('-')
  .replace(/[',.*\?\!\\\$@;:"]/, "")
  next()
})

module.exports = models.Pets || model('Pets', PetSchema)