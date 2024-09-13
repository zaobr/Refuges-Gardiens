import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ResetTokenService {

    async resetTokenGenerator(): Promise<string> {
        const randomPart = uuidv4();
        const timestamp = Date.now().toString(36)
        return `${randomPart}${timestamp}`;
    }
}