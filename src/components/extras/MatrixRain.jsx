import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Play, Pause, X, Terminal } from 'lucide-react';

export default function MatrixRain({ onClose }) {
  const canvasRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters: Katakana, Latin, Numbers, Code tokens
    const characters = 'アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロヲ0123456789ABCDEF{}<>=/*+-~$';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 9, 14, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head glyph is slightly brighter
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = '#00ff66';
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      if (!isPaused) {
        animationFrameId.current = requestAnimationFrame(draw);
      }
    };

    if (!isPaused) {
      animationFrameId.current = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPaused]);

  // Keyboard shortcut listener for space (pause) and Esc (close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused((p) => !p);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Matrix Rain Easter Egg"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Control Banner */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 glass-panel px-5 py-2.5 rounded-full border border-emerald-500/50 flex items-center gap-4 text-xs font-mono text-emerald-400 shadow-glow-md bg-black/80">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">KONAMI_CODE_UNLOCKED: MATRIX_OVERRIDE</span>
        </div>

        <div className="h-4 w-px bg-emerald-500/30" />

        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
          aria-label={isPaused ? 'Resume Matrix Animation' : 'Pause Matrix Animation'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          <span>{isPaused ? 'Resume' : 'Pause (Space)'}</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1 hover:text-red-400 transition-colors ml-2"
          aria-label="Exit Matrix rain"
        >
          <X className="w-4 h-4" />
          <span>Exit (Esc)</span>
        </button>
      </div>
    </div>
  );
}

MatrixRain.propTypes = {
  onClose: PropTypes.func.isRequired,
};

