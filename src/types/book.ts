export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      imageLinks?: {
        thumbnail?: string;
      };
      categories?: string[];
      publishedDate?: string;
      publisher?: string;
      pageCount?: number;
      language?: string;
      averageRating?: number;
      ratingsCount?: number;
      industryIdentifiers?: Array<{
        type: string;
        identifier: string;
      }>;
    };
  }
  export interface BookApiResponse {
    items: Book[];
    totalItems: number;
    kind: string;
  }
