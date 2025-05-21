import React from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button onClick={onClose} style={styles.closeButton}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        minWidth: '70vw',
        maxWidth: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: '30px',
        right: '30px',
        borderRadius: '1000px',
        background: 'white',
        width: '35px',
        height: '35px',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
    },
};

export default Modal;