import Modal from 'react-modal';

type Image = {
  urls: {
    regular: string;
  };
  alt_description: string;
};

type ImageModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  item: Image | null;
};

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onRequestClose, item }: ImageModalProps) {
  if (!item) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <img src={item.urls.regular} alt={item.alt_description} />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}
