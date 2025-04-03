/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AssignmentStatus from "./AssignmentStatus";
import AssignmentControls from "./AssignmentControls";
import { PiNotePencil } from "react-icons/pi";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const [assignments, setAssignments] = useState<any[]>([]);

  const fetchAssignments = async () => {
    if (!cid) return;
    try {
      const results = await client.findAssignmentsByCourse(cid);
      setAssignments(results);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleAddAssignment = async () => {
    if (!cid) return;
    try {
      const newAssignment = {
        title: "New Assignment",
        description: "Assignment description",
        available: new Date().toISOString(),
        due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
      };

      await client.createAssignment(cid, newAssignment);
      fetchAssignments(); // Refresh the assignments list
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (!cid) return;
    try {
      await client.deleteAssignment(cid, id);
      fetchAssignments(); // Refresh the assignments list
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
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
                key={assignment._id}
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
                        handleDeleteAssignment(assignment._id)
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
