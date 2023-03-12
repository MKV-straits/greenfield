import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function Fields(props) {
  let count = 0;
  const fortify = () => {};
  const displayField = (x) => {
    count++;
    return (
      <div>
        <button
          onClick={fortify}
          className="fortify bg-yellow-900 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded shadow"
        >
          fortify ($100)
        </button>
        <FontAwesomeIcon
          key={count}
          className="field fa fa-camera-retro fa-3x fa-border"
          icon={faSquare}
        ></FontAwesomeIcon>
      </div>
    );
  };
  return (
    <>
      <div>{props.fields.map((field) => displayField(field))}</div>
    </>
  );
}

export default Fields;
