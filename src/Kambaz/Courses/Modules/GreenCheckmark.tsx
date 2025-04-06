import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmark({
  isPublished,
  onClick,
}: {
  isPublished: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <span className="me-1 position-relative">
      <FaCheckCircle
        style={{ top: "2px", opacity: isPublished ? 1 : 0.5 }}
        className="text-success me-1 position-absolute fs-5"
        onClick={onClick}
      />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
  );
}
