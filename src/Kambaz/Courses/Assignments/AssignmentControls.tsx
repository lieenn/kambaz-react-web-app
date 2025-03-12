import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function AssignmentControls({
  addAssignment,
}: {
  addAssignment: () => void;
}) {
  return (
    <div
      id="wd-assignment-controls"
      className="d-flex justify-content-end align-items-center p-3"
    >
      <div className="input-group">
        <span className="input-group-text">
          <CiSearch />
        </span>
        <input
          type="text"
          id="wd-search-assignment"
          className="form-control"
          placeholder="Search..."
        />
      </div>

      <div className="d-flex ms-3">
        <button
          id="wd-group-btn"
          className="btn btn-lg btn-secondary me-1 d-flex align-items-center"
        >
          <FaPlus className="me-2" />
          <h6 className="m-0">Group</h6>
        </button>
        <button
          id="wd-add-assignment-btn"
          className="btn btn-lg btn-danger d-flex align-items-center justify-content-center"
          onClick={addAssignment}
        >
          <FaPlus className="me-2" />
          <h6 className="d-none d-sm-block m-0">Assignment</h6>
        </button>
      </div>
    </div>
  );
}
