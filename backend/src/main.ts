import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
  origin: (origin, callback) => {
    if (
      !origin || 
      origin.match(/^https:\/\/link-flow.*\.vercel\.app$/) || 
      origin.includes('localhost')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));  
  await app.listen(3333);
}
bootstrap();
