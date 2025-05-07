export interface CreateVideoDto {
    scriptId: string;
    videoNumber: number;
    userId: string;
    header: string;
    videoUrl: string;
    thumbnailUrl: string;
    isPublished: boolean;
}

export interface UpdateVideoDto {
    videoId: string;
    scriptId: string;
    userId: string;
    videoNumber: number;
    header: string;
    videoUrl: string;
    thumbnailUrl: string;
    isPublished: boolean;
}

export interface DeleteVideoDto {
    videoId: string;
    userId: string;
}
