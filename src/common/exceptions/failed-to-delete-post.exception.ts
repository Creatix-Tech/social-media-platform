import { PreconditionFailedException } from '@nestjs/common';

export class FailedToDeletePostException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_delete_post', error);
    }
}
