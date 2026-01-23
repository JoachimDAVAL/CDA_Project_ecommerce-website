import { PrismaService } from '../prisma/prisma.service';
import { Model3D } from '@prisma/client';
export declare class ModelsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Model3D[]>;
    findOne(id: number): Promise<Model3D>;
    private incrementViews;
    getStats(id: number): Promise<{
        id: number;
        title: string;
        viewCount: number;
        reviewCount: number;
        averageRating: number;
    }>;
}
