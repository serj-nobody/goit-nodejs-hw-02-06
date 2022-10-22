const { Contact } = require('../../models/contact');

const { RequestError } = require('../../helpers');

const removeContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw RequestError(404, 'Contact not found');
    };
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContactById;