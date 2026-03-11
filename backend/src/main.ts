import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour le frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // URL de votre frontend Vite
    credentials: true,
  });

  // Activer la validation automatique
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Backend NestJS démarré');
  console.log(`📡 API disponible sur http://localhost:${port}`);
  console.log(`📊 Routes disponibles :`);
  console.log(`   - GET  http://localhost:${port}/models`);
  console.log(`   - GET  http://localhost:${port}/models/:id`);
  console.log(`   - GET  http://localhost:${port}/models/:id/stats`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

bootstrap();
