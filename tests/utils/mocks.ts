// SignUpDTO interface for the request model
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

interface SignUpDTO {
  address: string;
  userName: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

// User model for E2E tests
export interface MockUser {
  id: string;
  userName: string;
  address: string;
  email: string;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    location: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Mock controller for E2E tests
@Controller()
export class MockUserController {
  @Post()
  async handleRequest(@Body() body: { pattern: string; data: any }): Promise<any> {
    try {
      if (body.pattern === 'SignUp') {
        if (body.data.address === '0xduplicate') {
          throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
        }
        
        return {
          id: 'new-id',
          userName: body.data.userName,
          address: body.data.address,
          email: body.data.email,
          profile: {
            id: 'new-profile-id',
            firstName: body.data.firstName,
            lastName: body.data.lastName,
            location: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      } else if (body.pattern === 'GetUser') {
        return {
          id: body.data.id || 'test-id',
          userName: 'test-user',
          address: body.data.address || '0xtest',
          email: 'test@example.com',
          profile: {
            id: 'profile-id',
            firstName: 'Test',
            lastName: 'User',
            location: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

// Test user with full profile
export const mockUser = {
  id: 'test-uuid',
  userName: 'testuser',
  address: '0x1234567890abcdef',
  email: 'test@example.com',
  profile: {
    id: 'profile-uuid',
    firstName: 'Test',
    lastName: 'User',
    location: 'Test Location',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
};

// Data for creating a new user
export const mockCreateUser = {
  address: '0x1234567890abcdef',
  userName: 'testuser',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
};

// Signup request data
export const mockSignupRequest: SignUpDTO = {
  address: '0x1234567890abcdef',
  userName: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
};