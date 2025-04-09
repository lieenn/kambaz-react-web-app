/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup } from "react-bootstrap";
import { GoTriangleDown } from "react-icons/go";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import QuizControlButtons from "./QuizControlButtons";
import QuizControls from "./QuizControls";
import * as quizClient from "./client";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const [courseQuizzes, setQuizzes] = useState<any[]>([]);

  const fetchQuizzes = async () => {
    if (!cid) return;
    try {
      const results = await quizClient.findQuizzesForCourse(cid);
      setQuizzes(results);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const handleAddQuiz = async () => {
    if (!cid) return;
    try {
      const newQuiz = {
        title: "New Quiz",
        description: "Quiz description",
        available: new Date().toISOString(),
        due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        points: 10,
        published: false,
      };

      await quizClient.createQuiz(cid, newQuiz);
      fetchQuizzes(); // Refresh the quizzes list
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleDeleteQuiz = async (id: string) => {
    if (!cid) return;
    try {
      await quizClient.deleteQuiz(id);
      fetchQuizzes(); // Refresh the quizzes list
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handlePublishQuiz = (id: string) => {
    setQuizzes(
      courseQuizzes.map((quiz) =>
        quiz._id === id ? { ...quiz, published: true } : quiz
      )
    );
  };
  const handleUnpublishQuiz = (id: string) => {
    setQuizzes(
      courseQuizzes.map((quiz) =>
        quiz._id === id ? { ...quiz, published: false } : quiz
      )
    );
  };

  const availability = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz.available);
    const dueDate = new Date(quiz.due);
    if (now < availableDate) {
      return "Not Available";
    } else if (now > dueDate) {
      return "Closed";
    } else {
      return "Available";
    }
  };
  return (
    <div id="wd-quizzes">
      <QuizControls addQuiz={handleAddQuiz} />
      <ListGroup className="list-group rounded-0" id="wd-quiz">
        <ListGroup.Item className="wd-quiz list-group-item p-0 fs-5">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <GoTriangleDown className="me-2 fs-3" />
            <b> Assignment Quizzes </b>
          </div>
        </ListGroup.Item>
        <ListGroup className="wd-quiz list-group rounded-0">
          {courseQuizzes.map((quiz: any) => (
            <ListGroup.Item
              key={quiz._id}
              className="wd-quiz list-group-item p-0 fs-5"
              as={Link}
              to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
            >
              <div className="row align-items-center p-3 ps-4">
                <HiOutlineRocketLaunch className="me-2 fs-3 col-auto wd-fg-color-green" />
                <div className="col">
                  <b> {quiz.title}</b> <br />
                  <h6>
                    {availability(quiz)} | Due{" "}
                    {new Date(quiz.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    | {quiz.points} pts |{" "}
                    {/* {
                      db.quizQuestions.filter(
                        (question: any) => question.quiz === quiz._id
                      ).length
                    } */}
                  </h6>
                </div>
                <div className="col-auto">
                  <QuizControlButtons
                    quizId={quiz._id}
                    published={quiz.published}
                    deleteQuiz={handleDeleteQuiz}
                    publishQuiz={handlePublishQuiz}
                    unpublishQuiz={handleUnpublishQuiz}
                  />
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </ListGroup>
    </div>
  );
}
