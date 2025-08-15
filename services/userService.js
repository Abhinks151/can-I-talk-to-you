import { User } from "../models/users.js";


export const updateSocketId = async (name, newId) => {
  const user = await User.findOne({ name });
  user.socketId = newId;
  await user.save();
}

export const findUserByName = async (name) => {
  const user = await User.findOne({ name });
  return user;
};

export const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};