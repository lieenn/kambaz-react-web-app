/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup } from "react-bootstrap";
import { GoTriangleDown } from "react-icons/go";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import QuizControlButtons from "./QuizControlButtons";
import QuizControls from "./QuizControls";
import * as quizClient from "./client";
import { useSelector } from "react-redux";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const [courseQuizzes, setQuizzes] = useState<any[]>([]);
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>(
    {}
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isInstructor =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  const fetchQuizzes = async () => {
    if (!cid) return;
    try {
      const results = await quizClient.findQuizzesForCourse(cid);
      setQuizzes(results);

      // Fetch question counts for all quizzes
      const counts: Record<string, number> = {};
      for (const quiz of results) {
        const questions = await quizClient.getQuestionsForQuiz(quiz._id);
        counts[quiz._id] = questions.length;
      }
      setQuestionCounts(counts);
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

  const handlePublishQuiz = async (id: string) => {
    try {
      // Update on server first
      await quizClient.updateQuiz(id, { published: true });
      // Then update local state
      setQuizzes(
        courseQuizzes.map((quiz) =>
          quiz._id === id ? { ...quiz, published: true } : quiz
        )
      );
    } catch (error) {
      console.error("Error publishing quiz:", error);
    }
  };

  const handleUnpublishQuiz = async (id: string) => {
    try {
      // Update on server first
      await quizClient.updateQuiz(id, { published: false });
      // Then update local state
      setQuizzes(
        courseQuizzes.map((quiz) =>
          quiz._id === id ? { ...quiz, published: false } : quiz
        )
      );
    } catch (error) {
      console.error("Error unpublishing quiz:", error);
    }
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
      {isInstructor && <QuizControls addQuiz={handleAddQuiz} />}
      <ListGroup className="list-group rounded-0" id="wd-quiz">
        <ListGroup.Item className="wd-quiz list-group-item p-0 fs-5">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <GoTriangleDown className="me-2 fs-3" />
            <b> Assignment Quizzes </b>
          </div>
        </ListGroup.Item>
        <ListGroup className="wd-quiz list-group rounded-0">
          {courseQuizzes
            .filter((quiz) => isInstructor || quiz.published)
            .map((quiz: any) => (
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
                      {new Date(quiz.due).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      | {quiz.points} pts | {questionCounts[quiz._id] || 0}{" "}
                      questions
                    </h6>
                  </div>
                  {isInstructor && (
                    <div className="col-auto">
                      <QuizControlButtons
                        quizId={quiz._id}
                        published={quiz.published}
                        deleteQuiz={handleDeleteQuiz}
                        publishQuiz={handlePublishQuiz}
                        unpublishQuiz={handleUnpublishQuiz}
                      />
                    </div>
                  )}
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </ListGroup>
    </div>
  );
}
