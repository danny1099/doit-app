/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "workspace" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "workspace_slug_key" ON "workspace"("slug");
