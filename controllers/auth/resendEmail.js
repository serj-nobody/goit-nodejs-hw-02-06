const { User } = require('../../models/user');

const { RequestError, sendEmail } = require('../../helpers');

const { schemas } = require('../../models/user');

const { BASE_URL } = process.env;

const resendEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const { error } = schemas.verifyEmailSchema.validate(req.body);
    if (error) {
      throw RequestError(400, 'missing required field email');
    };

    const user = await User.findOne({ email });
    if(!user) {
        throw RequestError(404, "User not found")
    }

    if(user.verify) {
        throw RequestError(400, "Verification has already been passed")
    }
    
    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click to verify email</a>`,
    }

    await sendEmail(mail);

    res.status(200).json({
      message: 'Verification email sent',
      
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;