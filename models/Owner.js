const { Schema, model, models } = require('mongoose');

const OwnerSchema = new Schema({
  name: {
  type: String,
  required: true,
  }
  }, {
  toJSON: {
  virtuals: true
  },
  toObject: {
  virtuals: true
  }
  }
  )
  OwnerSchema.virtual('pets', {
  ref: 'Pets',
  localField: '_id', // id of the owner
  foreignField: 'owner' // where the localField exists on other Schema
  })


module.exports = models.Owner || model('Owner', OwnerSchema)