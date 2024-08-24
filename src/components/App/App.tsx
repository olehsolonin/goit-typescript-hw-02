import React, { useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchImages } from '../ImageCard-api';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';


export interface Image {
	id: string;
	urls: {
	  small: string;
	  regular: string;
	};
	alt_description: string;
 }
 

const App: React.FC = () => {
  const [articles, setArticles] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [newReq, setNewReq] = useState('');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleSearch = async (newReq: string) => {
    if (newReq === '') {
      toast.error('Please enter a word to search for a picture.');
      return;
    }

    setArticles([]);
    setPage(1);
    setNewReq(newReq);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (newReq === '') {
      return;
    }

    async function getArticles() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(newReq, page);
        setArticles(prevData => [...prevData, ...data]);
        setLoading(false);
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
};

export default App;
