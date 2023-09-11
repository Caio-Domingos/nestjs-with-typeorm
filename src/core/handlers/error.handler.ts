// src/custom-exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandler extends HttpException {
  constructor(
    message: string,
    errorCode: number,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    data: any = { ok: false },
  ) {
    super(
      {
        message,
        errorCode,
        statusCode,
        data,
      },
      statusCode,
    );
  }
}
