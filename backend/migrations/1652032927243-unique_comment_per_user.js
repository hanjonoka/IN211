const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class uniqueCommentPerUser1652032927243 {
    name = 'uniqueCommentPerUser1652032927243'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "UQ_bbfe153fa60aa06483ed35ff4a7"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "UQ_bbfe153fa60aa06483ed35ff4a7" UNIQUE ("user_id")`);
    }
}
