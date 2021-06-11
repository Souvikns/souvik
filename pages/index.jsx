import React from "react";
import Navbar from "../components/navbar";
import Screens from '../components/screens';
import { SCREEN_PADDING } from '../styleconstants';

export default () => {
  return (
    <div>
      <Navbar />

      <div className={`${SCREEN_PADDING}`}>
        <Screens />
      </div>
    </div>
  );
};
