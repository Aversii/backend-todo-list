import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/userController';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/user';
import { AuthService } from './service/authService/auth.service';
import { UserService } from './service/userService/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', 
      signOptions: { expiresIn: '24h' },  
    }),
  ],
  controllers: [UserController],
  providers: [UserService,AuthService],
  exports: [TypeOrmModule],
})
export class UserModule {}
