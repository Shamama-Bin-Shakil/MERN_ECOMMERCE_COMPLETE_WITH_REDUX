// Create Token and Saving in Cookie

const sendJWT = (user, statusCode, res) => {
  const token = user.jwtAuthToken();


  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

module.exports = sendJWT;
