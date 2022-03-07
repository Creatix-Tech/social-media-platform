import { PreconditionFailedException } from '@nestjs/common';

export class FailedToUpdateUserException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_update_user', error);
    }
}
