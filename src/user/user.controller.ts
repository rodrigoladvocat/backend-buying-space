import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: 'Lists all users' })
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @ApiOperation({ summary: 'Adds a user' })
    @Post()
    async addUser(@Body() data: UserDto) {
        return await this.userService.addUser(data);
    }
}