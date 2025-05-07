export interface CreateAudioDto {
    scriptId: string;
    userId: string;
    sceneNumber: number;
    order: number;
    audioUrl: string;
}

export interface UpdateAudioDto {
    audioId: string;
    scriptId: string;
    userId: string;
    sceneNumber: number;
    order: number;
    audioUrl: string;
}

export interface DeleteAudioDto {
    audioId: string;
    userId: string;
}
