// import mongoose from 'mongoose';
import { User } from '@users/types/User';
import { Schema, model, connect } from 'mongoose';

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
});

export default model<User>('User', userSchema);
