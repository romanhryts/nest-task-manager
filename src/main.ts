import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const bootstrap = async (): Promise<void> => {
    const PORT = process.env.PORT || 3000;
    try {
        const app = await NestFactory.create(AppModule);
        app.setGlobalPrefix('api');
        app.use(cookieParser());
        app.enableCors({
            origin: 'http://localhost:4200',
            credentials: true
        });
        await app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    } catch (e) {
        console.log(`Error while bootstrap AppModule: ${e.message}`);
    }
}

bootstrap();
