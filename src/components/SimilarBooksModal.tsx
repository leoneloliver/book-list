import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Book } from '../types/book';

interface SimilarBooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
}

const SimilarBooksModal: React.FC<SimilarBooksModalProps> = ({ isOpen, onClose, bookTitle }) => {
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !bookTitle) return;

    const fetchSimilarBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}`);
        const data = await res.json();
        setSimilarBooks(data.items || []);
      } catch (err) {
        console.error('Error fetching similar books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarBooks();
  }, [isOpen, bookTitle]);

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative flex flex-col max-h-[80vh]">
        {/* Modal Header */}
        <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">Similar Books to "{bookTitle}"</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : similarBooks.length === 0 ? (
            <p className="text-center text-gray-500">No similar books found.</p>
          ) : (
            <div className="grid gap-4">
              {similarBooks.map((book) => (
                <div key={book.id} className="flex items-center gap-3 border p-3 rounded-md">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/100x150?text=No+Image'}
                    alt={book.volumeInfo.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{book.volumeInfo.title}</h3>
                    <p className="text-xs text-gray-600">{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
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

export default SimilarBooksModal;
