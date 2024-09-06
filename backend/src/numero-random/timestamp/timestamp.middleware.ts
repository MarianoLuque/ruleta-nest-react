import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimestampMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction): void {
		const timestamp = new Date().toISOString();
		console.log(`Request Timestamp: ${timestamp}`);
		next();
	}
}
