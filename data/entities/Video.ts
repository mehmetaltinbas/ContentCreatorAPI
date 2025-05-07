import mongoose from 'mongoose';

interface VideoDocument extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    contentId: mongoose.Schema.Types.ObjectId;
    imageId: mongoose.Schema.Types.ObjectId;
    audioId: mongoose.Schema.Types.ObjectId;
    videoNumber: number;
    header: string;
    videoUrl: string;
    thumbnailUrl: string;
    isPublished: boolean;
}

const VideoSchema: mongoose.Schema<VideoDocument> = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
    audioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audio', required: true },
    header: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
});

const Video = mongoose.model('Video', VideoSchema);

export default Video;
