@echo off
call npx prisma migrate reset --schema=./models/schema.prisma -f --skip-seed
pause
