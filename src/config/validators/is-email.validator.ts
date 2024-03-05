import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true })
@Injectable()
export class IsEmailUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(protected readonly usersService: UsersService) {}

  async validate(text: string) {
    return !(await this.usersService.userExists(text));
  }
}

export function IsEmailUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUserAlreadyExistConstraint,
    });
  };
}
