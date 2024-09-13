import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDisponibility1724419562065 implements MigrationInterface {
    name = 'CreateDisponibility1724419562065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`hashedPassword\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`disponibility\` (\`id\` int NOT NULL AUTO_INCREMENT, \`available_at\` date NOT NULL, \`user_id\` int NOT NULL, \`created_at\` date NOT NULL, \`updated_at\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedPassword\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hashedPassword\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedPassword\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hashedPassword\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`disponibility\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`hashedPassword\` \`password\` varchar(255) NOT NULL`);
    }

}
