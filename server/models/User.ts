import { Schema, model, Document, Model } from "mongoose";
import uniqueV from "mongoose-unique-validator";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: String,
    username: {
      type: String,
      required: true,
      unique: [true, "Username must be unique"],
    },
    password: String,
    role: {
      type: String,
      default: "user"
    },
    family: {
      type: String,
      ref: "Family"
    }
  },
  { timestamps: true }
);

export interface IUser extends Document {
  new (fields: UserFields): IUser;
  username: string;
  name: string;
  password?: string;
  role: string;
  family: string;
}

interface IUserModel extends Model<IUser> {
  createUser(fields: UserFields): Promise<IUser>;
  validatePassword(password: string, hash: string): Promise<Boolean>;
}

class User {
  static async validatePassword(
    password: string,
    hash: string
  ) {
    const bool = await argon2.verify(hash, password);
    return bool;
  }

  static async createUser(this: IUser, fields: UserFields) {
    const hash = await argon2.hash(fields.password);

    const user = new this({
      ...fields,
      password: hash,
    });

    return user.save();
  }
}

userSchema.plugin(uniqueV);
userSchema.loadClass(User);
userSchema.set("toJSON", {
  transform: (_: any, ret: IUser) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  },
});

export default model<IUser, IUserModel>("User", userSchema);
