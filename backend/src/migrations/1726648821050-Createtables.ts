import { MigrationInterface, QueryRunner } from "typeorm";

export class Createtables1726648821050 implements MigrationInterface {
    name = 'Createtables1726648821050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`disponibility\` (\`id\` int NOT NULL AUTO_INCREMENT, \`available_at\` date NOT NULL, \`user_id\` int NOT NULL, \`created_at\` date NOT NULL, \`updated_at\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`numberOfHours\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`isDone\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`volunteerNumber\``);
        await queryRunner.query(`ALTER TABLE \`organization\` DROP COLUMN \`isVerified\``);
        await queryRunner.query(`ALTER TABLE \`organization\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`organization\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedPassword\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isOrganization\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`organizationName\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetPasswordToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetPasswordExpires\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`number_of_hours\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`volunteer_number\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`is_done\` tinyint(1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD \`is_verified\` tinyint(1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hashed_password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone_number\` varchar(10) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_admin\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_organization\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`organization_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reset_password_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reset_password_expires\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reset_password_expires\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reset_password_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`organization_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_organization\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_admin\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashed_password\``);
        await queryRunner.query(`ALTER TABLE \`organization\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`organization\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`organization\` DROP COLUMN \`is_verified\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`is_done\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`volunteer_number\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP COLUMN \`number_of_hours\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetPasswordExpires\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetPasswordToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`organizationName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isOrganization\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(10) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hashedPassword\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD \`isVerified\` tinyint(1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`volunteerNumber\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`isDone\` tinyint(1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD \`numberOfHours\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`disponibility\``);
    }

}
