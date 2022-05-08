const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class defaultMark1652047814122 {
    name = 'defaultMark1652047814122'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" ADD "text" text`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "text"`);
    }
}
