import mongoose from 'mongoose';

const connectDB = async () => {
    // Event listener for successful connection
    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    });

    // Event listener for connection errors
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process if connection fails
    });

    // Try connecting to the database
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;
