const getCurrent = async (req, res, next) => {
  const { email, subscription} = req.user;
  try {
    res.status(200).json({
      email,
      subscription,
    })
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent