import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Model3D, ModelStatus } from '@prisma/client';

@Injectable()
export class ModelsService {
  // Injection de dépendance : NestJS fournit automatiquement PrismaService
  constructor(private prisma: PrismaService) {}

  /**
   * Récupère tous les produits en ligne
   * @returns Liste des produits avec leurs relations (artiste, fichiers, avis)
   */
  async findAll(): Promise<Model3D[]> {
    return this.prisma.model3D.findMany({
      where: {
        status: ModelStatus.ONLINE, // Seulement les produits validés
      },
      include: {
        artist: true,      // Inclut les infos de l'artiste
        files: true,     // Inclut les fichiers (images + 3D)
        reviews: {             // Inclut les avis
          take: 5,          // Limite à 5 avis par produit
          orderBy: {
            createdAt: 'desc', // Les plus récents d'abord
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Produits récents en premier
      },
    });
  }

  /**
   * Récupère un produit par son ID
   * @param id - L'identifiant du produit
   */
  async findOne(id: number): Promise<Model3D | null> {
    return this.prisma.model3D.findUnique({
      where: { id },
      include: {
        artist: true,
        files: true,
        reviews: {
          include: {
            user: true, // Pour afficher le nom de l'auteur de l'avis
          },
        },
      },
    });
  }
}