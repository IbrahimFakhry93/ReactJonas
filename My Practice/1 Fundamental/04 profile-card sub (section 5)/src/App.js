import logo from "./logo.svg";
import "./index.css";
//& Section 5: Working With Components, Props, and JSX
function App() {
  return (
    <div className="card">
      <Avatar imgSrc="img/focaccia.jpg" />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <>
      <img className="avatar" src={props.imgSrc} alt="pizza" />
    </>
  );
}

function Intro() {
  return (
    <>
      <h1>Jonas Schmidtmann</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod,
        tortor nec pharetra ultricies, ante erat imperdiet velit
      </p>
    </>
  );
}

function SkillList() {
  return (
    <>
      <ul className="skill-list">
        <Skill skill="HTML-CSS" backgroundColor="blue" emoji="💪" />
        <Skill skill="JavaScript" backgroundColor="yellow" emoji="💪" />
        <Skill skill="Web Design" backgroundColor="green" emoji="💪" />
        <Skill skill="Git & Github" backgroundColor="red" emoji="👍" />
        <Skill skill="React" backgroundColor="aqua" emoji="💪" />
        <Skill skill="Svelte" backgroundColor="magenta" emoji="👶" />
      </ul>
    </>
  );
}

function Skill(props) {
  return (
    <>
      <li className="skill" style={{ backgroundColor: props.backgroundColor }}>
        <span>{props.skill}</span>
        <span>{props.emoji}</span>
      </li>
    </>
  );
}

export default App;
