import React from 'react';
import { motion, Variants } from 'framer-motion';

const Motion: React.FC = ({ children }) => {
  const variants: Variants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
      x: '70vw',
    },
  };

  const transition = {
    duration: .5,
  }

  return (
    <motion.div
      initial='initial'
      animate='in'
      exit='out'
      transition={transition}
      variants={variants}
      style={{ position: 'absolute' }}
    >
      {children}
    </motion.div>
  )
}

export default Motion;
