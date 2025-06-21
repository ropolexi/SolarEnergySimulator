// components/SystemOverview/SystemOverview.js

import React from "react";

export function Solar({ power }) {
  return (
    <div className="box solar">
      <h3>☀️ Solar</h3>
      <p>{power > 1000 ? (power / 1000).toFixed(1) + "kW" : power + "W"}</p>
    </div>
  );
}

export function Inverter({ power }) {
  return (
    <div className="box inverter">
      <h3>🔄 Inverter</h3>
      <p>{power > 1000 ? (power / 1000).toFixed(1) + "kW" : power + "W"}</p>
    </div>
  );
}

export function Battery({ charge, power, capacity }) {
  return (
    <div className="box battery">
      <h3>🔋 Battery</h3>
      <p>Capacity: {capacity > 1000 ? (capacity / 1000).toFixed(0) + "kWh" : capacity.toFixed(0) + "Wh"}</p>
      <p>Level: {isNaN(charge) ? 0 : (charge * 100).toFixed(0)}%</p>
      <p>
        {power >= 0 ? "Charging" : "Discharging"}:{" "}
        {Math.abs(power) > 1000
          ? (Math.abs(power) / 1000).toFixed(1) + "kW"
          : Math.abs(power).toFixed(0) + "W"}
      </p>
    </div>
  );
}

export function Load({ power }) {
  return (
    <div className="box load">
      <h3>💡 Load</h3>
      <p>{power > 1000 ? (power / 1000).toFixed(1) + "kW" : power + "W"}</p>
    </div>
  );
}

export function Grid({ power,totalGridPower }) {
  return (
    <div className="box grid">
      <h3>⚡ Grid</h3>
      <p>Total Grid Power: {totalGridPower>1000?(totalGridPower/1000).toFixed(1)+"kW":totalGridPower.toFixed(0)+"W"}</p>
      <p>
        {power > 0 ? "IN" : "OUT"}:{" "}
        {Math.abs(power) > 1000
          ? (Math.abs(power) / 1000).toFixed(1) + "kW"
          : Math.abs(power).toFixed(0) + "W"}
      </p>
    </div>
  );
}

export default function SystemOverview({ stats }) {
  return (
    <div>
      <h1>System Overview</h1>
      <div className="diagram">
        <div className="row">
          <Grid power={stats.gridPowerIn} totalGridPower={stats.totalGridPowerIn} />
        </div>
        <div className="arrow">↕</div>

        <div className="row">
          <Solar power={stats.totalMaxSolarPanelPower} />
          <div className="arrowWithLabel">
            <div className="arrow">➡</div>
            <div className="arrowLabel">
              {stats.totalSolarPanelPower > 1000
                ? (stats.totalSolarPanelPower / 1000).toFixed(1) + "kW"
                : stats.totalSolarPanelPower.toFixed(0) + "W"}
            </div>
          </div>
          <Inverter power={stats.totalInverterPower} />
          <div className="arrowWithLabel">
            <div className="arrow">➡</div>
            <div className="arrowLabel">
              {stats.totalPowerAvailableForLoad > 1000
                ? (stats.totalPowerAvailableForLoad / 1000).toFixed(1) + "kW"
                : stats.totalPowerAvailableForLoad.toFixed(0) + "W"}
            </div>
          </div>
          <Load power={stats.totalLoad} />
        </div>

        <div className="arrow">↕</div>

        <div className="row">
          <Battery
            charge={
              stats.totalBatteryCapacity === 0
                ? 0
                : stats.totalChargeInBattery / stats.totalBatteryCapacity
            }
            power={stats.batteryChargeDischargePower}
            capacity={stats.totalBatteryCapacity}
          />
        </div>
      </div>
    </div>
  );
}
