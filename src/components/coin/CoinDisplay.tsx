import * as React from 'react';
import { motion } from 'framer-motion';

export default function CoinDisplay({ isFlipping, showAjolote, flipDurationMs = 1500 }:{
  isFlipping: boolean; showAjolote: boolean; flipDurationMs?: number;
}) {
  return (
    <motion.div
      className="w-40 h-40 rounded-full flex items-center justify-center text-5xl select-none shadow-xl bg-white"
      animate={{ rotateY: isFlipping ? 1800 : 0 }}
      transition={{ duration: flipDurationMs / 1000, ease: 'easeInOut' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <span aria-hidden>{showAjolote ? '🦎' : '🦅'}</span>
    </motion.div>
  );
}
