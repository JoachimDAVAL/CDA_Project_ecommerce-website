import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [PrismaModule, ModelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
