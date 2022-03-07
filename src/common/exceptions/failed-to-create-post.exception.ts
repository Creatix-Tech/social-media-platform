import { PreconditionFailedException } from '@nestjs/common';

export class FailedToCreatePostException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_create_post', error);
    }
}
