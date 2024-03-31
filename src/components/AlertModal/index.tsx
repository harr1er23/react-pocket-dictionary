import React from 'react';

import styles from "./AlertModal.module.scss";

import Modal from "react-bootstrap/Modal";

type AlertModuleProps = {
    show: boolean;
    onClickCloseFunc: (value: boolean) => void;
    bodyContent: any;
    footerContent: any;
    headerText: string;
}

const AlertModal: React.FC<AlertModuleProps> = ({show, onClickCloseFunc, bodyContent, footerContent, headerText}) => {
  return (
    <Modal
      show={show}
      onHide={() => onClickCloseFunc(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {bodyContent}
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        {footerContent}
      </Modal.Footer>
    </Modal>
  )
}

export default AlertModal;