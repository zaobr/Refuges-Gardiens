import { HashingService } from '../../auth/hashing.service';
import { User } from './user.entity';

describe('User', () => {
  it('should be defined', () => {
    expect(new User(new HashingService)).toBeDefined();
  });
});
