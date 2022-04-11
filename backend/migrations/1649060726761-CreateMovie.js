const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateMovie1649060726761 {
    name = 'CreateMovie1649060726761'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "movie"`);
    }
}
