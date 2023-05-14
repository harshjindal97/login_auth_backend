import mongoose from 'mongoose';

const connectDb = async (DataBaseURL) => {
    try {

        await mongoose.connect(DataBaseURL);
        console.log("connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;