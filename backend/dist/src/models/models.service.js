"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ModelsService = class ModelsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.model3D.findMany({
            where: {
                status: client_1.ModelStatus.ONLINE,
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Le modèle avec l'ID ${id} n'existe pas`);
        }
        this.incrementViews(id).catch((err) => {
            console.error('Erreur lors de l\'incrémentation des vues:', err);
        });
        return model;
    }
    async incrementViews(id) {
        await this.prisma.model3D.update({
            where: { id },
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        });
    }
    async getStats(id) {
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
            throw new common_1.NotFoundException(`Le modèle avec l'ID ${id} n'existe pas`);
        }
        const avgRating = model.reviews.length > 0
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
};
exports.ModelsService = ModelsService;
exports.ModelsService = ModelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModelsService);
//# sourceMappingURL=models.service.js.map