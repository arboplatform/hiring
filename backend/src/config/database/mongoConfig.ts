import mongoose from 'mongoose';

const mongoConnect = async () => {
  try {
    const url = process.env.URL_MONGODB;
    if (!url) {
      throw new Error('String URL_MONGODB is undefined in .env!');
    }

    await mongoose.connect(url);
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error!! ', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected!');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});

export default mongoConnect;
