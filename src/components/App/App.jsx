import { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchImages } from '../ImageCard-api';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [newReq, setnewReq] = useState('');
  //   const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  //   useEffect(() => {
  //     setLoading(true);
  //     async function getArticles() {
  //       try {
  //         setLoading(true);
  //         const data = await fetchImages('cup');
  //         console.log(data);
  //         setArticles(data);
  //         setLoading(false);
  //       } catch (error) {
  //         setError(true);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //     getArticles();
  //   }, []);

  const handleSearch = async newReq => {
    if (newReq === '') {
      toast.error('Please enter a word to search for a picture.');
      return;
    }

    setArticles([]);
    setPage(1);
    setnewReq(newReq);
  };

  const handleLoadMore = () => {
    console.log('click click click');
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
        //   setTotalPages(data.total_pages);
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

  const openModal = item => {
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
