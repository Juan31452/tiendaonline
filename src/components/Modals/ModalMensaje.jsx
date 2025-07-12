import { useEffect, useRef } from 'react';
import Modal from 'bootstrap/js/dist/modal';

const ModalMensaje = ({ mensaje, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    const modalInstance = new Modal(modalRef.current);
    modalInstance.show();

    const handleClose = () => {
      onClose();
      window.location.reload();
    };

    modalRef.current.addEventListener('hidden.bs.modal', handleClose);

    return () => {
        if (modalRef.current) {
            modalRef.current.removeEventListener('hidden.bs.modal', handleClose);
        }
    modalInstance.hide();
    };
  }, [onClose]);

  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Mensaje</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <p>{mensaje}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary w-100"
              data-bs-dismiss="modal"
            >
              Cerrar y recargar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMensaje;
