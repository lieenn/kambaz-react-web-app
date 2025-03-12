/* eslint-disable @typescript-eslint/no-explicit-any */
import AssignmentStatus from "./AssignmentStatus";
import AssignmentControls from "./AssignmentControls";
import { PiNotePencil } from "react-icons/pi";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  // const assignments = db.assignments.filter(
  //   (assignment) => assignment.course === cid
  // );
  const assignments = useSelector((state: any) =>
    state.assignmentReducer.assignments.filter(
      (assignment: any) => assignment.course === cid
    )
  );

  const handleAddAssignment = () => {
    const newId = "R" + Math.floor(Math.random() * 900 + 100).toString();

    const newAssignment = {
      title: "New Assignment",
      course: newId,
      description: "Assignment description",
      available: new Date().toISOString(),
      due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    };
    dispatch(addAssignment(newAssignment));
  };

  return (
    <div id="wd-assignments">
      <AssignmentControls addAssignment={handleAddAssignment} />
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
            {assignments.map((assignment: any) => (
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
                    <AssignmentControlButtons
                      assignmentId={assignment._id}
                      deleteAssignment={() =>
                        dispatch(deleteAssignment(assignment._id))
                      }
                    />
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
