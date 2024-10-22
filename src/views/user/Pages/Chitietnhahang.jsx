import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa'; // Thêm icon trái tim

const Chitietnhahang = () => {
  return (
    <Container className="my-5">
      {/* Header */}
      <Row>
        <Col>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Nhà Hàng <span className='text-green'> Cheesy Burger</span></h1>
            {/* Nút Yêu Thích */}
            <Button variant="outline-danger">
              <FaHeart /> Yêu Thích
            </Button>
          </div>
          <p>Địa chỉ: 339/22 Tô Hiến Thành, Cư xá Bắc Hải, Phường 13, Quận 10, Hồ Chí Minh, Việt Nam</p>
        </Col>
      </Row>

      {/* Banner */}
      <Row className="my-4">
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/bannerchitiet.png"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Hình 1</h3>
                <p>Mô tả hình ảnh 1.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/bannerchitiet2.png"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Hình 2</h3>
                <p>Mô tả hình ảnh 2.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/bannerchitiet3.png"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Hình 3</h3>
                <p>Mô tả hình ảnh 3.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      {/* Thông Tin Nhà Hàng */}
      <Row className="my-4">
        <Col md={8}>
          <h2>Giới Thiệu</h2>
          <p>
            Nhà hàng ABC chuyên phục vụ các món ăn ngon và đa dạng với nguyên liệu tươi
            ngon. Chúng tôi cam kết mang đến cho khách hàng những trải nghiệm ẩm thực tuyệt
            vời nhất.
          </p>
          <h3>Giờ Mở Cửa</h3>
          <p>Từ 10:00 AM đến 10:00 PM hàng ngày.</p>
          <h3>Đánh Giá</h3>
          <p>⭐️⭐️⭐️⭐️☆ (4.0/5.0) từ 200 đánh giá.</p>
        </Col>
      </Row>

      {/* Thực Đơn */}
      <Row className="my-4">
        <Col>
          <h2>Thực Đơn</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src="/images/mon1.png" />
                <Card.Body>
                  <Card.Title>Món 1</Card.Title>
                  <Card.Text>Giá: 100,000 VND</Card.Text>
                  <Button variant="success">Thêm vào Giỏ</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src="/images/mon1.png" />
                <Card.Body>
                  <Card.Title>Món 2</Card.Title>
                  <Card.Text>Giá: 150,000 VND</Card.Text>
                  <Button variant="success">Thêm vào Giỏ</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src="/images/mon1.png" />
                <Card.Body>
                  <Card.Title>Món 3</Card.Title>
                  <Card.Text>Giá: 120,000 VND</Card.Text>
                  <Button variant="success">Thêm vào Giỏ</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Đánh Giá */}
      <Row className="my-4">
        <Col>
          <h2>Đánh Giá</h2>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Nguyễn Văn A</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">⭐️⭐️⭐️⭐️☆</Card.Subtitle>
              <Card.Text>
                Món ăn ngon, phục vụ nhanh chóng và thân thiện. Sẽ quay lại lần sau!
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Trần Thị B</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">⭐️⭐️⭐️⭐️⭐️</Card.Subtitle>
              <Card.Text>
                Không gian đẹp, thức ăn tuyệt vời. Đặc biệt thích món đặc sản của nhà hàng.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chitietnhahang;
