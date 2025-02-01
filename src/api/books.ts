import type { Book } from '../types/book';

interface FetchBooksParams {
  searchQuery: string;
  selectedGenre: string;
  startIndex: number;
  loadMore?: boolean;
}

interface FetchBooksResponse {
  books: Book[];
  totalItems: number;
  hasMore: boolean;
  newStartIndex: number;
}

const GOOGLE_BOOKS_API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const MAX_RESULTS = 12;

export const fetchBooks = async ({
  searchQuery,
  selectedGenre,
  startIndex,
  loadMore = false
}: FetchBooksParams): Promise<FetchBooksResponse> => {
  const searchTerm = searchQuery
    ? `intitle:${searchQuery}${
        selectedGenre !== 'All Genres'
          ? `+subject:${selectedGenre.toLowerCase()}`
          : ''
      }`
    : selectedGenre !== 'All Genres'
    ? `subject:${selectedGenre.toLowerCase()}`
    : '';

  const url = new URL(GOOGLE_BOOKS_API_BASE_URL);
  url.searchParams.append('q', searchTerm || '*');
  url.searchParams.append('maxResults', MAX_RESULTS.toString());
  url.searchParams.append('startIndex', loadMore ? startIndex.toString() : '0');
  url.searchParams.append('orderBy', 'relevance');

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  const data = await response.json();
  const newItems = data.items || [];

  return {
    books: newItems,
    totalItems: data.totalItems || 0,
    hasMore: (loadMore ? startIndex + newItems.length : newItems.length) < data.totalItems,
    newStartIndex: loadMore ? startIndex + MAX_RESULTS : MAX_RESULTS
  };
};
