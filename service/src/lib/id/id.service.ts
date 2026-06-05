import { Injectable } from '@nestjs/common';
import { ulid } from "ulid"

@Injectable()
export class IdService {
    generate(): string {
        return ulid();
    }
}
