# Requirements

## Goals

Learning purpose fullstack app covering `apollo`, `graphql`, `mongodb`, `mongoose`

## Screens

### Main

- list of the most popular books
- list of books by the most popular authors
- list of books by the most popular genres

### Books

- list of all books with sorting by title/year/author/genre with pagination

### Book

- full info about the book
- reference to authors

### Authors

- list of authors with sorting by name/year/genre with pagination

### Author

- full info about the author
- list of related books

## API

### Books

- get book by id
- get books
- get books by author
- get books by genre
- add book

### Authors

- get author by id
- get authors
- add author

### Genres

- get genre by id
- get genres
- add genre

## Entities

```
Book {
  title: string
  authors: Author[]
  genres: Genre[]
  released: Date
  tags: string[]
  coverImgUrl: string
  previewImgUrls: string[]
}

Author {
  name: string
  photoImgUrl: string
  biography: string
  bornDate: Date
  diedDate: Date
}

Genre {
  name: string
  description: string
}
```
