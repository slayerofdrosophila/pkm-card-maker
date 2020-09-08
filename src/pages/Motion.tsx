import React from 'react';
import { motion, Variants } from 'framer-motion';

const Motion: React.FC = ({ children }) => {
  const variant: Variants = {
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
      x: '100vw',
    },
  };

  const transition = {
    duration: .5,
    type: 'tween',
    ease: 'easeInOut'
  }

  return (
    <motion.div initial='initial' animate='in' exit='out' variants={variant} transition={transition}>
      {children}
    </motion.div>
  )
}

export default Motion;
