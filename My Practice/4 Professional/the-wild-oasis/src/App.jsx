import styled from "styled-components";

//* H1 is a react component. so it starts with uppercase.

//* styled.html element name such as:h1, Button
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
  margin: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

//! to style App component:

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <H1>The wild Oasis</H1>
      <Button onClick={() => alert("check in")}>Check In</Button>
      <Button onClick={() => alert("check out")}>Check Out</Button>
      <Input type="number" placeholder="Number of guests"></Input>
    </StyledApp>
  );
}

export default App;
