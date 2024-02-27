export class CreateBookDto {
  readonly title: string;
  readonly author: string;
  readonly genre: string;
  readonly description: string;
  readonly publicationDate: Date;
  readonly coverImage: string;
  readonly isbn: string;
  readonly Publisher: string;
  readonly totalPages: number;
  readonly format: string;
  readonly price: number;
  readonly availability: string;
  readonly tags: Array<string>;
  readonly references: string;
  readonly weight: number;
  readonly editionDate: Date;
  readonly editionLanguage: string;
  readonly country: string;
  readonly dimensions: string;
}
