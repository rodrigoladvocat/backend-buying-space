import { Module } from '@nestjs/common';
import { CartService } from './Cart.service';
import { PrismaModule } from 'src/database/prisma.module';
import { CartController } from './Cart.controller';

@Module({
  imports: [PrismaModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
