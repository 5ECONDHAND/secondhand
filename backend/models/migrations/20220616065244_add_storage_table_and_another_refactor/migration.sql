-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Storage" ALTER COLUMN "size" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "TransactionsOnUsers" (
    "offeredPrice" DECIMAL(12,2) NOT NULL,
    "description" TEXT,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INT NOT NULL,
    "transactionId" INT NOT NULL,

    CONSTRAINT "TransactionsOnUsers_pkey" PRIMARY KEY ("userId","transactionId")
);

-- CreateTable
CREATE TABLE "CategoriesOnProducts" (
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INT NOT NULL,
    "productId" INT NOT NULL,

    CONSTRAINT "CategoriesOnProducts_pkey" PRIMARY KEY ("categoryId","productId")
);

-- CreateTable
CREATE TABLE "ProductsOnStorages" (
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INT NOT NULL,
    "storageId" INT NOT NULL,

    CONSTRAINT "ProductsOnStorages_pkey" PRIMARY KEY ("storageId","productId")
);

-- CreateTable
CREATE TABLE "StoragesOnUsers" (
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storageId" INT NOT NULL,
    "userId" INT NOT NULL,

    CONSTRAINT "StoragesOnUsers_pkey" PRIMARY KEY ("storageId","userId")
);

-- AddForeignKey
ALTER TABLE "TransactionsOnUsers" ADD CONSTRAINT "TransactionsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionsOnUsers" ADD CONSTRAINT "TransactionsOnUsers_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnStorages" ADD CONSTRAINT "ProductsOnStorages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnStorages" ADD CONSTRAINT "ProductsOnStorages_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoragesOnUsers" ADD CONSTRAINT "StoragesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoragesOnUsers" ADD CONSTRAINT "StoragesOnUsers_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
