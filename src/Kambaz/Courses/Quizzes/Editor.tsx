import { useState } from "react";
import QuizDetails from "./Details";
import QuizQuestions from "./Questions";
import { Link, useParams } from "react-router-dom";

export default function QuizEditor() {
  const { cid, quizId } = useParams();
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={`wd-quiz-tab nav-link ${
              activeTab === "details" ? "active" : "text-danger"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("details");
            }}
            to={`/Kambaz/Courses/${cid}/Quizzes/${quizId}`}
          >
            Details
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`wd-quiz-tab nav-link ${
              activeTab === "questions" ? "active" : "text-danger"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("questions");
            }}
            to={`/Kambaz/Courses/${cid}/Quizzes/${quizId}/questions`}
          >
            Questions
          </Link>
        </li>
      </ul>

      {activeTab === "details" ? <QuizDetails /> : <QuizQuestions />}
    </div>
  );
}
