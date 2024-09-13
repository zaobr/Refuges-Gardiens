import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {

  async hash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(plainText, salt);
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}