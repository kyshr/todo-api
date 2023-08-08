const passport = require("passport");
const User = require("../models/user.model");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_TOKEN;
passport.use(
    new JwtStrategy(opts, function (jwtPayload, done) {
        User.findOne({ _id: jwtPayload._id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    })
);
