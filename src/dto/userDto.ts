import { User } from '../model/user'; 

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
  }
}

export class GetUserDto {
  id:string;  
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: User) {
    this.id = user.getId()
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;

  constructor(user: Partial<User>) {
    if (user.firstName) {
      this.firstName = user.firstName;
    }
    if (user.lastName) {
      this.lastName = user.lastName;
    }
    if (user.email) {
      this.email = user.email;
    }
  }
}

export class LoginDto {
  email: string;
  password: string;

  constructor(user: User) {
    this.email = user.email;
    this.password = user.password;
  }
}
