import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Footer() {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/*<Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/*<Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>*/ }
        </Modal.Footer>
      </Modal>


      {/* Footer */}
      <footer className="d-flex justify-content-center align-items-center py-3 my-4 border-top">
        <p className="mb-0 text-body-secondary d-flex align-items-center gap-3">
          &copy; 2025 AlefDevops, Inc.
          {/*<Button variant="outline-secondary" href="/" className="text-body-secondary text-decoration-none">Home</Button>
          <Button variant="outline-secondary" className="text-body-secondary text-decoration-none" onClick={handleShow}>
            About
          </Button>*/}
        </p>
      </footer>

    </>

  )

}