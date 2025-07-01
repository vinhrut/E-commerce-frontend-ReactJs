import style from "../../About us/style.module.scss";
import { useContext } from "react";
import { AboutUsContext } from "../../../../src/contexts/AboutUsProvider";
import { CiCirclePlus } from "react-icons/ci";

function Question() {
  const { headline, questionContent } = style;
  const { questions } = useContext(AboutUsContext);
  return (
    <>
      {questions.map((item, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <div className={questionContent}>
            <div style={{ cursor: "pointer" }}>{item.question}</div>
            <div>
              <CiCirclePlus style={{ fontSize: "25px", cursor: "pointer" }} />
            </div>
          </div>
          <div style={{ marginTop: "20px" }} className={headline}></div>
        </div>
      ))}
    </>
  );
}

export default Question;
