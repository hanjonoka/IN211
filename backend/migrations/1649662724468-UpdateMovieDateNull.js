const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateMovieDateNull1649662724468 {
    name = 'UpdateMovieDateNull1649662724468'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "release_date" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "release_date" SET NOT NULL`);
    }
}
