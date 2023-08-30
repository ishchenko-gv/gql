import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "colors";

import { connectDB } from "../../src/config/db";
import Author from "../../src/components/author/model";
import Book from "../../src/components/book/model";

dotenv.config();

const authorIds = Array(10)
  .fill(null)
  .map(() => new mongoose.Types.ObjectId());

function getRandomAuthor() {
  return authorIds[Math.floor(Math.random() * authorIds.length)];
}

function createAuthors() {
  return authorIds.map((id) => ({
    _id: id,
    name: faker.person.fullName(),
    photoImgUrl: faker.image.urlLoremFlickr({
      width: 240,
      height: 240,
      category: "writer",
    }),
    biography: faker.lorem.paragraph({ min: 10, max: 20 }),
    biographyShort: faker.lorem.paragraph({ min: 3, max: 5 }),
    bornDate: faker.date.birthdate(),
    diedDate: Math.random() > 0.5 ? faker.date.past() : null,
  }));
}

function createBook() {
  return {
    title: faker.word.noun(),
    authors: [
      getRandomAuthor(),
      ...(Math.random() > 0.5 ? [getRandomAuthor()] : []),
    ],
    released: faker.date.past(),
    coverImgUrl: faker.image.urlLoremFlickr({
      width: 240,
      height: 320,
      category: "book",
    }),
  };
}

const authors = createAuthors();
const books = faker.helpers.multiple(createBook, { count: 50 });

async function writeFakeData() {
  try {
    await connectDB();

    await Author.collection.drop();
    await Book.collection.drop();

    await Author.insertMany(authors);
    await Book.insertMany(books);

    console.log("Fake data has written!".green.bold);
  } catch (e) {
    console.log(e);
  }
}

writeFakeData();
