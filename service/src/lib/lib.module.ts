import { Global, Module } from '@nestjs/common';
import { IdService } from './id/id.service';

@Global()
@Module({
  providers: [IdService],
  exports: [IdService]
})
export class LibModule { }
