npm i --production=false && npx prisma migrate reset --schema=./models/schema.prisma -f && npx prisma db pull --schema=./models/schema.prisma && npx prisma generate --schema=./models/schema.prisma
