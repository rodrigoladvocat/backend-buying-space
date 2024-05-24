import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async addUser(data: UserDto) {
        return await this.prisma.user.create({
            data,
        });
    }
}
