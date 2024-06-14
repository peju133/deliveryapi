-- CreateTable
CREATE TABLE "categories_on_company" (
    "category_company_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,

    CONSTRAINT "categories_on_company_pkey" PRIMARY KEY ("category_company_id","company_id")
);

-- AddForeignKey
ALTER TABLE "categories_on_company" ADD CONSTRAINT "categories_on_company_category_company_id_fkey" FOREIGN KEY ("category_company_id") REFERENCES "category_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_company" ADD CONSTRAINT "categories_on_company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
