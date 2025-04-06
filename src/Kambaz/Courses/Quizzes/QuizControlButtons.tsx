import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControlButtons({
  quizId,
  published,
  deleteQuiz,
  publishQuiz,
  unpublishQuiz,
}: {
  quizId: string;
  published: boolean;
  deleteQuiz: (id: string) => void;
  publishQuiz: (id: string) => void;
  unpublishQuiz: (id: string) => void;
}) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteQuiz(quizId);
  };

  const handlePublish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (published) {
      unpublishQuiz(quizId);
    } else {
      publishQuiz(quizId);
    }
  };

  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete} />
      <GreenCheckmark isPublished={published} onClick={handlePublish} />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
