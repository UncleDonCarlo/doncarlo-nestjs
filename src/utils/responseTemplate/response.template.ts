import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseTemplate {
  constructor() {}

  async createResponseTemplate(callback: () => Promise<any>): Promise<any> {
    try {
      const data = await callback(); 
      return {
        status: 200,
        message: 'Successfully',
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
