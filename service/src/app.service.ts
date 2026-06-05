import { Injectable } from '@nestjs/common';
import type { ResponseDataType } from './types/response.type';

@Injectable()
export class AppService {

  constructor(
  ) { }

  checkHealth(): ResponseDataType {
    return {
      message: 'Tung Tung',
      timeStamp: new Date().toISOString(),
    };
  }

  async test(): Promise<ResponseDataType> {
    return {
      message: 'url',
    }
  }
}
