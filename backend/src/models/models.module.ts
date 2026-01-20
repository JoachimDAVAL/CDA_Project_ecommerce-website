import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';

@Module({
  controllers: [ModelsController], // Enregistre le controller
  providers: [ModelsService],      // Enregistre le service
  exports: [ModelsService],        // Permet à d'autres modules d'utiliser ce service
})
export class ModelsModule {}