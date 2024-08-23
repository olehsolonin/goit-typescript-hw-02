export default function ImageCard({ imgUrl, imgAlt }) {
  return (
    <div>
      <img src={imgUrl} alt={imgAlt} />
    </div>
  );
}
