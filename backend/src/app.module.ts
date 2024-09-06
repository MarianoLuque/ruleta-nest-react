import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NumeroRandomModule } from './numero-random/numero-random.module';
import { TimestampMiddleware } from './numero-random/timestamp/timestamp.middleware';
import { NumeroRandomController } from './numero-random/numero-random.controller';

@Module({
	imports: [NumeroRandomModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TimestampMiddleware).forRoutes(NumeroRandomController);
	}
}
