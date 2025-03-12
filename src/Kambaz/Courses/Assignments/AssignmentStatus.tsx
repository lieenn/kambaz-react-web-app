export default function AssignmentStatus() {
  return (
    <div className="float-end">
      <button
        id="wd-percent-total"
        className="btn btn-lg me-1 flex items-center justify-center"
        style={{
          borderRadius: "50px",
          border: "1px solid black",
        }}
      >
        <h6 className="m-0"> 40% of Total </h6>
      </button>
    </div>
  );
}
