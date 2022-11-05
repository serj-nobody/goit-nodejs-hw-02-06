const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const { schemas } = require('../../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { error } = schemas.loginSchema.validate(req.body);
    if (error) {
      throw RequestError(400, 'invalid email or password');
    };

    const user = await User.findOne({ email });
    if(!user) {
        throw RequestError(401, "Email or password is wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw RequestError(401, "Email or password is wrong")
    }

    const payload = {
      id: user._id,
      email: user.email,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;