export interface ErrorResponse {
    error: {
        statusCode: number;
        error: string;
        message: string;
    };
}
