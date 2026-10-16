/*
  Warnings:

  - You are about to drop the column `teamId` on the `invitation` table. All the data in the column will be lost.
  - You are about to drop the column `subdomain` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `session` table. All the data in the column will be lost.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `description` on the `workspace` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `workspace` table. All the data in the column will be lost.
  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team_member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_teamId_fkey";

-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "team_member" DROP CONSTRAINT "team_member_teamId_fkey";

-- DropForeignKey
ALTER TABLE "team_member" DROP CONSTRAINT "team_member_userId_fkey";

-- AlterTable
ALTER TABLE "invitation" DROP COLUMN "teamId";

-- AlterTable
ALTER TABLE "organization" DROP COLUMN "subdomain",
ADD COLUMN     "domain" TEXT;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "teamId";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "workspace" DROP COLUMN "description",
DROP COLUMN "type";

-- DropTable
DROP TABLE "team";

-- DropTable
DROP TABLE "team_member";

-- DropEnum
DROP TYPE "WorkspaceType";
