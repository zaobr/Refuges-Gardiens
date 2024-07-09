import React from "react";
import { motion } from "framer-motion";

import "../styles/Illustration.css";

import { default as I2 } from "../assets/Illustration2.svg";
import { default as I1 } from "../assets/Illustration1.svg";
import { default as I3 } from "../assets/Illustration3.svg";
import { default as I4 } from "../assets/Illustration4.svg";

const Illustration = () => {
  const SLOW = 44;

  const AVG = 33;

  const FAST = 22;

  return (
    <div className="illustration-outer">
      <motion.div
        className="illustration-inner i4"
        animate={{
          y: SLOW
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <img src={I4} />
      </motion.div>

      <motion.div
        className="illustration-inner i3"
        animate={{
          y: SLOW
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <img src={I3} />
      </motion.div>

      <motion.div
        className="illustration-inner i2"
        animate={{
          y: AVG
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <img src={I2} />
      </motion.div>

      <motion.div
        className="illustration-inner i1"
        animate={{
          y: FAST
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <img src={I1} />
      </motion.div>
    </div>
  );
};

export default Illustration;
