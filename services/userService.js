import { User } from "../models/users.js";


export const updateSocketId = async (name, newId) => {
  const user = await User.findOne({ name });
  user.socketId = newId;
  user.isActive = true;
  await user.save();
}

export const findUserByName = async (name) => {
  const user = await User.findOne({ name });
  return user;
};

export const findUserBySocketId = async (socketId) => {
  const user = await User.findOne({ socketId });
  return user;
}

export const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};


export const toogleStatusAndUpdateLastSeen = async (socketId) => {
  const user = await User.findOne({ socketId });

  if (!user) {
    return null;
  }

  user.isActive = false;
  user.lastSeen = new Date();
  await user.save();
}