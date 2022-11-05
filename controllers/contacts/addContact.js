const { Contact } = require('../../models/contact');

const { RequestError } = require('../../helpers');

const { schemas } = require('../../models/contact')

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, `Missing required field: ${error.message}`)
    };
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;