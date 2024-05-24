import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CartService } from "./Cart.service";
import { Cart, Prisma, Product } from "@prisma/client";
import { ApiExtension, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CartProductDto } from "./dto/CartProduct.dto";


@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @ApiOperation({ summary: 'Gets all products in a user\'s cart' })
    @Get(':userId')
    async findUserCart(@Param('userId') userId: string): Promise<Cart[]> {
        return await this.cartService.findUserCart(+userId);
    }

    @ApiOperation({ summary: 'Returns the total price of a user\'s cart content' })
    @Get('total/:userId')
    async findTotalPrice(@Param('userId') userId: string): Promise<number> {
        return await this.cartService.getCartTotal(+userId);
    }

    @ApiOperation({ summary: 'Adds a product to a user\'s cart' })
    @Post(':userId')
    async addToCart(@Param('userId') userId: string, @Body() data: CartProductDto): Promise<Cart> {
        return await this.cartService.addToCart(+userId, data.productId, data.quantity);
    }

    @ApiOperation({ summary: 'Checks out' })
    @Delete('checkout/:userId')
    async checkout(@Param('userId') userId: string): Promise<string> {
        return await this.cartService.checkout(+userId);
    }

    @ApiOperation({ summary: 'Removes a product from a user\'s cart' })
    @Delete(':userId/:productId')
    async removeFromCart(@Param('userId') userId: string, @Param('productId') productId: number): Promise<Cart> {
        return await this.cartService.removeFromCart(+userId, +productId);
    }

}
