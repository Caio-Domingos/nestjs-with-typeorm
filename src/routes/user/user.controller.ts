import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController extends CoreController<
  User,
  UserService,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
