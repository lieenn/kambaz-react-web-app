import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";
import { BiHelpCircle, BiHistory } from "react-icons/bi";
import { FaCreativeCommons } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";

export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    {
      to: "/Kambaz/Account",
      icon: FaRegCircleUser,
      text: "Account",
    },
    {
      to: "/Kambaz/Dashboard",
      icon: AiOutlineDashboard,
      text: "Dashboard",
    },
    {
      to: "/Kambaz/Courses",
      icon: LiaBookSolid,
      text: "Courses",
    },
    {
      to: "/Kambaz/Calendar",
      icon: IoCalendarOutline,
      text: "Calendar",
    },
    {
      to: "/Kambaz/History",
      icon: BiHistory,
      text: "History",
    },
    {
      to: "/Kambaz/Help",
      icon: BiHelpCircle,
      text: "Help",
    },
    {
      to: "/Kambaz/Commons",
      icon: FaCreativeCommons,
      text: "Commons",
    },
    {
      to: "/Kambaz/Inbox",
      icon: IoMailOutline,
      text: "Inbox",
    },
    {
      to: "/Labs",
      icon: LiaCogSolid,
      text: "Labs",
    },
  ];
  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="/images/NEU.jpg" alt="" width="75px" />
      </a>

      {links.map((link, index) => (
        <ListGroup.Item
          key={index}
          className={`${
            pathname.includes(link.text)
              ? "bg-white text-danger"
              : "bg-black text-white"
          } list-group-item text-center border-0`}
          as={Link}
          to={link.to}
        >
          {/* <link.icon className="fs-1 text-danger" /> */}
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.text}
        </ListGroup.Item>
      ))}
    </div>
  );
}
