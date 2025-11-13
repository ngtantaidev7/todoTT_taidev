import mongooese from 'mongoose';

export const connectDB = async () => {
  try {
    await mongooese.connect(process.env.MONGO_CONNECT_STRING);
    console.log('Ket noi database thanh cong');
  } catch (error) {
    console.error('Ket noi database that bai', error);
    process.exit(1);
  }
};
