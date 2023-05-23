import React from "react";
import * as style from "../styles/loadingcomp.module.css";

export default function Loader() {
  return (
    <div className={style.loaderContainer}>
      <div className={style.ldsDualRing} />
    </div>
  );
}
