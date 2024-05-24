import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, Prisma } from '@prisma/client';
import { ProductDto } from './dto/product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @ApiOperation({ summary: 'Lists all the products' })
  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Gets a product by its ID' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Searches for a product by its name' })
  @Get('search/:name')
  async findByName(@Param('name') name: string): Promise<Product[]> {
    return await this.productsService.findByName(name);
  }

  @ApiOperation({ summary: 'Creates a new product' })
  @Post('create')
  async create(@Body() data: ProductDto): Promise<Product> {
    return await this.productsService.create(data);
  }

  @ApiOperation({ summary: 'Updates an existing product', description: 'If the price is 0 or less, it will remain unchanged. The same is true for the name and description if an empty string is passed.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: ProductDto): Promise<Product> {
    return await this.productsService.update(+id, data);
  }

  @ApiOperation({ summary: 'Removes a product' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return await this.productsService.remove(+id);
  }
}
