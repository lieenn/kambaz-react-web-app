/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link } from "react-router-dom";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  console.log("PeopleTable", users);
  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((usr) => (
            <tr key={usr._id}>
              <td className="wd-full-name text-nowrap">
                <Link
                  to={`/Kambaz/Account/Users/${usr._id}`}
                  className="text-decoration-none"
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{usr.firstName}</span>{" "}
                  <span className="wd-last-name">{usr.lastName}</span>
                </Link>
              </td>
              <td className="wd-login-id">{usr.loginId}</td>
              <td className="wd-section">{usr.section}</td>
              <td className="wd-role">{usr.role}</td>
              <td className="wd-last-activity">{usr.lastActivity}</td>
              <td className="wd-total-activity">{usr.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
