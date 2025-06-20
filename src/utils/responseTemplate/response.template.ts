import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ResponseTemplate {
  constructor() {}

  async createResponseTemplate(callback: () => Promise<any>): Promise<any> {
    try {
      const data = await callback();
      return {
        status: HttpStatus.OK,
        message: 'Successfully',
        data,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal Server Error',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
