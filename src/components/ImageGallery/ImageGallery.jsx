import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ items, onImageClick }) {
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
