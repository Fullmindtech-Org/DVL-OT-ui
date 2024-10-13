const Caret = ({ direction }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-3 h-2${direction === "up" ? "rotate-0" : "rotate-180"}`}
      width="10"
      height="10"
      viewBox="0 0 10 10"
    >
      <path
        d="M 0 10 L 5 0 L 10 10"
        transform={direction === "down" ? "rotate(180 5 5)" : ""}
      />
    </svg>
  );
};

export default Caret;
