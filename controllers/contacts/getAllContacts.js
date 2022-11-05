const { Contact } = require('../../models/contact');

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const result = await Contact.find({owner}, undefined, {skip, limit}).populate('owner', '_id email');
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;