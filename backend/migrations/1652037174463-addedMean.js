const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addedMean1652037174463 {
    name = 'addedMean1652037174463'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" ADD "mean_mark" integer`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "mean_mark"`);
    }
}
