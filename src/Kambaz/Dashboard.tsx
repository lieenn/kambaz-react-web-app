/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as enrollmentClient from "./Enrollments/client";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  currentUser,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  currentUser: any;
}) {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const getEnrollments = async () => {
    const allEnrollments = await enrollmentClient.findAllEnrollments();
    setEnrollments(allEnrollments);
  };

  // Load enrollments on component mount and after enroll/unenroll actions
  useEffect(() => {
    getEnrollments();
  }, []);

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  // Filter courses based on user role and view selection
  const filteredCourses =
    currentUser?.role === "STUDENT" && !showAllCourses
      ? courses.filter((course) => isEnrolled(course._id))
      : courses;

  const handleEnroll = async (event: React.MouseEvent, courseId: string) => {
    event.preventDefault();
    if (currentUser) {
      await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
      getEnrollments(); // Refresh enrollments after enrolling
    }
  };

  const handleUnenroll = async (event: React.MouseEvent, courseId: string) => {
    event.preventDefault();
    if (currentUser) {
      await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
      getEnrollments(); // Refresh enrollments after unenrolling
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {/* Course Editor (visible only to Faculty) */}
      {currentUser &&
        (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
          <>
            <h5>
              New Course
              <button
                className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse}
              >
                Add
              </button>
              <button
                className="btn btn-warning float-end me-2"
                onClick={updateCourse}
                id="wd-update-course-click"
              >
                Update
              </button>
            </h5>
            <br />
            <input
              value={course.name}
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <textarea
              value={course.description}
              className="form-control"
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            />
          </>
        )}
      {/* Enrollments toggle button (only for Students) */}
      {currentUser && currentUser.role === "STUDENT" && (
        <button
          className="btn btn-primary float-end mb-3"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
        </button>
      )}
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} (
        {filteredCourses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card h-100">
                <img
                  src={course._img || "/images/reactjs.jpg"}
                  alt=""
                  height="160"
                  onError={(e) => {
                    e.currentTarget.src = "/images/reactjs.jpg";
                  }}
                />
                <div className="card-body">
                  <span
                    className="wd-dashboard-course-link"
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.name}
                  </span>
                  <p
                    className="wd-dashboard-course-title card-text"
                    style={{ maxHeight: 53, overflow: "hidden" }}
                  >
                    {course.description}
                  </p>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="btn btn-primary"
                    onClick={() => console.log("Course clicked", course._id)}
                  >
                    Go
                  </Link>

                  {/* Faculty-only actions */}
                  {currentUser &&
                    (currentUser.role === "FACULTY" ||
                      currentUser.role === "ADMIN") && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}

                  {/* Student-only enrollment actions */}
                  {currentUser && currentUser.role === "STUDENT" && (
                    <>
                      {showAllCourses && isEnrolled(course._id) ? (
                        <button
                          className="btn btn-danger float-end"
                          onClick={(event) => handleUnenroll(event, course._id)}
                        >
                          Unenroll
                        </button>
                      ) : !isEnrolled(course._id) ? (
                        <button
                          className="btn btn-success float-end"
                          onClick={(event) => handleEnroll(event, course._id)}
                        >
                          Enroll
                        </button>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
