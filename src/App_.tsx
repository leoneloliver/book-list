// import { useState, useEffect, useRef, useCallback } from 'react';
// import type { Book } from './types/book';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from './components/Dialog';
// import { WishlistFlyout } from './components/WishlistFlyout';
// import { ShoppingCart } from 'lucide-react';
// import Aside from './components/Aside';
// import BookCard from './components/BookCard';
// import Footer from './components/Footer';

// // Add a utility function to handle scroll locking
// const useScrollLock = () => {
//   const lockScroll = () => {
//     // Save current scroll position
//     document.body.style.overflow = 'hidden';
//   };

//   const unlockScroll = () => {
//     // Restore scroll position
//     document.body.style.overflow = 'auto';
//   };

//   return { lockScroll, unlockScroll };
// };

// function App() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [startIndex, setStartIndex] = useState(0);
//   const [selectedGenre, setSelectedGenre] = useState<string>('All Genres');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
//   const [wishlist, setWishlist] = useState<Book[]>([]);
//   const [showWishlist, setShowWishlist] = useState(false);
//   const [isWishlistOpen, setIsWishlistOpen] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [totalItems, setTotalItems] = useState(0);
//   const loadingRef = useRef<HTMLDivElement>(null);

//   // Add scroll lock hook
//   const { lockScroll, unlockScroll } = useScrollLock();

//   useEffect(() => {
//     const savedWishlist = localStorage.getItem('bookWishlist');
//     if (savedWishlist) {
//       setWishlist(JSON.parse(savedWishlist));
//     }
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   useEffect(() => {
//     setBooks([]);
//     setStartIndex(0);
//     setHasMore(true);
//     setTotalItems(0);
//     fetchBooks();
//   }, [selectedGenre, debouncedSearch]);

//   const handleObserver = useCallback(
//     (entries: IntersectionObserverEntry[]) => {
//       const target = entries[0];
//       if (target.isIntersecting && !loading && hasMore) {
//         fetchBooks(true);
//       }
//     },
//     [loading, hasMore]
//   );

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: '20px',
//       threshold: 1.0,
//     };

//     const observer = new IntersectionObserver(handleObserver, options);
//     if (loadingRef.current) {
//       observer.observe(loadingRef.current);
//     }

//     return () => {
//       if (loadingRef.current) {
//         observer.unobserve(loadingRef.current);
//       }
//     };
//   }, [handleObserver]);

//   const toggleWishlist = (book: Book) => {
//     setWishlist((prev) => {
//       const isInWishlist = prev.some((b) => b.id === book.id);
//       const newWishlist = isInWishlist
//         ? prev.filter((b) => b.id !== book.id)
//         : [...prev, book];
//       localStorage.setItem('bookWishlist', JSON.stringify(newWishlist));
//       return newWishlist;
//     });
//   };

//   const buyNow = (bookTitle: string) => {
//     const searchQuery = encodeURIComponent(bookTitle);
//     window.open(`https://www.amazon.com/s?k=${searchQuery}`, '_blank');
//   };

//   const fetchBooks = async (loadMore = false) => {
//     try {
//       if (!hasMore && loadMore) return;

//       setLoading(true);
//       const searchTerm = debouncedSearch
//         ? `intitle:${debouncedSearch}${
//             selectedGenre !== 'All Genres'
//               ? `+subject:${selectedGenre.toLowerCase()}`
//               : ''
//           }`
//         : selectedGenre !== 'All Genres'
//         ? `subject:${selectedGenre.toLowerCase()}`
//         : '';

//       const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=${
//           searchTerm || '*'
//         }&maxResults=12&startIndex=${
//           loadMore ? startIndex : 0
//         }&orderBy=relevance`
//       );
//       if (!response.ok) throw new Error('Failed to fetch books');

//       const data = await response.json();

//       if (!loadMore) {
//         setTotalItems(data.totalItems || 0);
//       }

//       const newItems = data.items || [];

//       if (loadMore) {
//         setBooks((prev) => [...prev, ...newItems]);
//         setStartIndex((prev) => prev + 12);
//       } else {
//         setBooks(newItems);
//         setStartIndex(12);
//       }

//       const totalLoaded = loadMore ? books.length + newItems.length : newItems.length;
//       setHasMore(totalLoaded < data.totalItems);

//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Modal handlers with scroll lock
//   const handleOpenModal = (book: Book) => {
//     setSelectedBook(book);
//     lockScroll();
//   };

//   const handleCloseModal = () => {
//     setSelectedBook(null);
//     unlockScroll();
//   };

//   // Wishlist flyout handlers with scroll lock
//   const handleOpenWishlist = () => {
//     setIsWishlistOpen(true);
//   };

//   const handleCloseWishlist = () => {
//     setIsWishlistOpen(false);
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-500 text-xl">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="flex">
//         <Aside
//           selectedGenre={selectedGenre}
//           setSelectedGenre={setSelectedGenre}
//           setStartIndex={setStartIndex}
//           showWishlist={showWishlist}
//           setShowWishlist={setShowWishlist}
//           wishlistCount={wishlist.length}
//         />

//         <main className="ml-64 flex-1 p-8">
//           <header className="mb-8">
//             <button
//               onClick={handleOpenWishlist}
//               className="flex items-center gap-2 ml-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 absolute right-4"
//             >
//               <span>Wishlist</span>
//               <span className="bg-white text-pink-500 rounded-full w-6 h-6 flex items-center justify-center">
//                 {wishlist.length}
//               </span>
//             </button>

//             <h1 className="text-2xl font-bold text-gray-900 mb-4">
//               {showWishlist ? 'My Wishlist' : 'Book Explorer'}
//             </h1>
//             {!showWishlist && (
//               <div className="flex items-center gap-4">
//                 <input
//                   type="text"
//                   placeholder="Search books by title..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="text-gray-600 text-sm">
//                   Browsing{' '}
//                   <span className="font-semibold italic">{selectedGenre}</span>{' '}
//                   Books
//                 </span>
//               </div>
//             )}
//           </header>

//           {showWishlist ? (
//             wishlist.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
//                 {wishlist.map((book) => (
//                   <BookCard
//                     key={book.id}
//                     book={book}
//                     inWishlist={true}
//                     setSelectedBook={handleOpenModal}
//                     toggleWishlist={toggleWishlist}
//                     wishlist={wishlist}
//                     buyNow={buyNow}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center text-gray-500 mt-8">
//                 Your wishlist is empty. Browse books and click the heart icon to
//                 add them here!
//               </div>
//             )
//           ) : loading && !books.length ? (
//             <div className="flex justify-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
//                 {books.map((book) => (
//                   <BookCard
//                     key={book.id}
//                     book={book}
//                     inWishlist={false}
//                     setSelectedBook={handleOpenModal}
//                     toggleWishlist={toggleWishlist}
//                     wishlist={wishlist}
//                     buyNow={buyNow}
//                   />
//                 ))}
//               </div>

//               <div ref={loadingRef} className="mt-8 text-center">
//                 {loading && hasMore && (
//                   <div className="flex justify-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
//                   </div>
//                 )}
//                 {!hasMore && books.length > 0 && (
//                   <div className="text-gray-500 py-4">
//                     No more books to load
//                   </div>
//                 )}
//               </div>
//             </>
//           )}

//           <Footer />
//         </main>
//       </div>

//       <Dialog open={!!selectedBook} onOpenChange={handleCloseModal}>
//         <DialogContent className="sm:max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>{selectedBook?.volumeInfo.title}</DialogTitle>
//           </DialogHeader>
//           <div className="mt-4">
//             <div className="flex gap-4">
//               <img
//                 src={
//                   selectedBook?.volumeInfo.imageLinks?.thumbnail ||
//                   '/placeholder-book.jpg'
//                 }
//                 alt={selectedBook?.volumeInfo.title}
//                 className="max-w-[128px] max-h-[174px]"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = 'https://placehold.co/400x600?text=No+Image';
//                 }}
//               />
//               <div>
//                 <h4 className="font-semibold mb-2">Author(s)</h4>
//                 <p className="text-gray-600 mb-4">
//                   {selectedBook?.volumeInfo.authors?.join(', ') ||
//                     'Unknown Author'}
//                 </p>
//                 <p className="text-xs text-gray-400 mb-2">
//                   ISBN:{' '}
//                   {selectedBook?.volumeInfo.industryIdentifiers?.find(
//                     (id) => id.type === 'ISBN_13'
//                   )?.identifier || 'N/A'}
//                 </p>
//                 <h4 className="font-semibold mb-2">Description</h4>
//                 <p className="text-gray-600">
//                   {selectedBook?.volumeInfo.description ||
//                     'No description available'}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={() => toggleWishlist(selectedBook!)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
//                 wishlist.some((b) => b.id === selectedBook?.id)
//                   ? 'bg-pink-100 text-pink-600'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               {wishlist.some((b) => b.id === selectedBook?.id)
//                 ? '♥ In Wishlist'
//                 : '♡ Add to Wishlist'}
//             </button>
//             {wishlist.some((b) => b.id === selectedBook?.id) && (
//               <button
//                 onClick={() => buyNow(selectedBook!.volumeInfo.title)}
//                 className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
//               >
//                 <ShoppingCart size={16} />
//                 <span>Buy Now</span>
//               </button>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>

//       <WishlistFlyout
//         isOpen={isWishlistOpen}
//         onClose={handleCloseWishlist}
//         wishlist={wishlist}
//         toggleWishlist={toggleWishlist}
//         onBookSelect={(book) => {
//           handleOpenModal(book);
//           handleCloseWishlist();
//         }}
//       />
//     </div>
//   );
// }

// export default App;
