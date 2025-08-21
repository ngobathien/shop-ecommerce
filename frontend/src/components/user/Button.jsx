// import Button from "react-bootstrap/esm/Button";
const Button = ({ onClick, children }) => {
  return (
    <>
      <button onClick={onClick}>{children}</button>
    </>
  );
};

export default Button;
