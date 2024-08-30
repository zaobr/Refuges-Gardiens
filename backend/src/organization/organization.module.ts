import { TypeOrmModule } from "@nestjs/typeorm";
import { Organization } from "./organization.entities/organization.entity";
import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controllers/organization.controller";
import { OrganizationService } from "./organization.services/organization.service";
import { UserService } from "src/user/user.services/user.service";
import { User } from "src/user/user.entities/user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Organization]), TypeOrmModule.forFeature([User])],
    providers: [OrganizationService, UserService],
    controllers: [OrganizationController]
  })

export class OrganizationModule {}