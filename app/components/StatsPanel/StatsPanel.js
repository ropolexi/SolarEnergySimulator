// components/StatsPanel/StatsPanel.js
import React from "react";

export default function StatsPanel({
  stats,
  assetsValue,
  solarEarning,
  gridPowerInCost,
  loadRevenue,
  bankBalance,
  onTransferSolar,
  onPayBill,
  onTransferLoadRevenue,
}) {
  const totalBalance = bankBalance + solarEarning - gridPowerInCost + loadRevenue;

  return (
    <>
      <div className="stats-bar">
        <div className="stat-box">Electricity Selling Rate/kWh: ${stats.sellingRatePerkWh}</div>
        <div className="stat-box">Electricity Bying Rate/kWh: ${stats.buyingRatePerkWh}</div>
        <div className="stat-box">
          Electricity Units Generated: {stats.solarKWhGenerated === null ? 0 : stats.solarKWhGenerated.toFixed(0)} kWh
        </div>
        {/* <div className="stat-box">Assets: ${assetsValue.toFixed(2)}</div> */}
        <div className="stat-box">Solar Earning: ${solarEarning.toFixed(2)}</div>
        <div className="stat-box">Electricity Cost: ${gridPowerInCost.toFixed(2)}</div>
        <div className="stat-box">Load Revenue: ${loadRevenue.toFixed(2)}</div>
        <div className="stat-box">Bank: ${bankBalance.toFixed(2)}</div>
        {/* <div className="stat-box">ROI Period: {stats.roi} Days</div> */}
      </div>

      <div className="total">
        <h2>Total Balance: ${totalBalance.toFixed(2)}</h2>
      </div>

      <div className="button-row">
        <button onClick={onTransferSolar}>Solar Earnings {'>>'} Bank</button>
        <button onClick={onPayBill}>Pay Electricity Bill</button>
        <button onClick={onTransferLoadRevenue}>Load Revenue {'>>'} Bank</button>
      </div>
    </>
  );
}
