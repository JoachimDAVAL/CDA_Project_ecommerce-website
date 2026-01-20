import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Rend PrismaService accessible partout sans import explicite
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Permet aux autres modules de l'utiliser
})
export class PrismaModule {}