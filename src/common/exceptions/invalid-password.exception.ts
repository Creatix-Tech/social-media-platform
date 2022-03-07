import { BadRequestException } from '@nestjs/common';

export class InvalidPasswordException extends BadRequestException {
  constructor(error?: string) {
    super('error.invalid-password', error);
  }
}
