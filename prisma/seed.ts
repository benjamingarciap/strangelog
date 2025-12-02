import { readFileSync } from 'fs'
import { join } from 'path'
type UFOImage = { url: string }

const ufoImages: UFOImage[] = JSON.parse(
  readFileSync(join(process.cwd(), 'data/images.json'), 'utf-8')
)

import {
  PrismaClient,
  ReactionType,
  EncounterCategory,
} from '../app/generated/prisma/index.js'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()
const ufoImageUrls: string[] = ufoImages.map((img) => img.url)

async function main() {
  console.log('🔹 Clearing database...')

  // Delete everything in proper order to avoid foreign key conflicts
  await prisma.confidence.deleteMany()
  await prisma.reaction.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.encounter.deleteMany()
  await prisma.user.deleteMany()

  console.log('🔹 Database cleared, seeding...')

  // ----------------------
  // 1. Create Users
  // ----------------------
  const NUM_USERS = 40
  const usersData = Array.from({ length: NUM_USERS }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(), // hash in real app
    confidenceLevel: faker.number.int({ min: 1, max: 5 }),
    bio: faker.lorem.sentence(),
    avatarUrl: faker.image.avatar(),
  }))

  await prisma.user.createMany({ data: usersData, skipDuplicates: true })
  const allUsers = await prisma.user.findMany()

  const ufoTitles = [
    'Bright orb hovering silently over farmland.',
    'Triangular craft with pulsating lights.',
    'Strange luminous discs seen at dusk.',
    'Unexplained light formation moving fast.',
    'Silent sphere emitting low-frequency hum.',
    'Multiple orbs forming a geometric pattern.',
    'Hovering object disappearing suddenly.',
    'Flashing lights near power lines.',
    'Mysterious glowing object above the forest.',
    'Slow-moving saucer shape over the lake.',
    'Bright beam shining downward from object.',
    'Blinking lights in V-shaped formation.',
    'Witness spotted metallic craft with no sound.',
    'Fast-moving unidentified object in cloudy sky.',
    'Pulsating light changing colors rapidly.',
    'Oval-shaped object with strange markings.',
    'Flying object emitting soft blue glow.',
    'Dark craft with bright undercarriage lights.',
    'Circular formation of lights hovering low.',
    'Triangular UFO with rotating red beacon.',
    'Silent object hovering above highway.',
    'Strange light beam illuminating the ground.',
    'Bright flash followed by sudden disappearance.',
    'Multiple lights moving in synchronized pattern.',
    'Craft emitting faint buzzing sound.',
    'Large disk-shaped object with central dome.',
    'Glowing orb hovering near mountain peak.',
    'Witness reported sudden time loss during sighting.',
    'Flying object leaving no visible trail.',
    'Bright white object slowly descending.',
  ]

  const ufoDescriptions = [
    'Witness reported a bright orb moving silently over fields late at night.',
    'Multiple lights formed a triangular pattern above the mountains.',
    'An unexplained disc-shaped object was seen hovering near the lake.',
    'Strange light formations moving quickly across the sky were spotted.',
    'A silent sphere was emitting a low-frequency hum over the forest.',
    'Several orbs appeared to form a precise geometric pattern in the sky.',
    'A hovering object disappeared suddenly without a trace.',
    'Flashing lights were seen close to the power lines near the town.',
    'A glowing object hovered mysteriously above the dense forest area.',
    'A slow-moving saucer-shaped craft was observed over the lake surface.',
    'A bright beam of light shone downwards from the unidentified object.',
    'Blinking lights in a V-shaped formation were visible for several minutes.',
    'A metallic craft was spotted by a witness, making no sound whatsoever.',
    'A fast-moving unidentified object darted across a cloudy sky.',
    'The pulsating light rapidly changed colors in a mesmerizing display.',
    'An oval-shaped object with unusual markings was seen in the sky.',
    'A flying object emitted a soft blue glow as it moved silently.',
    'A dark craft with bright lights underneath hovered over the city.',
    'A circular formation of lights hovered just above the treetops.',
    'A triangular UFO with a rotating red beacon was observed hovering.',
    'A silent object hovered steadily above the highway at midnight.',
    'A strange light beam illuminated the ground beneath the craft.',
    'A bright flash of light was seen before the object vanished suddenly.',
    'Multiple synchronized lights moved in a coordinated aerial pattern.',
    'The craft emitted a faint buzzing sound that lasted several seconds.',
    'A large disk-shaped object with a dome was spotted overhead.',
    'A glowing orb hovered near the peak of a nearby mountain.',
    'A witness reported a sudden loss of time during the sighting.',
    'A flying object was seen leaving no visible trail in the sky.',
    'A bright white object was slowly descending before disappearing.',
  ]

  // ----------------------
  // 2. Create Encounters
  // ----------------------
  const NUM_ENCOUNTERS = 200
  const encounterCategories: EncounterCategory[] = [
    'UAP_LUMINOUS_ORBS',
    'UAP_DISC',
    'UAP_TRIANGLE',
    'UAP_CYLINDER',
    'UAP_SPHERE',
    'UAP_TRANS_MEDIUM',
    'UAP_FORMATION_SWARM',
    'CE_1',
    'CE_2',
    'CE_3',
    'CE_4_ABDUCTION',
    'CE_5_INITIATED_CONTACT',
    'CE_6_INJURY',
    'CE_7_LONG_TERM_CONTACT',
    'ENTITY_ENCOUNTER',
    'ABDUCTION_SCENARIO',
    'POLTERGEIST_ACTIVITY',
    'PORTAL_DIMENSIONAL',
    'CATTLE_MUTILATION',
    'MEN_IN_BLACK',
    'MISSING_TIME',
    'PSYCHIC_EFFECTS',
    'TRACE_EVIDENCE',
    'EM_INTERFERENCE',
    'RADIATION_EFFECTS',
    'WEATHER_DISTURBANCE',
    'OTHER',
  ]

  const encountersData = Array.from({ length: NUM_ENCOUNTERS }, () => {
    const idx = faker.number.int({ min: 0, max: ufoTitles.length - 1 })

    return {
      title: ufoTitles[idx],
      content: ufoDescriptions[idx],
      category: faker.helpers.arrayElements(
        encounterCategories,
        faker.number.int({ min: 1, max: 3 })
      ),
      locationLat: faker.location.latitude({ min: -90, max: 90 }),
      locationLng: faker.location.longitude({ min: -180, max: 180 }),
      media: faker.helpers.arrayElements(
        ufoImageUrls,
        faker.number.int({ min: 1, max: 3 })
      ),
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
    }
  })

  await prisma.encounter.createMany({ data: encountersData })
  const allEncounters = await prisma.encounter.findMany()

  // ----------------------
  // 3. Create Comments
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

  // ----------------------
  // 6. Assign Saved Encounters
  // ----------------------
  for (const user of allUsers) {
    const numSaved = faker.number.int({ min: 0, max: 10 })
    const savedEncounters = faker.helpers.arrayElements(allEncounters, numSaved)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        savedEncounters: {
          connect: savedEncounters.map((enc) => ({ id: enc.id })),
        },
      },
    })
  }

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
