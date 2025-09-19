/*
  Warnings:

  - The `category` column on the `Encounter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."EncounterCategory" AS ENUM ('UAP_LUMINOUS_ORBS', 'UAP_DISC', 'UAP_TRIANGLE', 'UAP_CYLINDER', 'UAP_SPHERE', 'UAP_TRANS_MEDIUM', 'UAP_FORMATION_SWARM', 'CE_1', 'CE_2', 'CE_3', 'CE_4_ABDUCTION', 'CE_5_INITIATED_CONTACT', 'CE_6_INJURY', 'CE_7_LONG_TERM_CONTACT', 'ENTITY_ENCOUNTER', 'ABDUCTION_SCENARIO', 'POLTERGEIST_ACTIVITY', 'PORTAL_DIMENSIONAL', 'CATTLE_MUTILATION', 'MEN_IN_BLACK', 'MISSING_TIME', 'PSYCHIC_EFFECTS', 'TRACE_EVIDENCE', 'EM_INTERFERENCE', 'RADIATION_EFFECTS', 'WEATHER_DISTURBANCE', 'OTHER');

-- AlterTable
ALTER TABLE "public"."Encounter" DROP COLUMN "category",
ADD COLUMN     "category" "public"."EncounterCategory"[];
