
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userModel } from '../../database/models/user.model.js';
import { AppError } from './AppError.js';

// Export the function to configure Google authentication
export const authGoogle = (passport) => {
    // Configure the Google Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID, // Google client ID from environment variables
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google client secret from environment variables
        callbackURL: process.env.CALL_BACK_URL, // Callback URL from environment variables
        scope: ['profile', 'email'] // Scopes to request from Google
    }, auth));

    // Serialize the user to save in the session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Deserialize the user from the session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}



// Authentication function called by Google Strategy
const auth = async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists in the database
        let userexist = await userModel.findOne({ email: profile.emails[0].value });
        if (userexist) return done(null, userexist);

        // Create a new user if they do not exist
        let user = new userModel({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "12345678", // Default password (consider improving this for security)
            isVerified: true,
            profileImg: profile.photos[0].value, // Assuming profile.photos is an array
            googleId: profile.id
        });

        // Save the new user to the database
        await user.save();

        // Return the new user
        done(null, user);
    } catch (error) {
        // Handle any errors that occur
        new AppError(error ,400)
        done(error, null);
    }
}
