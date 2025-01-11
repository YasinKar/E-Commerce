export interface APIResponse<T> {
    status: "Success" | "Error";
    message : string
    statusCode : number
    response?: T;
}