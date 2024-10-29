import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import axios from 'axios';

function VoucherSelection({ don_hangid }) {
    const [vouchers, setVouchers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalVoucherOpen, setIsModalVoucherOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(Array(6).fill(false)); // Tạo mảng trạng thái
    const handleToggle = (index) => {
        const newChecked = [...isChecked];
        newChecked[index] = !newChecked[index]; // Đảo trạng thái chỉ phần tử được nhấn
        setIsChecked(newChecked); // Cập nhật lại state

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModalAdd = () => {
        setIsModalAddOpen(true);
    };
    const handleOkAdd = () => {
        setIsModalAddOpen(false);
    };
    const handleCancelAdd = () => {
        setIsModalAddOpen(false);
    };
    const showModalVoucher = () => {
        setIsModalVoucherOpen(true);
    };
    const handleOkVoucher = () => {
        setIsModalVoucherOpen(false);
    };
    const handleCancelVoucher = () => {
        setIsModalVoucherOpen(false);
    };
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
        <>
            <Modal
                width={1100}
                title="Mã giảm giá của tôi"
                open={isModalVoucherOpen}
                onOk={handleOkVoucher}
                onCancel={handleCancelVoucher}
            >
                <div className="voucher-container">
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

                                        setShowModal(false); // Đóng modal sau khi áp dụng voucher
                                    }}
                                >
                                    Áp dụng
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </div>
        </Modal>
        </>
    );
}

export default VoucherSelection;
