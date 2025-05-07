export interface CreateScriptDto {
    promptId: string;
    userId: string;
    scriptNumber: number;
    scriptHeader: string;
    scriptText: string;
}

export interface UpdateScriptDto {
    scriptId: string;
    promptId: string;
    userId: string;
    scriptNumber: number;
    scriptHeader: string;
    scriptText: string;
}

export interface DeleteScriptDto {
    scriptId: string;
    userId: string;
}
