import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
export default function CourseNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "People",
  ];
  return (
    <ListGroup
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      {links.map((link) => (
        <ListGroup.Item
          key={link} // Add unique key prop
          active={pathname.includes(link)}
          className="list-group-item text-danger border border-0"
          as={Link}
          to={`/Kambaz/Courses/${cid}/${link}`}
        >
          {link}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
