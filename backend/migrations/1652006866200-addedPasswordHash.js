const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addedPasswordHash1652006866200 {
    name = 'addedPasswordHash1652006866200'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "pwd_hash" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "pwd_hash"`);
    }
}
