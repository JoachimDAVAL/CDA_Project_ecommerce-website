import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  // @Post()
  // create(@Body() createModelDto: CreateModelDto) {
  //   return this.modelsService.create(createModelDto);
  // }

  @Get()
  findAll() {
    return this.modelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.modelsService.findOne(id);
  }

  @Get(':id/stats')
  findStats(@Param('id', ParseIntPipe) id: number) {
    return this.modelsService.getStats(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
  //   return this.modelsService.update(+id, updateModelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.modelsService.remove(+id);
  // }
}
