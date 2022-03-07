import { BadRequestException } from '@nestjs/common';

export class FileNotProvidedException extends BadRequestException {
  constructor(error?: string) {
    super('error.file_not_provided', error);
  }
}
