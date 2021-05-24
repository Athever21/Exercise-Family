import { Document, model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "./User";

const familySchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      ref: "User",
    },
    funds: {
      type: Number,
      default: 0,
    },
    members: [
      {
        type: String,
        ref: "User",
      },
    ],
    fundsHistory: [
      {
        action_name: String,
        member: String,
        funds: Number,
      },
    ],
  },
  { timestamps: true }
);

interface FundsHistory {
  action_name: string;
  member: string;
  funds: string;
}

export interface IFamily extends Document {
  name: string;
  createdBy: string;
  funds: number;
  members: string[] | IUser[];
  fundsHistory: FundsHistory[];
}

familySchema.set("toJSON", {
  transform: (_: any, ret: IFamily) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default model<IFamily>("Family", familySchema);
