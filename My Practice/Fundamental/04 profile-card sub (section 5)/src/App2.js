import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//& Section 5: Working With Components, Props, and JSX
const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];

function App() {
  return (
    <div className="card">
      <ImgProfile />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function ImgProfile() {
  return <img className="avatar" src="img/focaccia.jpg" alt="ahbal" />;
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
        {/* {skills.map((skill) => (
          <Skill skill={skill.skill} color={skill.color} level={skill.level} />
        ))} */}

        {skills.map(({ skill, color, level }) => (
          <Skill skill={skill} color={color} level={level} key={skill} />
        ))}
      </ul>
    </>
  );
}

function Skill({ skill, color, level }) {
  return (
    <>
      <li className="skill" style={{ backgroundColor: color }}>
        <span>{skill}</span>
        {/* <span>{skill.level === 'advanced' ? '💪' : (skill.level === 'intermediate' ? '👍' : '👶')}</span> */}

        <span>
          {(level === "advanced" && "💪") ||
            (level === "intermediate" && "👍") ||
            "👶"}
        </span>

        <span>
          {level === "advanced" && "💪"}
          {level === "intermediate" && "👍"}
          {level === "beginner" && "👶"}
        </span>
      </li>
    </>
  );
}
export default App;
