export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <h3>Assignment Name</h3>
      </label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your tull name and section Links to each of the lab
        assignments Link to the Kanbas application Links to all relevant source
        code repositories The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="assignment">ASSIGNMENT</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-grade">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="Percentage">Percentage</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="Online">Online</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label>Online Entry Option</label>
              <br />
              <input type="checkbox" name="check-entry" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input type="checkbox" name="check-entry" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input
                type="checkbox"
                name="check-entry"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input
                type="checkbox"
                name="check-entry"
                id="wd-student-annotation"
              />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
              <input type="checkbox" name="check-entry" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
              Assign to
              <br />
              <input id="wd-points" value={"Everyone"} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label htmlFor="wd-due-date">Due</label>
              <br />
              <input id="wd-due-date" type="date" value="2021-05-13" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label htmlFor="wd-available-from">Available From</label>
              <br />
              <input id="wd-available-from" type="date" value="2024-05-06" />
            </td>
            <td>
              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input id="wd-available-until" type="date" value="2024-05-20" />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}
