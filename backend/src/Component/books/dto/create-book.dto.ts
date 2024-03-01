import { BookDimensions } from './dimension-book.dto';
import { BookFormats } from './format-book.dto';
import { BookGenre } from './genre-book.dto';

export class CreateBookDto {
  readonly UUID: string;
  readonly title: string;
  readonly author: string;
  readonly genre: BookGenre;
  readonly description: string;
  readonly publicationDate: Date;
  readonly coverImage: string;
  readonly isbn: string;
  readonly publisher: string;
  readonly totalPages: number;
  readonly format: BookFormats;
  readonly price: number;
  readonly availability: string;
  readonly tags: string[];
  readonly references: string;
  readonly weight: number;
  readonly editionDate: Date;
  readonly editionLanguage: string;
  readonly country: string;
  readonly dimensions: { [key in BookDimensions]: string };
}