import React from 'react';
import type { Book } from '../types/book';
import { X, Trash2, ShoppingCart } from 'lucide-react';

interface WishlistFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Book[];
  toggleWishlist: (book: Book) => void;
  onBookSelect: (book: Book) => void;
}

export const WishlistFlyout: React.FC<WishlistFlyoutProps> = ({
  isOpen,
  onClose,
  wishlist,
  toggleWishlist,
  onBookSelect,
}) => {
  const buyNow = (bookTitle: string) => {
    const searchQuery = encodeURIComponent(bookTitle);
    window.open(`https://www.amazon.com/s?k=${searchQuery}`, '_blank');
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">Wishlist ({wishlist.length})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {wishlist.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              Your wishlist is empty
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map((book) => (
                <div
                  key={book.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      '/placeholder-book.jpg'
                    }
                    alt={book.volumeInfo.title}
                    className="w-16 h-24 object-cover rounded cursor-pointer"
                    onClick={() => onBookSelect(book)}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 cursor-pointer" onClick={() => onBookSelect(book)}>
                      {book.volumeInfo.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                      {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                    </p>

                    <div className="flex gap-3">
                      {/* <button
                        onClick={() => onBookSelect(book)}
                        className="text-sm text-pink-500 hover:text-pink-600"
                      >
                        Details
                      </button> */}
                      <button
                        onClick={() => toggleWishlist(book)}
                        className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        {/* <span>Remove</span> */}
                      </button>
                      <button
                        onClick={() => buyNow(book.volumeInfo.title)}
                        className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                      >
                        <ShoppingCart size={16} />
                        <span>Buy it</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
