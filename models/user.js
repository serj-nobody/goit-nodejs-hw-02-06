const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleSaveErrors } = require('../helpers');

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegExp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String,
  avatarURL: {
    type: String,
  }
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleSaveErrors);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};