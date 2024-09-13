import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mission } from "./mission.entities/mission.entity";
import { Organization } from "src/organization/organization.entities/organization.entity";
import { User } from "src/user/user.entities/user.entity";
import { MissionService } from "./mission.services/mission.service";
import { UserService } from "src/user/user.services/user.service";
import { MissionController } from "./mission.controllers/mission.controller";
import { OrganizationService } from "src/organization/organization.services/organization.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Mission]),
        TypeOrmModule.forFeature([Organization]),
        TypeOrmModule.forFeature([User])
    ],
    providers: [MissionService, UserService, OrganizationService],
    controllers: [MissionController]
})

export class MissionModule { }