import Image from "next/image";
import { Col, Row, Toast } from "react-bootstrap";

export interface ToastHolderProps {
  toggleShowA: () => void;
  showA: boolean;
  toastText: string;
}

const ToastHolder = ({ toggleShowA, showA, toastText }: ToastHolderProps) => {
  return (
    <Row>
      <Col md={12} className="mb-2">
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <Image
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
              width={20}
              height={20}
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{toastText}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default ToastHolder;
