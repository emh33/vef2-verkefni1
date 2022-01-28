import * as stats from 'simple-statistics';

export function calculate(data) {
  const findMin = data.length > 1 ? stats.min(data) : data[0];
  const findMax = data.length > 1 ? stats.max(data) : data[0];
  const findVariance = data.length > 1 ? Number(stats.variance(data).toFixed(3)): 0;
  const findMean = data.length > 1 ? stats.mean(data).toFixed(3) : data[0];
  const findMeadian = data.length > 1 ? stats.median(data): data[0];
  const findStd = data.length > 1 ? Number(stats.standardDeviation(data).toFixed(3)): 0;
  const findSum = data.length > 1 ? stats.sum(data) : data[0];
  const findRange = Math.abs(findMin-findMax);

  return {
   Frávik: findVariance,
   'Hæsta gild':findMax,
   Meðaltal:findMean,
   Miðgildi:findMeadian,
   'Minnsta gildi':findMin,
   Staðalfrávik:findStd,
   Summa:findSum,
   Svið:findRange,
  }
 }


