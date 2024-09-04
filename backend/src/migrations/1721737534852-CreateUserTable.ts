import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1721737534852 implements MigrationInterface {
    name = 'CreateUserTable1721737534852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`picture\` varchar(255) NULL, \`banner\` varchar(255) NULL, \`phone_number\` varchar(10) NOT NULL, \`description\` text NOT NULL, \`is_admin\` tinyint NOT NULL DEFAULT 0, \`is_organization\` tinyint NOT NULL DEFAULT 0, \`organization_name\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
