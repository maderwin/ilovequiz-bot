export interface QuizData extends Record<string, unknown> {
    id: number;
    title: string;
    description: string;
    date: number;
    isRegistrationAvailable: boolean;
    season: string;
    isRegistered?: boolean;
    updatedAt: number;
}
