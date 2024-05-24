import { Injectable } from '@nestjs/common';
import { Cart} from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartService {

    constructor(private prisma: PrismaService) {}
    
    async findUserCart(id: number): Promise<Cart[]> {
        return await this.prisma.cart.findMany({
            where: {
                userId: +id
            }
        }
        );
    }

    async addToCart(uId: number, pId: number, quantity: number): Promise<Cart> {

        if (quantity <= 0) throw new Error('Quantity must be greater than 0')

        const user = await this.prisma.user.findUnique({
            where: {
                id: +uId
            }
        })

        if(!user) {
            throw new Error('User not found');
        }
    
        const product = await this.prisma.product.findUnique(
            {
                where: {
                    id: pId
                }
            }
        )

        if (!product) {
            throw new Error('Product not found');
        }

        const totalPrice = product.price * quantity;

        const cart = await this.prisma.cart.findUnique({
            where: {
                productId_userId: {
                    userId: +uId,
                    productId: +pId
                }
            }
        })

        if (cart) {
            return await this.prisma.cart.update({
                where: {
                    productId_userId: {
                        userId: +uId,
                        productId: +pId
                    }
                },
                data: {
                    quantity: cart.quantity + quantity,
                    totalPrice: cart.totalPrice + totalPrice
                }
            });
        
        }
        else {
            return await this.prisma.cart.create({
                data: {
                    userId: +uId,
                    productId: +pId,
                    quantity: quantity,
                    totalPrice: totalPrice
                }
            });
        }
    }

    async removeFromCart(uId: number, pId: number): Promise<Cart> {
        const cart = await this.prisma.cart.findUnique({
            where: {
                productId_userId: {
                    userId: uId,
                    productId: pId
                }
            }
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        return await this.prisma.cart.delete({
            where: {
                productId_userId: {
                    userId: uId,
                    productId: pId
                }
            }
        });
    }

    async getCartTotal(uId: number): Promise<number> {

        const user = await this.prisma.user.findUnique({
            where: {
                id: uId
            }
        })

        if (!user) {
            throw new Error('User not found');
        }

        const cartItems = await this.prisma.cart.findMany({
            where: {
                userId: uId
            }
        });

        return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    }

    async checkout(uId: number): Promise<string> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: uId
            }
        })

        if (!user) {
            throw new Error('User not found');
        }

        const cart = await this.prisma.cart.findMany({
            where: {
                userId: uId
            }
        })

        if (cart.length === 0) {
            throw new Error('Cart is empty');
        }

        cart.forEach(async (cartItem) => {
            const { name, price } = await this.prisma.product.findUnique({
                where: {
                    id: cartItem.productId
                }
            });

            await this.prisma.bought.create(
                {
                    data: {
                        userId: uId,
                        productName: name,
                        quantity: cartItem.quantity,
                        productPrice: price,
                    }
                }
            );

            await this.prisma.cart.delete({
                where: {
                    productId_userId: {
                        userId: cartItem.userId,
                        productId: cartItem.productId
                    }
                }
            });

        })

        return "compra finalizada"
    }
}
