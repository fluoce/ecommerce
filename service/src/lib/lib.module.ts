import { Global, Module } from '@nestjs/common';
import { IdService } from './id/id.service';
import { SlugService } from './slug/slug.service';

@Global()
@Module({
  providers: [IdService, SlugService],
  exports: [IdService, SlugService]
})
export class LibModule { }
