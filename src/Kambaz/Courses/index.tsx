/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseNavigation from "./Navigation";
import { Route, Routes, useLocation, useParams, Navigate } from "react-router";
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

export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const { courses } = useSelector((state: any) => state.courseReducer);
  const course = courses.find((course: { _id: string }) => course._id === cid);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  const isEnrolled =
    currentUser &&
    currentUser.role === "STUDENT" &&
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === cid
    );

  if (currentUser?.role === "STUDENT" && !isEnrolled) {
    return <Navigate to="/Kambaz/Dashboard" />;
  }

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
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
