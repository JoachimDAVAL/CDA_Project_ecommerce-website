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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.user.findMany({
            omit: { password: true },
            orderBy: { registrationDate: 'desc' },
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            omit: { password: true },
            include: {
                artist: true,
                orders: { orderBy: { orderDate: 'desc' } },
                reviews: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`L'utilisateur avec l'ID ${id} n'existe pas`);
        }
        return user;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async create(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new common_1.ConflictException('Un utilisateur avec cet email existe déjà');
        }
        const { password, ...rest } = dto;
        const user = await this.prisma.user.create({
            data: {
                ...rest,
                password,
            },
            omit: { password: true },
        });
        return user;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.user.update({
            where: { id },
            data: dto,
            omit: { password: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.user.delete({ where: { id } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map