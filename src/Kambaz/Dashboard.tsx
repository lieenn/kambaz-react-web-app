import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          {/* Move Link to only wrap clickable elements */}
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link
              to="/Kambaz/Courses/1234/Home"
              className="wd-dashboard-course-link"
            >
              <h5> CS1234 React JS </h5>
            </Link>
            <p className="wd-dashboard-course-title">
              <strong>Full Stack software developer</strong>s
            </p>
            <Link
              to="/Kambaz/Courses/1234/Home"
              className="wd-dashboard-course-link"
            >
              <button> Go </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
