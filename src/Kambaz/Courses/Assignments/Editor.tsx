/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router";
import db from "../../Database";
import { useDispatch } from "react-redux";
import { updateAssignment } from "./reducer";
import { useState, useEffect } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();

  const assignment = db.assignments.find(
    (assignment) => assignment._id === aid
  );

  // Add state for form values
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    inputAvailable: "",
    inputAvailableTime: "00:00",
    inputDue: "",
    inputDueTime: "23:59",
  });

  // Initialize form values from assignment when component mounts or assignment changes
  useEffect(() => {
    if (assignment) {
      const availableDate = new Date(assignment.available || "");
      const dueDate = new Date(assignment.due || "");

      setFormValues({
        title: assignment.title || "",
        description: assignment.description || "",
        inputAvailable: assignment.available
          ? availableDate.toISOString().split("T")[0]
          : "",
        inputAvailableTime: assignment.available
          ? `${availableDate
              .getHours()
              .toString()
              .padStart(2, "0")}:${availableDate
              .getMinutes()
              .toString()
              .padStart(2, "0")}`
          : "00:00",
        inputDue: assignment.due ? dueDate.toISOString().split("T")[0] : "",
        inputDueTime: assignment.due
          ? `${dueDate.getHours().toString().padStart(2, "0")}:${dueDate
              .getMinutes()
              .toString()
              .padStart(2, "0")}`
          : "23:59",
      });
    }
  }, [assignment]);

  // Add change handlers
  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  // Add save handlers
  const handleSave = () => {
    // Create date objects in local timezone
    const availableDate = new Date(
      `${formValues.inputAvailable}T${formValues.inputAvailableTime}`
    );
    const dueDate = new Date(
      `${formValues.inputDue}T${formValues.inputDueTime}`
    );

    const updatedAssignment = {
      ...assignment,
      title: formValues.title,
      description: formValues.description,
      available: availableDate.toISOString(), // This converts to UTC
      due: dueDate.toISOString(), // This converts to UTC
    };
    dispatch(updateAssignment(updatedAssignment));
  };

  return (
    <div id="wd-edit-assignment">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Assignment Name
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={formValues.title}
          onChange={handleChange}
        />
      </div>

      <div className="list-group wd-description">
        <div className="list-group-item">
          The assignment is{" "}
          <span className="wd-fg-color-red"> available online </span> <br />
          <textarea
            value={formValues.description}
            className="form-control"
            id="description"
            onChange={handleChange}
          ></textarea>
          <br />
          Submit a link to the landing page of your Web application running on
          Netlify. <br />
          <br />
          The landing page should include the following: <br />
          <br />
          <ul id="wd-to-do">
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kambaz application</li>
            <li>Link to all relevant source code repositories</li>
          </ul>
          <br></br>
          The Kambaz application should include a link to navigate back to the
          landing page.
        </div>
      </div>

      <form>
        <table className="table">
          {/* Points */}
          <tr>
            <td className="text-end align-top">
              <label htmlFor="inputPoints" className="form-label">
                Points
              </label>
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                id="inputPoints"
                value="100"
                readOnly
              />
            </td>
          </tr>

          {/* Assignment Group */}
          <tr>
            <td className="text-end align-top">
              <label htmlFor="inputAssignmentGroup" className="form-label">
                Assignment Group
              </label>
            </td>
            <td>
              <select className="form-select" id="inputAssignmentGroup">
                <option selected>ASSIGNMENTS</option>
              </select>
            </td>
          </tr>

          {/* Display Grade as */}
          <tr>
            <td className="text-end align-top">
              <label htmlFor="inputDisplayGrade" className="form-label">
                Display Grade as
              </label>
            </td>
            <td>
              <select className="form-select" id="inputDisplayGrade">
                <option selected>Percentage</option>
              </select>
            </td>
          </tr>

          {/* Submission Type */}
          <tr>
            <td className="text-end align-top">
              <label htmlFor="inputAssign" className="form-label">
                Submission Type
              </label>
            </td>{" "}
            <td>
              <div className="list-group">
                <div className="list-group-item">
                  <select className="form-select" id="inputSubmissionType">
                    <option selected>Online</option>
                  </select>
                  <br></br>
                  <label htmlFor="inputAssignTo" className="form-label">
                    <b>Online Entry Options</b>
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="r6"
                    />
                    <label className="form-check-label" htmlFor="r6">
                      Text Entry
                    </label>
                    <br />
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="r6"
                    />
                    <label className="form-check-label" htmlFor="r6">
                      Website URL
                    </label>
                    <br />
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="r6"
                    />
                    <label className="form-check-label" htmlFor="r6">
                      Media Recordings
                    </label>
                    <br />
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="r6"
                    />
                    <label className="form-check-label" htmlFor="r6">
                      Student Annotations
                    </label>
                    <br />
                    <br />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="r6"
                    />
                    <label className="form-check-label" htmlFor="r6">
                      File Uploads
                    </label>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            {/* Assign */}
            <td className="text-end align-top">
              <label htmlFor="inputAssign" className="form-label">
                Assign
              </label>
            </td>
            <td>
              <div className="list-group">
                <div className="list-group-item">
                  {/* Assign to and Date stacked */}
                  <div className="mb-3">
                    <label htmlFor="inputAssignTo" className="form-label">
                      <b>Assign to</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAssignTo"
                      placeholder="Everyone"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputAssignDate" className="form-label">
                      <b>Date</b>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputDue"
                      value={formValues.inputDue}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Available from and Until side by side */}
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="available" className="form-label">
                        <b>Available from</b>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputAvailable"
                        value={formValues.inputAvailable}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="due" className="form-label">
                        <b>Until</b>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputDue"
                        value={formValues.inputDue}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </form>
      <div className="float-end">
        <Link
          to={`/Kambaz/Courses/${cid}/Assignments`}
          className="btn btn-light me-2"
        >
          Cancel
        </Link>
        <Link
          to={`/Kambaz/Courses/${cid}/Assignments`}
          className="btn btn-danger"
          onClick={handleSave}
        >
          Save
        </Link>
      </div>
    </div>
  );
}
