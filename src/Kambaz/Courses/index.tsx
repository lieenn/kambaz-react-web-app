/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseNavigation from "./Navigation";
import { Route, Routes, useLocation, useParams } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Piazza from "./Piazza";
import Zoom from "./Zoom";
import Quizzes from "./Quizzes";
import { useSelector } from "react-redux";
import QuizEditor from "./Quizzes/Editor";

export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const { courses } = useSelector((state: any) => state.courseReducer);
  const course = courses.find((course: { _id: string }) => course._id === cid);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} &gt; {pathname.split("/").pop()}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<Piazza />} />
            <Route path="Zoom" element={<Zoom />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizEditor />} />
            <Route
              path="People"
              element={<PeopleTable currentUser={currentUser} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
