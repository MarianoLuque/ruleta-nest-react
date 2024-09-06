import { Module } from '@nestjs/common';
import { NumeroRandomService } from './numero-random.service';
import { NumeroRandomController } from './numero-random.controller';

@Module({
	controllers: [NumeroRandomController],
	providers: [NumeroRandomService],
})
export class NumeroRandomModule {}
