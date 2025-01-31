import { type FC } from 'react';

const genres = [
  'All Genres',
  'Adventure',
  'Art',
  'Biography',
  'Business',
  'Crime',
  'Drama',
  'Fantasy',
  'Fiction',
  'Historical Fiction',
  'Horror',
  'Mystery',
  'Philosophy',
  'Poetry',
  'Psychology',
  'Romance',
  'Science',
  'Science Fiction',
  'Self-Help',
  'Technology',
  'Thriller',
];

interface AsideProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  setStartIndex: (index: number) => void;
  showWishlist: boolean;
  setShowWishlist: (show: boolean) => void;
  wishlistCount: number;
}

const Aside: FC<AsideProps> = ({
  selectedGenre,
  setSelectedGenre,
  setStartIndex,
  showWishlist,
  setShowWishlist,
  wishlistCount
}) => {
  return (
    <aside className="w-64 bg-white h-screen  fixed left-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Genres</h2>
        <div className="space-y-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                setSelectedGenre(genre);
                setStartIndex(0);
                setShowWishlist(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-sm ${
                selectedGenre === genre && !showWishlist
                  ? 'bg-pink-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {genre}
            </button>
          ))}
          <button
            onClick={() => setShowWishlist(true)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-sm ${
              showWishlist
                ? 'bg-pink-500 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            My Wishlist ({wishlistCount})
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
