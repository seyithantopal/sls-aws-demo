import mongoose from 'mongoose';

let mongoConnection: Promise<typeof mongoose> | null = null;

export const connectMongoose = async () => {
  if (mongoConnection == null) {
    mongoConnection = mongoose
      .connect(process.env.DB as string, { serverSelectionTimeoutMS: 3000 })
      .then((mongooseReply) => {
        console.log({ mongooseReply });
        return mongoose;
      })
      .catch((mongooseError) => {
        console.log({ mongooseError });
        return mongoose;
      });
    await mongoConnection;
  }
  return mongoConnection;
};
