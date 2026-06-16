import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

@Injectable()
export class SlugService {

    baseSlug(input: string): string {
        return slugify(input, {
            lower: true,
            strict: true,
            trim: true
        })
    }

    suffix(length = 4): string {
        return nanoid(length)
    }

    suffixSlug(base: string, suffix: string): string {
        return `${base}-${suffix}`;
    }

    generateUniqueSlug(base: string): string {
        return this.suffixSlug(base, this.suffix())
    }
}
