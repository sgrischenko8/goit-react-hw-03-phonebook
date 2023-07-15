import PropTypes from 'prop-types';
import styles from './ContactListItem.module.css';

export const ContactListItem = ({ contact, onDeleteContact }) => {
  return (
    <>
      {contact.name}: {contact.number}
      <button
        className={styles.btn}
        type="button"
        onClick={() => onDeleteContact(contact.id)}
      >
        Delete
      </button>
    </>
  );
};

ContactListItem.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
