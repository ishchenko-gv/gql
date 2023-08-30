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
    bornDate: faker.date.birthdate(),
    diedDate: Math.random() > 0.5 ? faker.date.past() : null,
  }));
}

function createBook() {
  return {
    title: faker.word.noun(),
    authors: [getRandomAuthor()],
  };
}

const authors = createAuthors();
const books = faker.helpers.multiple(createBook, { count: 50 });

async function writeFakeData() {
  try {
    await connectDB();
    await Author.insertMany(authors);
    await Book.insertMany(books);
    console.log("Fake data has written!".green.bold);
  } catch (e) {
    console.log(e);
  }
}

writeFakeData();
