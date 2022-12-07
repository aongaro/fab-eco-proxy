import React from "react";

export default function FunctionalText(props) {
  return (
    <>
      {props.text.map((ck, i) => (
        <div style={{ fontSize: 10, padding: 2 }} key={i}>
          {ck.map((chunk, i) => {
            if (chunk.strong)
              return (
                <span key={`ck-${i}`}>
                  <strong>{chunk.text} </strong>
                </span>
              );
            if (chunk.italic)
              return (
                <span key={`ck-${i}`}>
                  <i>{chunk.text} </i>
                </span>
              );
            return <span key={`ck-${i}`}>{chunk.text} </span>;
          })}
        </div>
      ))}
    </>
  );
}
