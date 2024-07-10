import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponse } from './dto/userResponse';
import * as bcrypt from 'bcrypt';
import { UserRequest } from './dto/userRequest';
import { LoginRequest } from './dto/loginRequest';
import { User } from './entity/user/user.entity';
import { UserDetail } from './entity/userDetail/userDetail.entity';
import { UserRepository } from './entity/user/userRepository';
import { UserDetailRepository } from './entity/userDetail/userDetailRepository';
import UserTestRepository from './entity/user/userTestRepository';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(User)
    private readonly userTestRepository: UserTestRepository,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: UserDetailRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(userData: UserRequest): Promise<UserResponse> {
    const { email, password, firstName, lastName, phoneNo } = userData;

    // Check if user with the same email already exists
    const existingUser = await this.userRepository.findOne({ where: { email , deletedAt: null } });
    if (existingUser) {
      throw new BadRequestException('Email address is already taken');
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the User entity
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    // Save the UserDetail entity
    const newUserDetail = this.userDetailRepository.create({
      user: newUser, // Assign the newly created user entity
      firstName,
      lastName,
      phoneNo,
    });
    await this.userDetailRepository.save(newUserDetail);

    // Return a simplified response
    return {
      id: newUser.id,
      email: newUser.email,
      firstName: newUserDetail.firstName,
      lastName: newUserDetail.lastName,
      phoneNo: newUserDetail.phoneNo,
    };
  }

  async login(loginRequest: LoginRequest): Promise<{ accessToken: string,refreshToken: string }> {
    const { email, password } = loginRequest;

    // Find user by email
    const existingUser = await this.userRepository.findOne({ where: { email , deletedAt: null } });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    // Generate JWT
    const payload = { email: existingUser.email, id: existingUser.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { accessToken, refreshToken };
  }

  async getUserById(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id , deletedAt: null} }); 

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userDetails = await this.userDetailRepository.findOne({ where: { user: { id , deletedAt: null } } });
    // const userDetails = await this.userDetailRepository.findByUserId(id);
    if (!userDetails) {
      throw new NotFoundException('User details not found');
    }

    return new UserResponse(
      user.id,
      user.email,
      userDetails.firstName,
      userDetails.lastName,
      userDetails.phoneNo,
    );
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const usersWithDetails = await this.userDetailRepository.find({
      relations: ['user'],
      where: {
        deletedAt: null,
      },
    });
    
    if (!usersWithDetails || usersWithDetails.length === 0) {
      throw new NotFoundException('Users not found');
    }

    console.log(usersWithDetails);

    return usersWithDetails.map(userDetail => ({
      id: userDetail.user.id,
      email: userDetail.user.email,
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      phoneNo: userDetail.phoneNo,
    }));
  }

  async verifyToken(token: string) {
    try {
      return jwt.verify(token, 'SysTemDonUncle32');
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
