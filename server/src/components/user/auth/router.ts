import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";

import User, { UserDocument } from "../model";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });

  if (checkUser) {
    return res
      .status(409)
      .json({ errors: [{ message: "User already exists" }] });
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;

      const user = new User({
        email,
        hashedPassword: hash,
      });

      user
        .save()
        .then((user) => {
          req.logIn(user, (err) => {
            if (err) return next(err);

            res.status(201).json({
              _id: user._id,
              email: user.email,
            });
          });
        })
        .catch((err) => {
          next(err);
        });
    });
  });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/auth/unauthorized",
  }),
  (req, res) => {
    res.status(200).json({
      _id: (req.user as UserDocument)?._id,
      email: (req.user as UserDocument)?.email,
    });
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/unauthorized",
    successRedirect: "http://localhost:3000",
  })
);

router.get("/unauthorized", (req, res) => {
  res.status(401).json({
    errors: req
      .flash("error")
      .map((errorMessage) => ({ message: errorMessage })),
  });
});

router.get("/me", (req, res) => {
  res.json({
    _id: req.user?._id,
    email: req.user?.email,
  });
});

router.post("/signout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.send();
  });
});

export default router;
