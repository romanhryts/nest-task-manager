import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
  const PORT = process.env.PORT || 3000;
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    await app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
  } catch (e) {
    console.log(`Error while bootstrap AppModule: ${e.message}`);
  }
}

bootstrap();
