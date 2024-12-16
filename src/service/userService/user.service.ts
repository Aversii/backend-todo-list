/* The UserService class in TypeScript handles user-related operations such as creating, finding,
updating, and deleting users, as well as validating user credentials and generating JWT tokens. */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../model/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserAlreadyExistsError, UserNotFoundError, NoUsersFoundError, TokenGenerationError, InvalidCredentialsError } from '../../error/customError';
import { UserValidator } from '../userValidator/userValidator';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '../../dto/userDto';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new UserAlreadyExistsError(createUserDto.email);
    }
    UserValidator.validateSignup(createUserDto);

    const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltRounds);
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundError(id); 
    }
    return user;
  }

  async findAll(): Promise<GetUserDto[]> {
    const users = await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt']
    });
    if (users.length === 0) {
      throw new NoUsersFoundError(); 
    }
    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new UserNotFoundError(id); 
    }

    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new TokenGenerationError(); 
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }
    await this.userRepository.delete(id);
  }

  async validateUserCredentials(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }
    return user;
  }

  async generateJwtToken(user: User): Promise<string> {
    if (!user || !user.id) {
      throw new TokenGenerationError();
    }
    const payload = { name: user.firstName, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
