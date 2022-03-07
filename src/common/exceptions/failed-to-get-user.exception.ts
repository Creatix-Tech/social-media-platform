import { PreconditionFailedException } from '@nestjs/common';

export class FailedToGetUserException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_get_user', error);
    }
}
