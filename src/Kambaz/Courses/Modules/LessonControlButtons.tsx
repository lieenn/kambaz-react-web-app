import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark
        isPublished={true}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
