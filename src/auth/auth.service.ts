import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { throwUnauthorized } from '../utils/errorHandler';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialDto);
  }

  async sighIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;

    const user = await this.usersRepository.getUserByUsername(username);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.signAsync(payload);
      return { accessToken };
    } else {
      throwUnauthorized();
    }
  }
}
