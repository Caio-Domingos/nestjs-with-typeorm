import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

import * as bcrypt from 'bcryptjs';
import { ErrorHandler } from 'src/core/handlers/error.handler';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends CoreService<User> {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super(authRepository);
  }

  async signUp(user: CreateAuthDto) {
    // Criptografar senha com o bcryptjs
    const hashPassword = bcrypt.hashSync(user.password, 8);
    // Criar usuario com o que veio
    const newUser = this.authRepository.create({
      ...user,
      password: hashPassword,
    });

    const userSaved = await this.authRepository.save(newUser);

    return userSaved;
  }

  async signIn(user: { username: string; password: string }) {
    try {
      // Verificar se o usuario existe
      const userExists = await this.authRepository.findOne({
        where: { username: user.username },
      });

      // Se o usuario nao existir, retornar erro
      if (!userExists) {
        throw {
          message: 'Usuário não encontrado',
          errorCode: 400,
          statusCode: HttpStatus.BAD_REQUEST,
          data: { ok: false },
        };
      }

      // Se o usuario existir, verificar se a senha esta correta
      const passwordMatch = bcrypt.compareSync(
        user.password,
        userExists.password,
      );

      // Se a senha nao estiver correta, retornar erro
      if (!passwordMatch) {
        throw {
          message: 'Senha incorreta',
          errorCode: 400,
          statusCode: HttpStatus.BAD_REQUEST,
          data: { ok: false },
        };
      }

      // Se a senha estiver correta, gerar token e retornar junto com usuario
      const token = await this.jwtService.signAsync({
        id: userExists.id,
        username: userExists.username,
      });
      return { user: userExists, token };
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.errorCode,
        error.statusCode,
        error.data,
      );
    }
  }

  signOut() {
    return 'Sign Out';
  }
}
