export class CreateCategoryDto {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly isVisible?: boolean;
  readonly status?: string;
  readonly relatedBooksIds?: string[];
}
