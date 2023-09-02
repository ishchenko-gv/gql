import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../model";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });

  if (checkUser) {
    return res.status(409).send("User already exists");
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;

      const user = new User({
        email,
        hashedPassword: hash,
      });

      user.save().then((user) => {
        res.status(201).send(user);
      });
    });
  });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureMessage: true,
  })
);

router.get("/me", (req, res) => {
  res.send(req.user);
});

export default router;
