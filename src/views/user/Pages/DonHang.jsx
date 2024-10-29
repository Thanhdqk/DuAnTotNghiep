import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import VoucherSelection from './VoucherSelection';

function DonHang() {
    const donHangId = "1"; // Thiết lập ID đơn hàng mặc định
    const [donHang, setDonHang] = useState(null);
    const [error, setError] = useState('');
    const [voucherApplied, setVoucherApplied] = useState(null); // State để lưu voucher đã áp dụng

    useEffect(() => {
        const fetchDonHang = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/orders/${donHangId}`);
                const donHangData = response.data;

                setDonHang(donHangData);
            } catch (error) {
                setError('Không tìm thấy đơn hàng!');
            }
        };

        fetchDonHang();
    }, [donHangId, voucherApplied]);

    const applyVoucher = async (voucherID) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/orders/applyVoucher`, null, {
                params: { donHangId, voucherId: voucherID }
            });
            setDonHang(response.data);
            setVoucherApplied(response.data.voucher); // Cập nhật voucher đã áp dụng
        } catch (error) {
            console.error('Lỗi khi áp dụng voucher:', error);
            alert('Giá trị đơn hàng không đủ để áp dụng voucher này!');
        }
    };

    // Hàm hủy áp dụng voucher  
    const cancelVoucher = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/orders/cancelVoucher`, null, {
                params: { donHangId }
            });
            setDonHang(response.data);
            setVoucherApplied(null); // Reset voucher đã áp dụng
        } catch (error) {
            console.error('Lỗi khi hủy voucher:', error);
            alert('Không thể hủy voucher. Vui lòng thử lại.');
        }
    };

    if (error) return <Container><p>{error}</p></Container>;
    if (!donHang) return <Container><p>Đang tải...</p></Container>;

    // Tính toán Thành tiền
    const thanhTien = donHang.tong_tien + donHang.phi_ship;

    return (
        <Container>
            <Card>
                <Card.Header>Chi tiết đơn hàng</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item><strong>ID đơn hàng:</strong> {donHang.don_hangid}</ListGroup.Item>
                    <ListGroup.Item><strong>Trạng thái:</strong> {donHang.trang_thai}</ListGroup.Item>
                    <ListGroup.Item><strong>Ngày tạo:</strong> {donHang.ngay_tao}</ListGroup.Item>
                    <ListGroup.Item><strong>Địa chỉ:</strong> {donHang.dia_chi}</ListGroup.Item>
                    <ListGroup.Item><strong>Số điện thoại:</strong> {donHang.so_dien_thoai}</ListGroup.Item>
                    <ListGroup.Item><strong>Phí ship:</strong> {donHang.phi_ship} VND</ListGroup.Item>
                    <ListGroup.Item><strong>Voucher:</strong> {donHang.voucher ? donHang.voucher.voucherID : 'Không áp dụng'}</ListGroup.Item>
                    <ListGroup.Item><strong>Tổng tiền:</strong> {donHang.tong_tien} VND</ListGroup.Item>
                    <ListGroup.Item><strong>Thành tiền:</strong> {thanhTien} VND</ListGroup.Item> {/* Thành tiền */}
                </ListGroup>
                {/* Nút hủy áp dụng voucher */}
                {voucherApplied && (
                    <Button variant="danger" onClick={cancelVoucher}>
                        Hủy áp dụng voucher
                    </Button>
                )}
            </Card>

            {/* Component chọn voucher */}
            <VoucherSelection don_hangid={donHangId} onApplyVoucher={applyVoucher} />
        </Container>
    );
}

export default DonHang;
