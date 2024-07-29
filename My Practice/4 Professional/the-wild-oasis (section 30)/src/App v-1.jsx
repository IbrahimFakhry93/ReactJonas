import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

//* H1 is a react component. so it starts with uppercase.

//* styled.html element name such as:h1, Button
// const H1 = styled.h1`
//   font-size: 30px;
//   font-weight: 600;
//   background-color: yellow;
// `;

// const Button = styled.button`
//   font-size: 1.4rem;
//   padding: 1.2rem 1.6rem;
//   font-weight: 500;
//   border: none;
//   /* border-radius: 7px; */
//   border-radius: var(--border-radius-sm);
//   /* background-color: purple; */
//   background-color: var(--color-brand-600);
//   /* color: white; */
//   color: var(--color-brand-50);
//   box-shadow: var(--shadow-sm);
//   /* margin: 20px; */
//   cursor: pointer;
//   &:hover {
//     background-color: var(--color-brand-700);
//   }
// `;

// const Input = styled.input`
//   /* border: 1px solid #ddd; */
//   border: 1px solid var(--color-grey-300);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-sm);
//   padding: 0.8rem 1.2rem;
//   box-shadow: var(--shadow-sm);
// `;

//! to style App component:

const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          {/* <Heading type="h1">The Wild Oasis</Heading> */}
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button
                size="medium"
                variation="primary"
                onClick={() => alert("check in")}
              >
                Check In
              </Button>
              <Button
                size="small"
                variation="secondary"
                onClick={() => alert("check out")}
              >
                Check Out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Forms</Heading>
            <form>
              <Input type="number" placeholder="Number of guests"></Input>
              <Input type="number" placeholder="Number of guests"></Input>
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
// hwello
// there
