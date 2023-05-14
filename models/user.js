import { Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// sets up username and password fields on the model for us.
userSchema.plugin(passportLocalMongoose);

export const User = model('User', userSchema);
