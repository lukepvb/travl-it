const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const { username } = req.body;
  res.cookie('username', username, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
    secure: true
  });
  return next();
};

module.exports = cookieController;
