import { BookDimensions } from './dimension-book.dto';
import { BookFormats } from './format-book.dto';
import { BookGenre } from './genre-book.dto';

export class CreateBookDto {
  readonly userId: string;
  readonly categoryId: string;
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly author: string;
  readonly genre: BookGenre;
  readonly genre_slug: string;
  readonly description: string;
  readonly publicationDate: Date;
  readonly image: object;
  readonly isbn: string;
  readonly publisher: string;
  readonly publisherImage: string;
  readonly totalPages: number;
  readonly format: BookFormats;
  readonly price: number;
  readonly availability: string;
  readonly tags: string[];
  readonly references: string;
  readonly weight: string; // Updated to match the schema
  readonly editionDate: Date;
  readonly editionLanguage: string;
  readonly country: string;
  readonly dimensions: { [key in BookDimensions]: string };
  readonly averageRating: number;
  readonly ratings: { userId: string; rating: number }[];
}
