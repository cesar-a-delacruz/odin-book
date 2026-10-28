/*
  Warnings:

  - The primary key for the `follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `follower` table. All the data in the column will be lost.
  - Added the required column `followed_id` to the `follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "follower" DROP CONSTRAINT "follower_user_id_fkey";

-- AlterTable
ALTER TABLE "follower" DROP CONSTRAINT "follower_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "followed_id" TEXT NOT NULL,
ADD CONSTRAINT "follower_pkey" PRIMARY KEY ("follower_id", "followed_id");

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_followed_id_fkey" FOREIGN KEY ("followed_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
