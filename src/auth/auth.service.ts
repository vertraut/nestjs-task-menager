import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialDto);
  }
}
