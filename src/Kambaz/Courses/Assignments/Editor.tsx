import { Link, useParams } from "react-router";
import db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find(
    (assignment) => assignment._id === aid
  );
  return (
    <div id="wd-edit-assignment">
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">
          Assignment Name
        </label>
        <input
          type="email"
          className="form-control"
          id="text"
          value={assignment?.title}
        />
      </div>

      <div className="list-group wd-description">
        <div className="list-group-item">
          The assignment is{" "}
          <span className="wd-fg-color-red"> available online </span> <br />
          <textarea
            value={assignment?.description}
            className="form-control"
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
                      id="inputAssignDate"
                      value={assignment?.due.split("T")[0]}
                    />
                  </div>

                  {/* Available from and Until side by side */}
                  <div className="row mb-3">
                    <div className="col">
                      <label
                        htmlFor="inputAssignAvailable"
                        className="form-label"
                      >
                        <b>Available from</b>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputAssignAvailable"
                        value={assignment?.available.split("T")[0]}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="inputAssignUntil" className="form-label">
                        <b>Until</b>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputAssignUntil"
                        value={assignment?.due.split("T")[0]}
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
        >
          Save
        </Link>
      </div>
    </div>
  );
}
