import { PreconditionFailedException } from '@nestjs/common';

export class FailedToUpdatePostException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_update_post', error);
    }
}
