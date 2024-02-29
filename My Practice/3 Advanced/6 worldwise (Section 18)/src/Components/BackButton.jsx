import { useNavigate } from "react-router-dom";
import Button from "./Button";
function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault(); //* to prevent form reload
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
