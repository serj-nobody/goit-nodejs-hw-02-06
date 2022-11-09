const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const { schemas } = require('../../models/user');

const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { error } = schemas.registerSchema.validate(req.body);
    if (error) {
      throw RequestError(400, 'invalid email or password');
    };

    const user = await User.findOne({ email });
    if(user) {
        throw RequestError(409, "Email is in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({email, password: hashPassword, avatarURL});
    res.status(201).json({
      email: result.email,
      subscription: result.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;