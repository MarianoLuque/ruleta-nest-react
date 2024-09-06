import { Injectable } from '@nestjs/common';

@Injectable()
export class NumeroRandomService {
	getNumeroRandom(): { value: number } {
		return { value: Math.floor(Math.random() * 100) + 1 };
	}
}
