import { UnauthorizedException } from '@nestjs/common';

export function throwUnauthorized(): never {
  throw new UnauthorizedException('Invalid credentials');
}
