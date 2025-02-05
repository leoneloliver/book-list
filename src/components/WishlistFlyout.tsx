import React, { useState } from 'react';
import type { Book } from '../types/book';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import SimilarBooksModal from './SimilarBooksModal';

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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSimilarBooks = (book: Book) => {
    lockScroll();
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Add a utility function to handle scroll locking
  const useScrollLock = () => {
    const lockScroll = () => {
      // Save current scroll position
      document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
      // Restore scroll position
      document.body.style.overflow = 'auto';
    };

    return { lockScroll, unlockScroll };
  };

  const { lockScroll, unlockScroll } = useScrollLock();

  return (
    <>
      {/* Wishlist Flyout */}
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
                        'https://placehold.co/400x600?text=No+Image'
                      }
                      alt={book.volumeInfo.title}
                      className="w-16 h-24 object-cover rounded cursor-pointer"
                      onClick={() => onBookSelect(book)}
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-sm mb-1 line-clamp-2 cursor-pointer"
                        onClick={() => onBookSelect(book)}
                      >
                        {book.volumeInfo.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                        {book.volumeInfo.authors?.join(', ') ||
                          'Unknown Author'}
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => toggleWishlist(book)}
                          className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => openSimilarBooks(book)}
                          className="text-sm text-blue-500 hover:text-blue-600"
                        >
                          Similar
                        </button>
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.amazon.com/s?k=${encodeURIComponent(
                                book.volumeInfo.title
                              )}`,
                              '_blank'
                            )
                          }
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

      {/* Similar Books Modal */}
      {selectedBook && (
        <SimilarBooksModal
          isOpen={isModalOpen}
          onClose={() => {
            unlockScroll(); // Unlock scroll when closing the modal
            setIsModalOpen(false);
          }}
          bookTitle={selectedBook.volumeInfo.title}
        />
      )}
    </>
  );
};
