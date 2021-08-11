import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // await seedUsersAndPosts()
  await getUsers();
  await log()
}

async function seedUsersAndPosts() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: [
          {title: 'Post 1'},
          {title: 'Post 2'},
        ]
      }
    },
  });
}

async function getUsers() {
  const allUsers = await prisma.user.findMany({
    include: {posts: true},
  })
  console.dir(allUsers, {depth: null})
}

async function log() {
  await prisma.log.create({data: {createdAt: new Date()}})
  const logsCount = await prisma.log.count()
  console.dir({logsCount})
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
