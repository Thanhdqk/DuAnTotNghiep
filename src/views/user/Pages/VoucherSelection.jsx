import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import axios from 'axios';

function VoucherSelection({ don_hangid, onApplyVoucher }) {
    const [vouchers, setVouchers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/loadVoucher');
                setVouchers(response.data);
            } catch (error) {
                console.error('Error loading vouchers:', error);
            }
        };

        fetchVouchers();
    }, [don_hangid]);

    return (
        <Container>
            <Button onClick={() => setShowModal(true)}>Chọn Voucher</Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn Voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {vouchers.map(voucher => (
                            <Col key={voucher.voucherID} sm={6} md={4}>
                                <Card className="mb-3">
                                    <Card.Img variant="top" src={`/images/${voucher.hinh_anh}`} />
                                    <Card.Body>
                                        <Card.Title>Giảm: {voucher.so_tien_giam} VND</Card.Title>
                                        <Card.Text>Hạn sử dụng: {voucher.han_su_dung}</Card.Text>
                                        <Button 
                                            variant="primary"
                                            onClick={() => {
                                                onApplyVoucher(voucher.voucherID);
                                                setShowModal(false); // Đóng modal sau khi áp dụng voucher
                                            }}
                                        >
                                            Áp dụng
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default VoucherSelection;
