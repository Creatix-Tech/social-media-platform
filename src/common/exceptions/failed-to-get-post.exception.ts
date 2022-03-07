import { PreconditionFailedException } from '@nestjs/common';

export class FailedToGetPostException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_get_post', error);
    }
}
