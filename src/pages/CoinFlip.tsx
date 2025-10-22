import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2, VolumeX, Share2, Info, RotateCw, Shuffle, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import CoinDisplay from '@/components/coin/CoinDisplay';

const PHRASES = {
  fortune: [
    "Tu calma abre caminos bajo el agua",
    "La fortuna nada hacia ti con gracia",
    "Hoy el universo susurra tu nombre",
    "Las estrellas se alinean en tu favor",
    "Tu energía atrae bendiciones",
    "El ajolote te guía hacia la abundancia",
    "Las aguas claras revelan oportunidades",
    "Tu paciencia será recompensada",
    "Hoy es tu día de brillar",
    "La suerte fluye como corriente a tu lado",
    "Confía: el camino se ilumina",
    "Tu sonrisa abre puertas doradas",
    "El destino te sonríe desde las profundidades",
    "Hoy cosecharás lo que sembraste",
    "La magia está de tu lado",
    "Tu corazón conoce el camino correcto",
    "Las coincidencias son guiños del universo",
    "Hoy recibirás noticias que alegrarán tu alma",
    "Tu luz interior ilumina todo a tu paso",
    "El ajolote ancestral te bendice"
  ],
  reflection: [
    "Paciencia: lo bueno se cocina lento",
    "Respira hondo, la tormenta pasará",
    "A veces no hacer nada es hacer mucho",
    "Tu fortaleza está en tu quietud",
    "Las aguas tranquilas esconden tesoros",
    "Confía en el proceso de la vida",
    "El silencio también es una respuesta",
    "Date tiempo para regenerarte",
    "No todo requiere una respuesta inmediata",
    "Tu intuición te guiará cuando estés listo",
    "Aprende del ajolote: la calma es poder",
    "Observa más, juzga menos",
    "El universo tiene su propio ritmo",
    "Hoy es día de cuidarte a ti mismo",
    "La respuesta llegará en su momento",
    "Permítete sentir sin apresurarte",
    "Tu luz no se apaga por descansar",
    "Las raíces profundas crecen en silencio",
    "Confía en tu capacidad de adaptarte",
    "El ajolote te invita a la introspección"
  ]
} as const;

export default function CoinFlip() {
  const navigate = useNavigate();
  const [isFlipping, setIsFlipping] = useState(false);
  const [showAjolote, setShowAjolote] = useState(true);
  const [result, setResult] = useState<null | 'fortune' | 'reflection'>(null);
  const [phrase, setPhrase] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) setSoundEnabled(savedSound === 'true');
  }, []);

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    const currentStreak = parseInt(localStorage.getItem('streak') || '0', 10);
    if (lastVisit === today) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    localStorage.setItem('streak', (lastVisit === y.toDateString() ? currentStreak + 1 : 1).toString());
    localStorage.setItem('lastVisit', today);
  };

  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.value = 820;
      const t = ctx.currentTime;
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.005, t + 0.28);
      osc.start(t); osc.stop(t + 0.3);
    } catch {/* noop */}
  };

  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) navigator.vibrate(pattern as any);
  };

  const flipManual = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);
    setPhrase('');
    playSound();
    vibrate(40);
    setTimeout(() => {
      setShowAjolote(prev => !prev);
      setIsFlipping(false);
    }, 600);
  };

  const doVolado = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);
    setPhrase('');
    updateStreak();
    playSound();
    vibrate(40);

    setTimeout(() => {
      const isAjolote = Math.random() < 0.5;
      const category: 'fortune' | 'reflection' = isAjolote ? 'fortune' : 'reflection';
      const pool = PHRASES[category];
      const randomPhrase = pool[Math.floor(Math.random() * pool.length)];
      setShowAjolote(isAjolote);
      setResult(category);
      setPhrase(randomPhrase);
      setIsFlipping(false);
      vibrate([20, 40, 20]);
    }, 1500);
  };

  const shareResult = async () => {
    const text = `${result === 'fortune' ? '🦎 Fortuna' : '🦅 Reflexión'}: "${phrase}" #LaSuerteDelAjolote`;
    if ((navigator as any).share) {
      try { await (navigator as any).share({ text }); return; } catch {/* cancelled */}
    }
    try { await navigator.clipboard.writeText(text); alert('¡Copiado al portapapeles!'); }
    catch { alert(text); }
  };

  const toggleSound = () => {
    const nv = !soundEnabled;
    setSoundEnabled(nv);
    localStorage.setItem('soundEnabled', String(nv));
  };

  const isAjolote = result === 'fortune';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-teal-700 text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="text-2xl"
            >
              🦎
            </motion.div>
            <h1 className="text-xl font-bold">La Suerte del Ajolote</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={toggleSound} className="text-white hover:bg-teal-600" aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}>
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate(createPageUrl('CoinDetails'))} className="text-white hover:bg-teal-600" aria-label="Detalles del volado">
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <CoinDisplay isFlipping={isFlipping} showAjolote={showAjolote} />

        <AnimatePresence mode="wait">
          {result && !isFlipping && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-8 max-w-md w-full px-4">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl">{isAjolote ? '🦎' : '🦅'}</span>
                  <h2 className={`text-2xl font-bold ${isAjolote ? 'text-amber-600' : 'text-teal-700'}`}>
                    {isAjolote ? '¡Fortuna!' : '¡Reflexión!'}
                  </h2>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className={`rounded-2xl p-5 mb-4 shadow-lg ${isAjolote ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200' : 'bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200'}`}>
                <p className="text-center text-base text-gray-800 leading-relaxed italic">"{phrase}"</p>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Button onClick={shareResult} className={`w-full ${isAjolote ? 'bg-amber-600 hover:bg-amber-700' : 'bg-teal-600 hover:bg-teal-700'} text-white font-bold py-5 rounded-full shadow-lg`}>
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartir resultado
                </Button>
              </motion.div>

              {isAjolote && (
                <motion.div className="flex justify-center gap-3 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i} animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom */}
      <div className="pb-8 px-6">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          <Button onClick={flipManual} disabled={isFlipping} size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-full shadow-lg flex items-center justify-center gap-2">
            <RotateCw className="w-5 h-5" />
            Dar la vuelta
          </Button>
          <Button onClick={doVolado} disabled={isFlipping} size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-full shadow-lg flex items-center justify-center gap-2">
            <Shuffle className="w-5 h-5" />
            Volado
          </Button>
        </div>
      </div>
    </div>
  );
}
