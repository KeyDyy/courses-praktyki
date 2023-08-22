/*
  Warnings:

  - The values [Up] on the enum `VoteType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Certificate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `disability` on the `User` table. All the data in the column will be lost.
  - Changed the type of `language` on the `ForumTopic` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "lessFortunate" AS ENUM ('disability', 'health_problems', 'educational_problems', 'culture_differences', 'economic_barriers', 'social_barriers', 'geographical_barriers');

-- AlterEnum
BEGIN;
CREATE TYPE "VoteType_new" AS ENUM ('UP', 'DOWN');
ALTER TABLE "Vote" ALTER COLUMN "type" TYPE "VoteType_new" USING ("type"::text::"VoteType_new");
ALTER TYPE "VoteType" RENAME TO "VoteType_old";
ALTER TYPE "VoteType_new" RENAME TO "VoteType";
DROP TYPE "VoteType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "QuizResult" DROP CONSTRAINT "QuizResult_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_user_id_fkey";

-- AlterTable
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_pkey",
ALTER COLUMN "certificate_id" DROP DEFAULT,
ALTER COLUMN "certificate_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Certificate_pkey" PRIMARY KEY ("certificate_id");
DROP SEQUENCE "Certificate_certificate_id_seq";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ForumTopic" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "QuizResult" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "disability",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "lessFortunate" "lessFortunate",
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "User_user_id_seq";

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Disability";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
