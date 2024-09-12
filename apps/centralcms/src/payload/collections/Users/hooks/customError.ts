import { APIError } from "payload";

export class CustomError extends APIError {
  constructor(message: string) {
    super(message, 400, undefined, true);
  }
}
