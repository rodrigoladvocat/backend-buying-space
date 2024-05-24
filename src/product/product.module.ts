import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/database/prisma.module';
import { ProductController } from './product.controller';
import { ProductDto } from './dto/product.dto';

@Module({
  imports: [PrismaModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
