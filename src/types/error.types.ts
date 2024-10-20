export interface CustomError extends Error {
  statusCode?: number;
  success?: boolean;
  isOperational?: boolean;
}
