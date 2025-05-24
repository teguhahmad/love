import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { calculateLovePercentage } from '../utils/calculator';
import { ResultMessage } from './ResultMessage';

export const LoveCalculator: React.FC = () => {
  const [maleName, setMaleName] = useState('');
  const [femaleName, setFemaleName] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  const maleInputRef = useRef<HTMLInputElement>(null);
  const femaleInputRef = useRef<HTMLInputElement>(null);
  const calculateButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus the first input field when component mounts
    maleInputRef.current?.focus();
  }, []);

  const handleMaleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaleName(e.target.value);
    setError('');
  };

  const handleFemaleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFemaleName(e.target.value);
    setError('');
  };

  const handleMaleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && maleName.trim()) {
      e.preventDefault();
      femaleInputRef.current?.focus();
    }
  };

  const handleFemaleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && maleName.trim() && femaleName.trim()) {
      e.preventDefault();
      handleCalculate();
    }
  };

  const handleCalculate = () => {
    if (!maleName.trim() || !femaleName.trim()) {
      setError('Silakan masukkan kedua nama untuk menghitung kecocokan');
      return;
    }
    
    setError('');
    setIsCalculating(true);
    
    setTimeout(() => {
      const percentage = calculateLovePercentage(maleName, femaleName);
      setResult(percentage);
      setIsCalculating(false);
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
    setMaleName('');
    setFemaleName('');
    setError('');
    // Focus the first input field after reset
    setTimeout(() => {
      maleInputRef.current?.focus();
    }, 0);
  };

  return (
    <motion.div
      className="glass rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Heart size={40} className="text-primary-500 fill-primary-500" />
          </motion.div>
          <h1 className="text-3xl font-script ml-3 text-primary-700 font-bold">
            Kalkulator Cinta
          </h1>
        </div>
        
        {result === null ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="maleName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Dia
                </label>
                <input
                  ref={maleInputRef}
                  type="text"
                  id="maleName"
                  value={maleName}
                  onChange={handleMaleNameChange}
                  onKeyDown={handleMaleKeyDown}
                  placeholder="Masukkan nama dia"
                  className="input-field"
                  aria-label="Input nama pria"
                />
              </div>
              
              <div>
                <label htmlFor="femaleName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Kamu
                </label>
                <input
                  ref={femaleInputRef}
                  type="text"
                  id="femaleName"
                  value={femaleName}
                  onChange={handleFemaleNameChange}
                  onKeyDown={handleFemaleKeyDown}
                  placeholder="Masukkan nama kamu"
                  className="input-field"
                  aria-label="Input nama wanita"
                />
              </div>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm text-center" role="alert">{error}</p>
            )}
            
            <motion.button
              ref={calculateButtonRef}
              onClick={handleCalculate}
              className="calculate-btn group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isCalculating}
              aria-label="Hitung kecocokan"
            >
              {isCalculating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menghitung...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Hitung Kecocokan
                  <Heart className="ml-2 group-hover:animate-pulse" size={20} />
                </span>
              )}
            </motion.button>
          </div>
        ) : (
          <CompatibilityResult
            maleName={maleName}
            femaleName={femaleName}
            percentage={result}
            onReset={handleReset}
          />
        )}
      </div>
    </motion.div>
  );
};

interface CompatibilityResultProps {
  maleName: string;
  femaleName: string;
  percentage: number;
  onReset: () => void;
}

const CompatibilityResult: React.FC<CompatibilityResultProps> = ({
  maleName,
  femaleName,
  percentage,
  onReset
}) => {
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    resetButtonRef.current?.focus();
  }, []);

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-script text-primary-700 mb-1">
          {maleName} & {femaleName}
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <Heart className="text-primary-500 fill-primary-500" size={20} />
          <p className="text-gray-600">Hasil Kecocokan Cinta</p>
          <Heart className="text-primary-500 fill-primary-500" size={20} />
        </div>
      </div>
      
      <div className="flex justify-center">
        <motion.div 
          className="relative w-40 h-40 flex items-center justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            delay: 0.2,
            duration: 0.8
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full absolute">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f2f2f2"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ec4899"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: percentage / 100 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              strokeDasharray="283"
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="text-center z-10">
            <motion.div
              className="font-bold text-4xl text-primary-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {percentage}%
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <ResultMessage percentage={percentage} />
      
      <motion.button
        ref={resetButtonRef}
        onClick={onReset}
        className="w-full py-2 px-4 rounded-full bg-white text-primary-600 font-medium border border-primary-300 shadow-sm hover:shadow-md transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Coba pasangan lain"
      >
        Coba Pasangan Lain
      </motion.button>
    </motion.div>
  );
};