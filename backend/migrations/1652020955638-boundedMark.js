const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class boundedMark1652020955638 {
    name = 'boundedMark1652020955638'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "CHK_c05a69ae629a1f185277e37227" CHECK ("mark" >= 0 AND "mark" <= 5)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "CHK_c05a69ae629a1f185277e37227"`);
    }
}
