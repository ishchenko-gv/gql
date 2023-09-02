import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User, { UserDocument } from "../model";

export default function setupAuthStrategies() {
  passport.serializeUser((user: unknown, done) => {
    done(null, (user as UserDocument)._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }

          bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Wrong password" });
            }
          });
        })
        .catch((err) => {
          return done(null, false, { message: err });
        });
    })
  );
}
