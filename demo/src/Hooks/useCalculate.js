import { useState } from 'react';

const useCalculate = () => {
  const calculateExperience = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years}Y ${months}M`;
  };

  return calculateExperience;
};

export default useCalculate;
