import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4">
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to="/Kambaz/Courses/1234/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src="/images/reactjs.jpg"
                    width="100%"
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title">
                      CS1234 React JS
                    </Card.Title>
                    <Card.Text className="wd-dashboard-course-description">
                      Full Stack software developer
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to="/Kambaz/Courses/5678/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src="/images/datavis.jpg"
                    width="100%"
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title> CS5678 Data Visualization </Card.Title>
                    <Card.Text className="wd-dashboard-course-description">
                      Data analysis and visualization
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to="/Kambaz/Courses/8910/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img src="/images/dsa.jpg" width="100%" height={160} />
                  <Card.Body>
                    <Card.Title> CS8910 Data Structures </Card.Title>
                    <Card.Text className="wd-dashboard-course-description">
                      Algorithms and data structures{" "}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to="/Kambaz/Courses/1112/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src="/images/network.jpg"
                    width="100%"
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title> CS1112 Computer Networks </Card.Title>
                    <Card.Text className="wd-dashboard-course-description">
                      Networking and security{" "}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to="/Kambaz/Courses/1314/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src="/images/system.jpg"
                    width="100%"
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title> CS1314 Operating Systems </Card.Title>
                    <Card.Text className="wd-dashboard-course-description">
                      Systems programming{" "}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to="/Kambaz/Courses/1516/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src="/images/software.png"
                    width="100%"
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title> CS1516 Software Engineering </Card.Title>
                    <Card.Text className="wd-dashboard-course-description">
                      Software development lifecycle{" "}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to="/Kambaz/Courses/1718/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src="/images/cyber.jpg"
                    width="100%"
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title> CS1718 Cybersecurity </Card.Title>
                    <Card.Text className="wd-dashboard-course-description">
                      Security and privacy{" "}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to="/Kambaz/Courses/1920/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src="/images/ml.jpg"
                    width="100%"
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title> CS1920 Machine Learning </Card.Title>
                    <Card.Text className="wd-dashboard-course-description">
                      Artificial intelligence{" "}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
