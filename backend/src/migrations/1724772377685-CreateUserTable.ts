import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1724772377685 implements MigrationInterface {
    name = 'CreateUserTable1724772377685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`picture\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`category\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`deadline\` date NOT NULL, \`numberOfHours\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDone\` tinyint(1) NOT NULL DEFAULT '0', \`organization_id\` int NULL, INDEX \`IDX_b554181bece934fc8fc90619cf\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isVerified\` tinyint(1) NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, INDEX \`IDX_b93269ca4d9016837d22ab6e1e\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_admin\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_organization\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`organization_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(10) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isOrganization\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`organizationName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD CONSTRAINT \`FK_b554181bece934fc8fc90619cf3\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD CONSTRAINT \`FK_b93269ca4d9016837d22ab6e1e0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`organization\` DROP FOREIGN KEY \`FK_b93269ca4d9016837d22ab6e1e0\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP FOREIGN KEY \`FK_b554181bece934fc8fc90619cf3\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`organizationName\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isOrganization\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone_number\` varchar(10) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`organization_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_organization\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_admin\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP INDEX \`IDX_b93269ca4d9016837d22ab6e1e\` ON \`organization\``);
        await queryRunner.query(`DROP TABLE \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_b554181bece934fc8fc90619cf\` ON \`mission\``);
        await queryRunner.query(`DROP TABLE \`mission\``);
    }

}
