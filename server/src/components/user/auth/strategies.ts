import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User, { UserDocument } from "../model";

export default function setupAuthStrategies() {
  const localStrategy = new LocalStrategy(
    { usernameField: "email" },
    (email, password, done) => {
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
    }
  );

  const googleStrategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
      callbackURL: "/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (err: any, user?: any) => void
    ) => {
      const email = profile.emails[0].value;
      let user;

      try {
        user = await User.findOne({
          $or: [
            {
              googleId: profile.id,
            },
            {
              email,
            },
          ],
        });
      } catch (err) {
        done(err);
      }

      if (!user) {
        try {
          const newUser = new User({
            email,
            googleId: profile.id,
          });

          await newUser.save();
        } catch (err) {
          done(err);
        }
      } else if (user.email === email && !user.googleId) {
        try {
          user.googleId = profile.id;

          await user.save();

          done(null, user);
        } catch (err) {
          done(err);
        }
      } else {
        done(null, user);
      }
    }
  );

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

  passport.use(localStrategy);
  passport.use(googleStrategy);
}
