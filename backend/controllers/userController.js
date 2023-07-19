const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendJWT = require("../utils/jwtSend");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// User Register
exports.register = catchAsyncError(async (req, res, next) => {
  const opts = {
    folder: "avatar",
    width: 150,
    crop: "scale",
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
  };
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, opts);
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // sendJWT(user, 201, res);
  const token = user.jwtAuthToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, token });
});

// User Login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorHandler("Please Enter a valid email and password", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }
  sendJWT(user, 200, res);
});

// User Logout
exports.logout = catchAsyncError(async (req, res, next) => {
  console.log("Welcome Logout");
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged Out Successfully",
  });
});

// User Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const frontEndUrl = "http://localhost:3000";
  const resetPasswordUrl = `${frontEndUrl}/password/reset/${resetToken}`;

  const message = `Your message reset token is :- \n\n ${resetPasswordUrl} \n\nIf have not requested this email then, Please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "E-Commerce Password Recovery",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email Sent to ${user.email} Successfully`,
    });
  } catch (e) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(e.message, 500));
  }
});

// User Reset Password After Email Verified
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendJWT(user, 200, res);
});

// User Get Single Data
exports.getUserDetail = catchAsyncError(async (req, res, next) => {
  // console.log(req.cookies);
  const userData = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user: userData,
  });
});

// User Update Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendJWT(user, 200, res);
});

// User Update Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newDataEntry = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const opts = {
      folder: "avatar",
      width: 150,
      crop: "scale",
      overwrite: true,
      invalidate: true,
      resource_type: "auto",
    };
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, opts);
    newDataEntry.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  }

  await User.findByIdAndUpdate(req.user.id, newDataEntry, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

// Get All User (Admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

// Get Single User Detail (Admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User doest not exit with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, user });
});

// User Update Profile (Admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newDataEntry = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newDataEntry, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, message: "User Updated Successfully" });
});

// User Delete (Admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User doest not exist with this Id : ${req.params.id}`)
    );
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);


  await User.findByIdAndRemove(req.params.id);

  res.status(200).json({ success: true, message: "User Deleted Successfully" });
});
