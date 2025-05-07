export interface CreateImageDto {
    scriptId: string;
    userId: string;
    sceneNumber: number;
    order: number;
    imageUrl: string;
}

export interface UpdateImageDto {
    imageId: string;
    scriptId: string;
    userId: string;
    sceneNumber: number;
    order: number;
    imageUrl: string;
}

export interface DeleteImageDto {
    imageId: string;
    userId: string;
}
