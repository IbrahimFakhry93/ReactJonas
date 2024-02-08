import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
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
      <div className="data">
        <SkillList />
      </div>
    </div>
  );
}

//& Render List using object destruction and Map method

function SkillList() {
  return (
    <>
      <ul className="skill-list">
        {/* {skills.map((skill) => (
          <Skill skill={skill.skill} color={skill.color} level={skill.level} />
        ))} */}

        {/* //! instead: use object destructing  */}

        {skills.map(({ skill, color, level }) => (
          <Skill skill={skill} color={color} level={level} key={skill} />
        ))}
      </ul>
    </>
  );
}

//& Using && operator for Conditional rendering for more than two options

function Skill({ skill, color, level }) {
  return (
    <>
      <li className="skill" style={{ backgroundColor: color }}>
        <span>{skill}</span>
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
