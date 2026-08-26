// src/utils/calculator.js
export const calculateETFGrowth = ({
  monthlyAmount,      // 每月定期定額金額
  years,              // 投資年限
  expectedReturnRate, // 預期年化報酬率 (例如 0.08 代表 8%)
  expenseRatio        // ETF 內扣費用率 (例如 0.004 代表 0.4%)
}) => {
  const netReturnRate = expectedReturnRate - expenseRatio; 
  const monthlyRate = netReturnRate / 12;
  const totalMonths = years * 12;
  
  let totalPrincipal = 0;
  let totalAsset = 0;
  const historyData = [];

  for (let month = 1; month <= totalMonths; month++) {
    totalPrincipal += monthlyAmount;
    totalAsset = (totalAsset + monthlyAmount) * (1 + monthlyRate);
    
    if (month % 12 === 0) {
      historyData.push({
        year: month / 12,
        principal: Math.round(totalPrincipal),
        asset: Math.round(totalAsset),
        profit: Math.round(totalAsset - totalPrincipal)
      });
    }
  }

  return {
    totalPrincipal: Math.round(totalPrincipal),
    finalAsset: Math.round(totalAsset),
    totalProfit: Math.round(totalAsset - totalPrincipal),
    historyData
  };
};

