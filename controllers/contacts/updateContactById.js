const { Contact } = require('../../models/contact');

const { RequestError } = require('../../helpers');

const { schemas } = require('../../models/contact')

const updateContactById = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, `Missing required field: ${error.message}`)
    };
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw RequestError(404, 'Contact not found');
    };
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;