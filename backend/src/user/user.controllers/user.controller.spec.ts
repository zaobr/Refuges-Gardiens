import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../user.services/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../../../test/mock-repository';
import { User } from '../user.entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,  {
        provide: getRepositoryToken(User),
        useValue: mockRepository(),
      },]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
