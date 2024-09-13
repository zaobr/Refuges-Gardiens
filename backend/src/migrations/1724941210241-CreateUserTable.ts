import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1724941210241 implements MigrationInterface {
    name = 'CreateUserTable1724941210241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`picture\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`category\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`deadline\` date NOT NULL, \`numberOfHours\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isDone\` tinyint(1) NOT NULL DEFAULT '0', \`organization_id\` int NULL, INDEX \`IDX_b554181bece934fc8fc90619cf\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isVerified\` tinyint(1) NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, INDEX \`IDX_b93269ca4d9016837d22ab6e1e\` (\`user_id\`), UNIQUE INDEX \`REL_b93269ca4d9016837d22ab6e1e\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`hashedPassword\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL DEFAULT '', \`picture\` varchar(255) NULL, \`banner\` varchar(255) NULL, \`phoneNumber\` varchar(10) NOT NULL DEFAULT '', \`description\` text NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, \`isOrganization\` tinyint NOT NULL DEFAULT 0, \`organizationName\` varchar(255) NULL, \`resetPasswordToken\` varchar(255) NULL, \`resetPasswordExpires\` timestamp NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD CONSTRAINT \`FK_b554181bece934fc8fc90619cf3\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD CONSTRAINT \`FK_b93269ca4d9016837d22ab6e1e0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`organization\` DROP FOREIGN KEY \`FK_b93269ca4d9016837d22ab6e1e0\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP FOREIGN KEY \`FK_b554181bece934fc8fc90619cf3\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_b93269ca4d9016837d22ab6e1e\` ON \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_b93269ca4d9016837d22ab6e1e\` ON \`organization\``);
        await queryRunner.query(`DROP TABLE \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_b554181bece934fc8fc90619cf\` ON \`mission\``);
        await queryRunner.query(`DROP TABLE \`mission\``);
    }

}
