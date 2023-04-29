export interface apiError {
  message: string;
  status: number;
  success: boolean;
  stack: string;
}

export interface AppError {
  data: apiError;
}
