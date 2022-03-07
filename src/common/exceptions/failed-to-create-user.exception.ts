import { PreconditionFailedException } from '@nestjs/common';

export class FailedToCreateUserException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_create_user', error);
    }
}
