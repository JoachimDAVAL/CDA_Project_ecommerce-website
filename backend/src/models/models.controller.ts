import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Model3D } from '@prisma/client';

@Controller('products') // Préfixe de route : /products
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  /**
   * GET /products
   * Récupère tous les produits en ligne
   */
  @Get()
  async findAll(): Promise<Model3D[]> {
    return this.modelsService.findAll();
  }

  /**
   * GET /products/:id
   * Récupère un produit spécifique
   * @param id - ID du produit (sera automatiquement converti en number)
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Model3D> {
    return this.modelsService.findOne(id);
  }
}