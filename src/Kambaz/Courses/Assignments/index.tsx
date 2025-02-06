import AssignmentStatus from "./AssignmentStatus";
import AssignmentControls from "./AssignmentControls";
import { PiNotePencil } from "react-icons/pi";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-assignment" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <GoTriangleDown className="me-2 fs-3" />
            <b> ASSIGNMENTS </b>
            <AssignmentStatus />
          </div>
          <ul className="wd-assignments list-group rounded-0">
            <li className=" wd-lesson wd-assignment list-group-item p-3 ps-1 border-left-green">
              <div className="row align-items-center">
                <div className="col-auto">
                  <BsGripVertical className="me-2 fs-3" />
                </div>

                <div className="col-auto">
                  <span className="wd-fg-color-green">
                    <PiNotePencil className="me-2 fs-3" />
                  </span>
                </div>

                <div className="col">
                  <a
                    className=" wd-assignment-link text-decoration-none text-dark"
                    href="#/Kambaz/Courses/1234/Assignments/123"
                  >
                    <b> A1</b> <br />
                    <h6>
                      <span className="wd-fg-color-red">Multiple Modules</span>|{" "}
                      <b> Not available until</b> May 6 at 12:00am | Due May 13
                      at 11:59pm | 100 pts
                    </h6>
                  </a>
                </div>

                <div className="col-auto">
                  <LessonControlButtons />
                </div>
              </div>
            </li>

            <li className="wd-lesson wd-assignment list-group-item p-3 ps-1 border-left-green">
              <div className="row align-items-center">
                <div className="col-auto">
                  <BsGripVertical className="me-2 fs-3" />
                </div>

                <div className="col-auto">
                  <span className="wd-fg-color-green">
                    <PiNotePencil className="me-2 fs-3" />
                  </span>
                </div>

                <div className="col">
                  <a
                    className="wd-assignment-link text-decoration-none text-dark"
                    href="#/Kambaz/Courses/1234/Assignments/123"
                  >
                    <b> A2</b> <br />
                    <h6>
                      <span className="wd-fg-color-red">
                        {" "}
                        Multiple Modules{" "}
                      </span>{" "}
                      | <b> Not available until</b> May 13 at 12:00am | Due May
                      20 at 11:59pm | 100 pts
                    </h6>
                  </a>
                </div>

                <div className="col-auto">
                  <LessonControlButtons />
                </div>
              </div>
            </li>

            <li className="wd-lesson wd-assignment list-group-item p-3 ps-1 border-left-green">
              <div className="row align-items-center">
                <div className="col-auto">
                  <BsGripVertical className="me-2 fs-3" />
                </div>

                <div className="col-auto">
                  <span className="wd-fg-color-green">
                    <PiNotePencil className="me-2 fs-3" />
                  </span>
                </div>

                <div className="col">
                  <a
                    className="wd-assignment-link text-decoration-none text-dark"
                    href="#/Kambaz/Courses/1234/Assignments/123"
                  >
                    <b> A3</b> <br />
                    <h6>
                      <span className="wd-fg-color-red">Multiple Modules</span>|{" "}
                      <b> Not available until</b> May 20 at 12:00am | Due May 27
                      at 11:59pm | 100 pts
                    </h6>
                  </a>
                </div>

                <div className="col-auto">
                  <LessonControlButtons />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
