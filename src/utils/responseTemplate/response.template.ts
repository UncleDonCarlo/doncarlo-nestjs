import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseTemplate {
  constructor() {}

  async createResponseTemplate(callback: () => Promise<any>): Promise<any> {
    try {
      const data = await callback(); 
      return {
        status: 'success',
        message: 'Data retrieved successfully',
        data: data,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}
