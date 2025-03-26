import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { throwUnauthorized } from '../utils/errorHandler';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialDto);
  }

  async sighIn(authCredentialDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialDto;

    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throwUnauthorized();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      return 'success';
    }
    throwUnauthorized();
  }
}
