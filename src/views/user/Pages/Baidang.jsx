import Card from 'react-bootstrap/Card';
import './baidang.css';
import { Row, Col } from 'react-bootstrap';

function Baidang() {
  const cards = [
    { title: 'News 1', text: 'Quick summary of news 1', img: '/images/image1.jpg' },
    { title: 'News 2', text: 'Quick summary of news 2', img: '/images/image1.jpg' },
    { title: 'News 3', text: 'Quick summary of news 3', img: '/images/image1.jpg' },
  ];

  return (
    <div className="news-section">
      <h2 className="section-title">Sự kiện nổi bật</h2>
      <Row className="gy-4">
        {cards.map((card, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="custom-card">
              <Card.Img variant="top" src={card.img} className="card-image" />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Baidang;
