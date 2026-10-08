import { faker } from "@faker-js/faker";

export function userFaker() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    password: faker.internet.password(),
    image: faker.image.url(),
    bio: faker.lorem.sentence(),
  };
}

export function postFaker() {
  return {
    id: faker.string.uuid(),
    content: faker.lorem.paragraph(),
    image: faker.image.url(),
    createdAt: faker.date.anytime().toLocaleString(),
    updatedAt: faker.date.anytime().toLocaleString(),
    password: faker.internet.password(),
    userId: null,
  };
}

export function commentFaker() {
  return {
    id: faker.string.uuid(),
    content: faker.lorem.sentence(),
    createdAt: faker.date.anytime().toLocaleString(),
    updatedAt: faker.date.anytime().toLocaleString(),
    password: faker.internet.password(),
    userId: null,
    postId: null,
  };
}
