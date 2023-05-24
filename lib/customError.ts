import { HttpException } from '@nestjs/common';

export function CustomError(messages: string[], statusCode: number) {
  return {
    error: true,
    messages,
    status: statusCode,
  };
}
