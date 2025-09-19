-- CreateTable
CREATE TABLE "public"."_SavedEncounters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SavedEncounters_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SavedEncounters_B_index" ON "public"."_SavedEncounters"("B");

-- AddForeignKey
ALTER TABLE "public"."_SavedEncounters" ADD CONSTRAINT "_SavedEncounters_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Encounter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SavedEncounters" ADD CONSTRAINT "_SavedEncounters_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
