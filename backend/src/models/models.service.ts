import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Model3D, ModelStatus } from '@prisma/client';

@Injectable()
export class ModelsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Récupère tous les modèles 3D en ligne
   */
  async findAll(): Promise<Model3D[]> {
    return this.prisma.model3D.findMany({
      where: {
        status: ModelStatus.ONLINE,
      },
      include: {
        artist: {
          include: {
            user: {
              select: {
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        files: true,
        reviews: {
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Récupère un modèle par son ID
   */
  async findOne(id: number): Promise<Model3D> {
    const model = await this.prisma.model3D.findUnique({
      where: { id },
      include: {
        artist: {
          include: {
            user: {
              select: {
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        files: true,
        reviews: {
          include: {
            author: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!model) {
      throw new NotFoundException(`Le modèle avec l'ID ${id} n'existe pas`);
    }

    // Incrémenter les vues (sans bloquer la réponse)
    this.incrementViews(id).catch((err) => {
      console.error('Erreur lors de l\'incrémentation des vues:', err);
    });

    return model;
  }

  /**
   * Incrémente le compteur de vues
   */
  private async incrementViews(id: number): Promise<void> {
    await this.prisma.model3D.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Récupère les statistiques d'un modèle
   */
  async getStats(id: number) {
    const model = await this.prisma.model3D.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        viewCount: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    if (!model) {
      throw new NotFoundException(`Le modèle avec l'ID ${id} n'existe pas`);
    }

    // Calculer la note moyenne
    const avgRating =
      model.reviews.length > 0
        ? model.reviews.reduce((sum, r) => sum + r.rating, 0) / model.reviews.length
        : 0;

    return {
      id: model.id,
      title: model.title,
      viewCount: model.viewCount,
      reviewCount: model.reviews.length,
      averageRating: Math.round(avgRating * 10) / 10,
    };
  }
}