import { Controller, Post } from '@nestjs/common';
import { NumeroRandomService } from './numero-random.service';

@Controller('numero-random')
export class NumeroRandomController {
	constructor(private readonly numeroRandomService: NumeroRandomService) {}

	@Post()
	getNumeroRandom(): { value: number } {
		return this.numeroRandomService.getNumeroRandom();
	}
}
