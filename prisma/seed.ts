import { PrismaClient, ReactionType } from '../app/generated/prisma/index.js'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🔹 Seeding database...')

  // ----------------------
  // 1. Create Users
  // ----------------------
  const NUM_USERS = 40
  const usersData = Array.from({ length: NUM_USERS }, () => ({
    username: faker.internet.username(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(), // hash in real app
    confidenceLevel: faker.number.int({ min: 1, max: 5 }),
    bio: faker.lorem.sentence(),
    avatarUrl: faker.image.avatar(),
  }))

  await prisma.user.createMany({ data: usersData, skipDuplicates: true })
  const allUsers = await prisma.user.findMany()

  // ----------------------
  // 2. Create Encounters
  // ----------------------
  const NUM_ENCOUNTERS = 200
  const encountersData = Array.from({ length: NUM_ENCOUNTERS }, () => ({
    title: faker.lorem.words(3),
    content: faker.lorem.paragraph(),
    category: faker.helpers.arrayElement([
      'UAP — Luminous/Orbs',
      'UAP — Structured Craft: Disc',
      'UAP — Structured Craft: Triangle',
      'UAP — Structured Craft: Cylinder',
      'UAP — Structured Craft: Sphere',
      'Transmedium / USO',
      'Formation / Swarm',
      'Close Encounter (CE-1)',
      'Close Encounter (CE-2)',
      'Close Encounter (CE-3)',
      'Other / Unclassified',
    ]),
    locationLat: faker.location.latitude({ min: -90, max: 90 }),
    locationLng: faker.location.longitude({ min: -180, max: 180 }),
    media: [
      `https://picsum.photos/seed/${faker.number.int()}/1200/900`,
      `https://picsum.photos/seed/${faker.number.int()}/1200/900`,
      `https://picsum.photos/seed/${faker.number.int()}/1200/900`,
    ],
    evidence: faker.helpers.arrayElements(
      [
        'Visual',
        'Photo/Video — EO/IR',
        'Radar',
        'Multi-sensor',
        'Physical trace',
        'EM interference',
        'Physiological effects',
      ],
      faker.number.int({ min: 1, max: 3 })
    ),
    creatorId: faker.helpers.arrayElement(allUsers).id,
    likes: 0,
    dislikes: 0,
  }))

  await prisma.encounter.createMany({ data: encountersData })
  const allEncounters = await prisma.encounter.findMany()

  // ----------------------
  // 3. Create Comments (with nested replies)
  // ----------------------
  const NUM_COMMENTS = 700
  const commentsData = Array.from({ length: NUM_COMMENTS }, () => {
    const parentIdChance =
      Math.random() < 0.3 ? faker.helpers.arrayElement([null]) : undefined
    return {
      content: faker.lorem.sentence(),
      authorId: faker.helpers.arrayElement(allUsers).id,
      encounterId: faker.helpers.arrayElement(allEncounters).id,
      parentId: parentIdChance || null,
    }
  })

  await prisma.comment.createMany({ data: commentsData })

  // ----------------------
  // 4. Create Reactions
  // ----------------------
  const reactionsData = allEncounters.flatMap((encounter) =>
    faker.helpers.arrayElements(allUsers, 3).map((user) => ({
      userId: user.id,
      encounterId: encounter.id,
      type: faker.helpers.arrayElement([
        ReactionType.LIKE,
        ReactionType.DISLIKE,
      ]),
    }))
  )

  await prisma.reaction.createMany({
    data: reactionsData,
    skipDuplicates: true,
  })

  // ----------------------
  // 5. Create Confidence votes
  // ----------------------
  const confidenceData = allEncounters.flatMap((encounter) =>
    faker.helpers.arrayElements(allUsers, 3).map((user) => ({
      userId: user.id,
      encounterId: encounter.id,
      level: faker.number.int({ min: 1, max: 5 }),
    }))
  )

  await prisma.confidence.createMany({
    data: confidenceData,
    skipDuplicates: true,
  })

  console.log('✅ Seed finished successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
