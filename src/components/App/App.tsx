import { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchImages } from '../ImageCard-api';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';

type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
};

export default function App() {
  const [articles, setArticles] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [newReq, setnewReq] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const handleSearch = async (newReq: string) => {
    if (newReq === '') {
      toast.error('Please enter a word to search for a picture.');
      return;
    }

    setArticles([]);
    setPage(1);
    setnewReq(newReq);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (newReq === '') return;

    async function getArticles() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(newReq, page);
        setArticles(prevData => [...prevData, ...data]);
        toast.success('The request is successful, the images are loading)');
      } catch (error) {
        toast.error('Ooops, some error, refresh the page...');
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getArticles();
  }, [page, newReq]);

  const openModal = (item: Image) => {
    setSelectedImage(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <h1>HTTP requests in React</h1>
      <SearchBar onSearch={handleSearch} />
      {articles.length > 0 && (
        <ImageGallery items={articles} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {articles.length > 0 && !loading && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
      <Toaster />
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        item={selectedImage}
      />
    </div>
  );
}
