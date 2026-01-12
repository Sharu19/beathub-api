import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import User from "./models/User.js";
const MONGODB_URI =
  "mongodb+srv://nightingleUser:Sharu@1903@cluster0.5uzjvw2.mongodb.net/?appName=Cluster0";


const NUM_USERS = 1000;
const BATCH_SIZE = 100;
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB");
  } catch (error) {
    console.error("✗ MongoDB connection failed", error);
    process.exit(1);
  }
}
function generateFakeUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
    phone: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country()
    },
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    isActive: faker.datatype.boolean()
  };
}
async function seedDatabase() {
  console.log("Clearing existing users...");
  await User.deleteMany({});

  console.log(`Generating ${NUM_USERS} users in batches...`);

  for (let i = 0; i < NUM_USERS; i += BATCH_SIZE) {
    const users = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      users.push(generateFakeUser());
    }

    await User.insertMany(users, { ordered: false });
    console.log(`✓ Inserted batch ${i / BATCH_SIZE + 1}`);
  }

  console.log(`✓ Successfully seeded ${NUM_USERS} users`);
}
async function main() {
  await connectDB();
  await seedDatabase();
  await mongoose.disconnect();
  console.log("✓ Database connection closed");
}

main().catch((error) => {
  console.error("✗ Seeding failed", error);
});
