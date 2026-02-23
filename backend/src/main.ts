import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://link-flow-app.vercel.app',
      'https://link-flow-c6xyaxfln-jemosurmans-projects.vercel.app',
      'http://localhost:5173', // ლოკალური ტესტირებისთვის
    ],
    credentials: true,
});
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));  
  await app.listen(3333);
}
bootstrap();
