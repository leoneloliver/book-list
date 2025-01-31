// BookCard.tsx
import { Trash2, ShoppingCart } from 'lucide-react';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  inWishlist?: boolean;
  setSelectedBook: (book: Book) => void;
  toggleWishlist: (book: Book) => void;
  wishlist: Book[];
  buyNow: (title: string) => void;
}

const BookCard = ({
  book,
  inWishlist = false,
  setSelectedBook,
  toggleWishlist,
  wishlist,
  buyNow,
}: BookCardProps) => (
  <div
    key={book.id}
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
  >
    <div className="aspect-w-2 aspect-h-3 bg-white pt-4 flex-shrink-0">
      <img
        src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.jpg'}
        alt={book.volumeInfo.title}
        className="mx-auto h-[150px] cursor-pointer"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/400x600?text=No+Image';
        }}
        onClick={() => setSelectedBook(book)}
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <div className="flex-grow">
        <h3 className="text-md font-semibold text-gray-900 mb-1 line-clamp-2 cursor-pointer" onClick={() => setSelectedBook(book)}>
          {book.volumeInfo.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 italic line-clamp-2">
          {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
        </p>
        <p className="text-xs text-gray-400 mb-2">
          ISBN:{' '}
          {book.volumeInfo.industryIdentifiers?.find(
            (id) => id.type === 'ISBN_13'
          )?.identifier || 'N/A'}
        </p>
      </div>
      <div className="flex items-center mt-0 pt-2 border-t border-gray-100">
        <button
          onClick={() => setSelectedBook(book)}
          className="text-pink-500 hover:text-pink-600 text-sm font-medium"
        >
          Read More
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(book);
          }}
          className={`ml-4 text-xl ${
            wishlist.some((b) => b.id === book.id)
              ? 'text-pink-600'
              : 'text-gray-500 hover:text-pink-500'
          }`}
        >
          {inWishlist ? (
            <Trash2 size={16} />
          ) : wishlist.some((b) => b.id === book.id) ? (
            '♥'
          ) : (
            '♡'
          )}
        </button>
        {inWishlist && (
          <button
            onClick={() => buyNow(book.volumeInfo.title)}
            className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1 ml-4"
          >
            <ShoppingCart size={16} />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default BookCard;
