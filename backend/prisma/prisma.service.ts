import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Connexion à la DB au démarrage du module
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma connecté à PostgreSQL');
  }

  // Déconnexion propre à l'arrêt de l'app
  async onModuleDestroy() {
    await this.$disconnect();
  }
}