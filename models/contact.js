const { Schema, model } = require('mongoose');

const Joi = require('joi');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post('save', (error, data, next) => {
  const { name, code } = error;
  error.status = (name === 'MongoServerError' && code === 11000) ? 409 : 400;
  next();
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};