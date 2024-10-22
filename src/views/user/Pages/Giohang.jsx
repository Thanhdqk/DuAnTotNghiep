import React from 'react';
import { Container, Row, Col, Image, Form, Button, Table, InputGroup, FormControl } from 'react-bootstrap';

const Giohang = () => {
  return (
    <Container className="my-5">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col className="text-left">
          <h2 style={{ color: 'orange' }}>
            <b>Snack Shop Online</b> | Giỏ Hàng
          </h2>
        </Col>
        <Col xs={12} md={4}>
          <InputGroup>
            <FormControl
              placeholder="Tìm kiếm món ăn và tên shop"
              aria-label="Tìm kiếm"
            />
            <Button variant="outline-danger">
              <i className="fas fa-search"></i> {/* Biểu tượng tìm kiếm */}
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Danh sách món ăn */}
      <Table bordered hover responsive="sm">
        <thead className="text-danger">
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {/* Sản phẩm 1 */}
          <tr>
            <td>
              <Image src="/images/mon1.png" rounded width="60" />
              <span className="ml-2 ms-3">Hamburger</span>
            </td>
            <td>50.000đ</td>
            <td>
              <div className="d-flex align-items-center justify-content-center">
                <Button variant="outline-secondary" size="sm">-</Button>
                <Form.Control
                  type="text"
                  value={5}
                  readOnly
                  style={{ width: '60px', textAlign: 'center', margin: '0 5px' }}
                />
                <Button variant="outline-secondary" size="sm">+</Button>
              </div>
            </td>
            <td>250.000đ</td>
            <td className="text-center">
              <Button variant="outline-danger">🗑</Button>
            </td>
          </tr>

          {/* Sản phẩm 2 */}
          <tr>
            <td>
              <Image src="/images/mon1.png" rounded width="60" />
              <span className="ml-2 ms-3">Hamburger</span>
            </td>
            <td>50.000đ</td>
            <td>
              <div className="d-flex align-items-center justify-content-center">
                <Button variant="outline-secondary" size="sm">-</Button>
                <Form.Control
                  type="text"
                  value={5}
                  readOnly
                  style={{ width: '60px', textAlign: 'center', margin: '0 5px' }}
                />
                <Button variant="outline-secondary" size="sm">+</Button>
              </div>
            </td>
            <td>250.000đ</td>
            <td className="text-center">
              <Button variant="outline-danger">🗑</Button>
            </td>
          </tr>

          {/* Sản phẩm 3 */}
          <tr>
            <td>
              <Image src="/images/mon1.png" rounded width="60" />
              <span className="ml-2 ms-3">Hamburger</span>
            </td>
            <td>50.000đ</td>
            <td>
              <div className="d-flex align-items-center justify-content-center">
                <Button variant="outline-secondary" size="sm">-</Button>
                <Form.Control
                  type="text"
                  value={5}
                  readOnly
                  style={{ width: '60px', textAlign: 'center', margin: '0 5px' }}
                />
                <Button variant="outline-secondary" size="sm">+</Button>
              </div>
            </td>
            <td>250.000đ</td>
            <td className="text-center">
              <Button variant="outline-danger">🗑</Button>
            </td>
          </tr>

          {/* Sản phẩm 4 */}
          <tr>
            <td>
              <Image src="/images/mon1.png" rounded width="60" />
              <span className="ml-2 ms-3">Hamburger</span>
            </td>
            <td>50.000đ</td>
            <td>
              <div className="d-flex align-items-center justify-content-center">
                <Button variant="outline-secondary" size="sm">-</Button>
                <Form.Control
                  type="text"
                  value={5}
                  readOnly
                  style={{ width: '60px', textAlign: 'center', margin: '0 5px' }}
                />
                <Button variant="outline-secondary" size="sm">+</Button>
              </div>
            </td>
            <td>250.000đ</td>
            <td className="text-center">
              <Button variant="outline-danger">🗑</Button>
            </td>
          </tr>

          {/* Sản phẩm 5 */}
          <tr>
            <td>
              <Image src="/images/mon1.png" rounded width="60" />
              <span className="ml-2 ms-3">Hamburger</span>
            </td>
            <td>50.000đ</td>
            <td>
              <div className="d-flex align-items-center justify-content-center">
                <Button variant="outline-secondary" size="sm">-</Button>
                <Form.Control
                  type="text"
                  value={5}
                  readOnly
                  style={{ width: '60px', textAlign: 'center', margin: '0 5px' }}
                />
                <Button variant="outline-secondary" size="sm">+</Button>
              </div>
            </td>
            <td>250.000đ</td>
            <td className="text-center">
              <Button variant="outline-danger">🗑</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Shop Voucher */}
      <Row className="my-4 align-items-center">
        <Col md={12}>
          <h5 className="mb-3" style={{ color: 'orange' }}>Shop Voucher</h5>
          <Form.Group controlId="formAddress" >
            <Form.Control type="text" placeholder="Nhập địa chỉ của bạn" className="w-100"/>
          </Form.Group>
          <Form.Group controlId="formPayment" className="mt-3">
            <Form.Select aria-label="Chọn phương thức thanh toán" className="w-100">
              <option>Thanh toán bằng tiền mặt</option>
              <option>Thanh toán qua thẻ</option>
            </Form.Select>
          </Form.Group>
          
          {/* Dòng tổng thanh toán và nút Đặt Hàng */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Form.Check type="checkbox" label="Chọn tất cả" />
            <p className="mb-0 ms-auto" style={{ fontSize: '1.2rem' }}>Tổng thanh toán: <b>1.000.000đ</b></p>
            <Button variant="warning" className="ml-auto ms-5">Đặt Hàng</Button>
          </div>
          
        </Col>
      </Row>
    </Container>
  );
}

export default Giohang;
