import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import User from './entities/User';
import Prompt from './entities/Prompt';
import Content from './entities/Content';
import Script from './entities/Script';
import Image from './entities/Image';
import Audio from './entities/Audio';
import Video from './entities/Video';

dotenv.config();

const connectDb = async () => {
    try {
        const dbConnection = process.env.DB_CONNECTION;
        if (!dbConnection) throw new Error('DB_CONNECTION is not defined in .env file');
        const connection = await mongoose.connect(dbConnection, {
            dbName: process.env.DB_NAME,
        });
        console.log(
            'MongoDB connected successfully to database: ',
            connection.connection.name,
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error('MongoDB connection failed:', error.message);
        } else {
            console.error('MongoDB connection failed:', error);
        }
        process.exit(1);
    }
};

const entities = {
    User,
    Prompt,
    Content,
    Script,
    Image,
    Audio,
    Video,
};

export { connectDb, entities };
