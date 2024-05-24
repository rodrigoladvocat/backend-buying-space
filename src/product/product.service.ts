import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Product, Prisma } from '@prisma/client';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Product[]> {
        return await this.prisma.product.findMany();
    }

    async findOne(id: number): Promise<Product | null> {
        return await this.prisma.product.findUnique({
            where: { id },
        });
    }

    async findByName(name: string): Promise<Product[]> {
        return await this.prisma.product.findMany(
            {
                where: {
                    name: {
                        contains: name,
                    },
                },
            }
        )
    }

    async create(data: ProductDto): Promise<Product> {

        const {price} = data

        if (price <= 0) throw new Error('Price must be greater than 0')

        return await this.prisma.product.create({
            data,
        });
    }

    async update(id: number, data: ProductDto): Promise<Product> {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });

        if (!product) throw new Error('Product not found');

        const {name, description, price} = data

        if (price <= 0) {
            data.price = product.price
        }

        if (name === '') {
            data.name = product.name
        }

        if (description === '') {
            data.description = product.description
        }

        return await this.prisma.product.update({
            where: { id },
            data,
        });
    
    }

    async remove(id: number): Promise<Product> {
        return await this.prisma.product.delete({
            where: { id },
        });
    }

}
