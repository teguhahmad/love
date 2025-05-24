import React from 'react';
import { motion } from 'framer-motion';

interface ResultMessageProps {
  percentage: number;
}

export const ResultMessage: React.FC<ResultMessageProps> = ({ percentage }) => {
  const getMessage = (score: number) => {
    if (score < 20) {
      return "Hmm, mungkin lebih baik berteman saja? Bintang-bintang belum berpihak pada pasangan ini.";
    } else if (score < 40) {
      return "Ada potensi, tapi kalian perlu bekerja keras untuk mengatasi perbedaan.";
    } else if (score < 60) {
      return "Kecocokan yang cukup baik! Dengan sedikit usaha, hubungan ini bisa berkembang.";
    } else if (score < 80) {
      return "Kecocokan yang sangat baik! Kalian memiliki dasar yang kuat untuk cinta.";
    } else {
      return "Kecocokan luar biasa! Kalian ditakdirkan untuk bersama!";
    }
  };
  
  const getEmoji = (score: number) => {
    if (score < 20) return "😐";
    if (score < 40) return "🙂";
    if (score < 60) return "😊";
    if (score < 80) return "😍";
    return "❤️";
  };

  return (
    <motion.div 
      className="bg-white/80 rounded-xl p-4 shadow-sm text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.5 }}
    >
      <div className="text-2xl mb-2">{getEmoji(percentage)}</div>
      <p className="text-gray-700">{getMessage(percentage)}</p>
    </motion.div>
  );
};