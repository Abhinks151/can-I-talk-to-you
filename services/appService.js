import { User } from "../models/users.js"


export const allContacts = async () => {
  const users = await User.find();
  if (!users) {
    return null;
  }
  return users;
}