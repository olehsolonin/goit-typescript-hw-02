import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../App/App'; // Імплементуйте тип з файлу types.ts

// type Image = {
//   id: string;
//   urls: {
//     small: string;
//   };
//   alt_description: string;
// };

type ImageGalleryProps = {
  items: Image[];
  onImageClick: (item: Image) => void;
};

export default function ImageGallery({ items, onImageClick }: ImageGalleryProps) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onImageClick(item)}>
          <ImageCard imgUrl={item.urls.small} imgAlt={item.alt_description} />
        </li>
      ))}
    </ul>
  );
}
