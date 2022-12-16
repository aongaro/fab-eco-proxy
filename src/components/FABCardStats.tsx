import React from "react";
import Life from "../images/life.png";
import Intel from "../images/intel.png";
import Def from "../images/def.png";
import Powr from "../images/atk.png";
import Cst from "../images/cost.png";
import Pitch1 from "../images/pitch-1.png";
import Pitch2 from "../images/pitch-2.png";
import Pitch3 from "../images/pitch-3.png";

export function Power({
  value,
  textRight,
}: {
  value: number;
  textRight?: boolean;
}) {
  return (
    <>
      {textRight && (
        <div className="fab-stat">
          <img src={Powr} className="card-stats-img mr-3x" alt="Power" />
          <span>{value}</span>
        </div>
      )}
      {!textRight && (
        <div className="fab-stat">
          <span>{value}</span>
          <img src={Powr} className="card-stats-img ml-3x" alt="Power" />
        </div>
      )}
    </>
  );
}

export function Intellect({
  value,
  textRight,
}: {
  value: number;
  textRight?: boolean;
}) {
  return (
    <>
      {textRight && (
        <div className="fab-stat">
          <img src={Intel} className="card-stats-img mr-3x" alt="Power" />
          <span>{value}</span>
        </div>
      )}
      {!textRight && (
        <div className="fab-stat">
          <span>{value}</span>
          <img src={Intel} className="card-stats-img ml-3x" alt="Power" />
        </div>
      )}
    </>
  );
}

export function Health({
  value,
  textRight,
}: {
  value: number;
  textRight?: boolean;
}) {
  return (
    <>
      {textRight && (
        <div className="fab-stat">
          <img src={Life} className="card-stats-img mr-3x" alt="Power" />
          <span>{value}</span>
        </div>
      )}
      {!textRight && (
        <div className="fab-stat">
          <span>{value}</span>
          <img src={Life} className="card-stats-img ml-3x" alt="Power" />
        </div>
      )}
    </>
  );
}

export function Defense({
  value,
  textRight,
}: {
  value: number;
  textRight?: boolean;
}) {
  return (
    <>
      {textRight && (
        <div className="fab-stat">
          <img src={Def} className="card-stats-img mr-3x" alt="Power" />
          <span>{value}</span>
        </div>
      )}
      {!textRight && (
        <div className="fab-stat">
          <span>{value}</span>
          <img src={Def} className="card-stats-img ml-3x" alt="Power" />
        </div>
      )}
    </>
  );
}

export function Cost({
  value,
  textRight,
}: {
  value: number;
  textRight?: boolean;
}) {
  return (
    <>
      {textRight && (
        <div className="fab-stat">
          <img src={Cst} className="card-stats-img mr-3x" alt="Power" />
          <span>{value}</span>
        </div>
      )}
      {!textRight && (
        <div className="fab-stat">
          <span>{value}</span>
          <img src={Cst} className="card-stats-img ml-3x" alt="Power" />
        </div>
      )}
    </>
  );
}

export function Pitch({ value }: { value: number }) {
  return (
    <div className="fab-stat">
      {value === 1 && (
        <img src={Pitch1} className="card-stats-img mr-3x" alt="Pitch" />
      )}
      {value === 2 && (
        <img src={Pitch2} className="card-stats-img mr-3x" alt="Pitch" />
      )}
      {value === 3 && (
        <img src={Pitch3} className="card-stats-img mr-3x" alt="Pitch" />
      )}
      <span>{value}</span>
    </div>
  );
}
