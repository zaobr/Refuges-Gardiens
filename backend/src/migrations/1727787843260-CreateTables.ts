import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1727787843260 implements MigrationInterface {
    name = 'CreateTables1727787843260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`application\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_accepted\` tinyint(1) NOT NULL DEFAULT '0', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`mission_id\` int NULL, INDEX \`IDX_42f0935cc814e694ed0e61fdec\` (\`user_id\`), INDEX \`IDX_c259098a166b0e46e577060fd8\` (\`mission_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`picture\` varchar(255) NULL, \`description\` text NOT NULL, \`category\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`deadline\` date NOT NULL, \`number_of_hours\` int NOT NULL, \`volunteer_number\` int NOT NULL, \`is_done\` tinyint(1) NOT NULL DEFAULT '0', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`organization_id\` int NULL, INDEX \`IDX_b554181bece934fc8fc90619cf\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_verified\` tinyint(1) NOT NULL DEFAULT '0', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, INDEX \`IDX_b93269ca4d9016837d22ab6e1e\` (\`user_id\`), UNIQUE INDEX \`REL_b93269ca4d9016837d22ab6e1e\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`hashed_password\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL DEFAULT '', \`picture\` varchar(255) NULL, \`banner\` varchar(255) NULL, \`phone_number\` varchar(10) NOT NULL DEFAULT '', \`description\` text NULL, \`is_admin\` tinyint NOT NULL DEFAULT 0, \`is_organization\` tinyint NOT NULL DEFAULT 0, \`organization_name\` varchar(255) NULL, \`reset_password_token\` varchar(255) NULL, \`reset_password_expires\` timestamp NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`disponibility\` (\`id\` int NOT NULL AUTO_INCREMENT, \`available_at\` date NOT NULL, \`user_id\` int NOT NULL, \`created_at\` date NOT NULL, \`updated_at\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`FK_42f0935cc814e694ed0e61fdece\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`FK_c259098a166b0e46e577060fd86\` FOREIGN KEY (\`mission_id\`) REFERENCES \`mission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mission\` ADD CONSTRAINT \`FK_b554181bece934fc8fc90619cf3\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization\` ADD CONSTRAINT \`FK_b93269ca4d9016837d22ab6e1e0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`organization\` DROP FOREIGN KEY \`FK_b93269ca4d9016837d22ab6e1e0\``);
        await queryRunner.query(`ALTER TABLE \`mission\` DROP FOREIGN KEY \`FK_b554181bece934fc8fc90619cf3\``);
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_c259098a166b0e46e577060fd86\``);
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_42f0935cc814e694ed0e61fdece\``);
        await queryRunner.query(`DROP TABLE \`disponibility\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_b93269ca4d9016837d22ab6e1e\` ON \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_b93269ca4d9016837d22ab6e1e\` ON \`organization\``);
        await queryRunner.query(`DROP TABLE \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_b554181bece934fc8fc90619cf\` ON \`mission\``);
        await queryRunner.query(`DROP TABLE \`mission\``);
        await queryRunner.query(`DROP INDEX \`IDX_c259098a166b0e46e577060fd8\` ON \`application\``);
        await queryRunner.query(`DROP INDEX \`IDX_42f0935cc814e694ed0e61fdec\` ON \`application\``);
        await queryRunner.query(`DROP TABLE \`application\``);
    }

}
