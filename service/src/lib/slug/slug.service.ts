import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

@Injectable()
export class SlugService {

    generateSlug(input: string): string {
        return slugify(input, {
            lower: true,
            strict: true,
            trim: true
        })
    }
}
