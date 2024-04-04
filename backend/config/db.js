import mongoose from "mongoose";
import "colors";

const maxRetryAttempts = 5;
const retryInterval = 1000; // 1 second

let retryAttempts = 0;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected!`.cyan.underline.bold);
  } catch (error) {
    console.error(
      `Error: ${error?.message || "Error connecting db!"}`.red.underline.bold
    );
    if (retryAttempts < maxRetryAttempts) {
      retryAttempts++;
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
      await connectDB();
    } else {
      console.error(
        `Max retry attempts reached! Exiting...`.red.underline.bold
      );
      process.exit(1);
    }
  }
};

mongoose.connection.on("disconnected", async () => {
  console.log(`MongoDB disconnected!`.red.underline.bold);
  await connectDB();
});

export default connectDB;
