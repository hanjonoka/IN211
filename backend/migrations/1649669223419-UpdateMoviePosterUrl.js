const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateMoviePosterUrl1649669223419 {
    name = 'UpdateMoviePosterUrl1649669223419'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" ADD "poster_url" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "poster_url"`);
    }
}
