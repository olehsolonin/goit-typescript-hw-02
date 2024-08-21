import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function ImageModal({ isOpen, onRequestClose, item }) {
  if (!item) {
    return;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <img src={item.urls.regular} alt={item.alt_description} />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}
