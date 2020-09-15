import React from 'react';
import { motion, Variants } from 'framer-motion';

const Motion: React.FC = ({ children }) => {
  const variants: Variants = {
    initial: {
      opacity: 0,
      x: 0,
    },
    in: {
      opacity: 1,
      x: 0,
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
      style={{ position: 'absolute', width: '100%' }}
    >
      {children}
    </motion.div>
  )
}

export default Motion;
