import mongoose from 'mongoose';

export const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost/CanITalkToYou');
    console.log("DB conected")
  } catch (error) {
    console.log("DB conection failed", error);
    process.exit(1);
  }
}

