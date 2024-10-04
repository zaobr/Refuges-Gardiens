import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entities/user.entity";
import { MissionService } from "../mission/mission.services/mission.service";
import { UserService } from "src/user/user.services/user.service";
import { Application } from "./application.entities/application.entity";
import { ApplicationService } from "./application.services/application.service";
import { ApplicationController } from "./application.controllers/application.controller";
import { Mission } from "src/mission/mission.entities/mission.entity";
import { Organization } from "src/organization/organization.entities/organization.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Application]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Mission]),
        TypeOrmModule.forFeature([Organization])
    ],
    providers: [ApplicationService, MissionService, UserService],
    controllers: [ApplicationController]
})

export class ApplicationModule { }