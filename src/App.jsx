import React from "react";
import "./App.css";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { TbLanguageHiragana } from "react-icons/tb";
import { useState } from "react";

const FIND_SHAPES = {
  area: ["circle", "square", "rectangle"],
  perimeter: ["circle", "square", "rectangle"],
  pipe: ["od"],
};

const SHAPE_LABELS = {
  en: {
    circle: "Circle",
    square: "Square",
    rectangle: "Rectangle",
    od: "OD",
  },
  ta: {
    circle: "வட்டம்",
    rectangle: "செவ்வகம்",
    square: "சதுரம்",
    od: "வெளி சுற்றளவு",
  },
};

const TEXT = {
  en: {
    title: "Formulae",
    find: "Find",
    valueOf: "Value of",
    area: "Area",
    perimeter: "Perimeter",
    select: "Select",
    pipe: "Pipe Fabrication",
    OD: "OD",
    calculate: "Calculate",
    result: "Result",
  },
  ta: {
    title: "சூத்திரங்கள்",
    find: "கண்டறி",
    valueOf: "வகை",
    area: "பரப்பு",
    perimeter: "சுற்றளவு",
    select: "தேர்ந்தெடு",
    pipe: "குழாய் தயாரிப்பு",
    OD: "வெளி சுற்றளவு",
    calculate: "கணக்கிடு",
    result: "விளைவு",
  },
};

const CONFIG = {
  circle: {
    area: ["radius"],
    perimeter: ["radius"],
  },
  square: {
    area: ["length"],
    perimeter: ["length"],
  },
  rectangle: {
    area: ["length", "breadth"],
    perimeter: ["length", "breadth"],
  },
  od: {
    pipe: ["outerDiameter", "noOfCuts", "angle"],
  },
};

const INPUT_LABELS = {
  en: {
    length: "Length :",
    breadth: "Breadth :",
    radius: "Radius :",
    outerDiameter: "Outer Diameter :",
    noOfCuts: "No of Cuts :",
    angle: "Angle :",
  },
  ta: {
    length: "நீளம்",
    breadth: "அகலம்",
    radius: "அரைவு",
    outerDiameter: "வெளி சுற்றளவு",
    noOfCuts: "வெட்டுகள்",
    angle: "கோணம்",
  },
};

function App() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");
  const [find, setFind] = useState("");
  const [shape, setShape] = useState("");
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

  const calculateResult = () => {
    let res = 0;

    if (shape === "rectangle") {
      const l = Number(values.length);
      const b = Number(values.breadth);

      res = find === "area" ? l * b : 2 * (l + b);
    }

    if (shape === "square") {
      const l = Number(values.length);

      res = find === "area" ? l * l : 4 * l;
    }

    if (shape === "circle") {
      const r = Number(values.radius);

      res = find === "area" ? Math.PI * r * r : 2 * Math.PI * r;
    }

    if (shape === "od") {
      const d = Number(values.outerDiameter);
      const c = Number(values.noOfCuts);
      const a = Number(values.angle);

      res = find === "pipe" ? (d * a) / (2 * 360 * c) : "";
    }

    setResult(res.toFixed(2));
  };

  const requiredFields = CONFIG[shape]?.[find] || [];

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log("Current Theme : ", theme);
  return (
    <div className={`app ${theme}`}>
      <div className="page">
        <div className="card">
          <div className="topline">
            {" "}
            <button
              className="theme"
              onClick={() =>
                setTheme((t) => (theme === "light" ? "dark" : "light"))
              }
            >
              {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
            </button>
            <h1 className="title">{TEXT[lang].title}</h1>
            <button className="lang_conv">
              <TbLanguageHiragana
                onClick={(e) => setLang((e) => (e === "en" ? "ta" : "en"))}
              />
            </button>
          </div>

          <div className="field">
            <label>{TEXT[lang].find}</label>
            <select
              value={find}
              onChange={(e) => {
                setFind(e.target.value);
                setShape("");
                setValues({});
                setResult(null);
              }}
            >
              <option value="">{TEXT[lang].select}</option>
              <option value="area">{TEXT[lang].area}</option>
              <option value="perimeter">{TEXT[lang].perimeter}</option>
              <option value="pipe">{TEXT[lang].pipe}</option>
            </select>
          </div>

          <div className="field">
            <label>{TEXT[lang].valueOf}</label>
            <select
              value={shape}
              disabled={!find}
              onChange={(e) => {
                setShape(e.target.value);
                setValues({});
                setResult(null);
              }}
            >
              <option value="">{TEXT[lang].select}</option>
              {FIND_SHAPES[find]?.map((sh) => (
                <option key={sh} value={sh}>
                  {SHAPE_LABELS[lang][sh]}
                </option>
              ))}
            </select>
          </div>

          {requiredFields.map((field) => (
            <div className="field" key={field}>
              <label>{INPUT_LABELS[lang][field]}</label>
              <input
                type="number"
                name={field}
                value={values[field] || ""}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <button
            className="btn"
            disabled={!requiredFields.length}
            onClick={calculateResult}
          >
            {TEXT[lang].calculate}
          </button>

          <div className="result">{result ? `${result}` : ""}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
