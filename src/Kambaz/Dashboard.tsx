/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { enroll, unenroll } from "./Enrollments/reducer";
import { useState } from "react";

export default function Dashboard({
  course,
  setCourse,
}: {
  course: any;
  setCourse: (course: any) => void;
}) {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: any) => state.courseReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  // Filter courses based on enrollment status and showAllCourses flag
  const filteredCourses = currentUser
    ? currentUser.role === "FACULTY" || currentUser.role === "ADMIN"
      ? courses // Faculty and Admin see all courses
      : showAllCourses
      ? courses
      : courses.filter((course: any) => isEnrolled(course._id))
    : [];

  // const filteredCourses = courses;

  const handleAddCourse = () => {
    const newCourse = {
      ...course,
      _id: "RS" + Math.random().toString(),
      image: "/images/reactjs.jpg",
    };
    dispatch(addCourse(newCourse));

    if (
      currentUser &&
      (currentUser.role === "FACULTY" || currentUser.role === "ADMIN")
    ) {
      dispatch(enroll({ userId: currentUser._id, courseId: newCourse._id }));
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  const handleEnroll = (courseId: string) => {
    dispatch(enroll({ userId: currentUser._id, courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenroll({ userId: currentUser._id, courseId }));
  };

  const handleCourseNavigation = (e: React.MouseEvent, courseId: string) => {
    // Only allow navigation if user is enrolled
    if (!isEnrolled(courseId) && currentUser.role === "STUDENT") {
      e.preventDefault();
      return;
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {/* Course Editor (visible only to Faculty) */}
      {currentUser &&
        (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
          <>
            <h2>Course Editor</h2>
            <Button
              variant="success"
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleUpdateCourse}
            >
              Update Course
            </Button>
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              Add New Course
            </Button>
            <FormControl
              value={course.name}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <FormControl
              value={course.description}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            />
            <hr />
          </>
        )}
      {/* Enrollments toggle button (only for Students) */}
      {currentUser && currentUser.role === "STUDENT" && (
        <Button
          variant="primary"
          className="float-end mb-3"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Enrollments" : "Enrollments"}
        </Button>
      )}
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} (
        {filteredCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => handleCourseNavigation(e, course._id)}
                >
                  <Card.Img
                    src={course.image || `/images/${course._id}.jpg`}
                    variant="top"
                    width="100%"
                    height={160}
                    onError={(e) => {
                      e.currentTarget.src = "/images/reactjs.jpg";
                    }}
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}{" "}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </Card.Text>
                    <Button variant="primary"> Go </Button>

                    {/* Faculty-only actions */}
                    {currentUser && currentUser.role === "FACULTY" && (
                      <>
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteCourse(course._id);
                          }}
                          className="float-end"
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(course);
                          }}
                          className="float-end me-2"
                        >
                          Edit
                        </Button>
                      </>
                    )}

                    {/* Student-only enrollment actions */}
                    {currentUser &&
                      currentUser.role === "STUDENT" &&
                      (isEnrolled(course._id) ? (
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleUnenroll(course._id);
                          }}
                          className="float-end"
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEnroll(course._id);
                          }}
                          className="float-end"
                        >
                          Enroll
                        </Button>
                      ))}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
