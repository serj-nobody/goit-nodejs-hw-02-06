const { User } = require('../../models/user');

const { RequestError, sendEmail } = require('../../helpers');

const { schemas } = require('../../models/user');

const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { BASE_URL } = process.env;

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
    const verificationToken = nanoid();
    const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
    
    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to verify email</a>`,
    }

    await sendEmail(mail);

    res.status(201).json({
      email: result.email,
      subscription: result.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;