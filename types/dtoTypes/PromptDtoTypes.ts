export interface CreatePromptDto {
    userId: string;
    niche: string;
    imageTheme: string;
    minVideoDuration: string;
    maxVideoDuration: string;
}

export interface UpdatePromptDto {
    promptId: string;
    userId: string;
    niche: string;
    imageTheme: string;
    minVideoDuration: string;
    maxVideoDuration: string;
}

export interface DeletePromptDto {
    promptId: string;
    userId: string;
}
