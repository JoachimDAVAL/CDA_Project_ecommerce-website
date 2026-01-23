import { ModelsService } from './models.service';
export declare class ModelsController {
    private readonly modelsService;
    constructor(modelsService: ModelsService);
    findAll(): Promise<{
        id: number;
        title: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ModelStatus;
        viewCount: number;
        artistId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        status: import(".prisma/client").$Enums.ModelStatus;
        viewCount: number;
        artistId: number;
    }>;
    findStats(id: number): Promise<{
        id: number;
        title: string;
        viewCount: number;
        reviewCount: number;
        averageRating: number;
    }>;
}
