import AssignmentStatus from "./AssignmentStatus";
import AssignmentControls from "./AssignmentControls";
import { PiNotePencil } from "react-icons/pi";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import LessonControlButtons from "../Modules/LessonControlButtons";
import db from "../../Database";
import { ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(
    (assignment) => assignment.course === cid
  );
  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br />
      <br />
      <ListGroup className="list-group rounded-0" id="wd-assignment">
        <ListGroup.Item className="wd-module list-group-item p-0 mb-5 fs-5">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <GoTriangleDown className="me-2 fs-3" />
            <b> ASSIGNMENTS </b>
            <AssignmentStatus />
          </div>
          <ListGroup className="wd-assignments list-group rounded-0">
            {assignments.map((assignment) => (
              <ListGroup.Item
                className="wd-lesson wd-assignment list-group-item p-3 ps-1 border-left-green"
                as={Link}
                to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
              >
                <div className="row align-items-center">
                  <BsGripVertical className="me-2 fs-3 col-auto" />
                  <PiNotePencil className="me-2 fs-3 col-auto wd-fg-color-green" />
                  <div className="col">
                    <b> {assignment.title}</b> <br />
                    <h6>
                      <span className="wd-fg-color-red">Multiple Modules</span>{" "}
                      |<b> Not available until</b>{" "}
                      {new Date(assignment.available).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      | Due{" "}
                      {new Date(assignment.due).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      | 100 pts
                    </h6>
                  </div>
                  <div className="col-auto">
                    <LessonControlButtons />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
