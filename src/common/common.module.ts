import { Global, Module } from '@nestjs/common';
import { ServiceConfig } from './services/config.service';

@Global()
@Module({
    providers: [ServiceConfig],
    exports: [ServiceConfig]
})
export class CommonModule {}
