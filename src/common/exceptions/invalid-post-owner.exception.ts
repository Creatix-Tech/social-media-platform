import { BadRequestException } from '@nestjs/common';

export class InvalidPostOwnerException extends BadRequestException {
  constructor(error?: string) {
    super('error.invalid-post-owner', error);
  }
}
