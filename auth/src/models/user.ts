import mongoose from "mongoose";
import { Password } from '../services/password'
 
// Interface to create new user
interface userAttrs {
  email: string;
  password: string;
}

// Interface User model 
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: userAttrs): UserDoc;
}

// interface User Document
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
} 

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function(done){
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed)
    }
    done();
})

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
