// hooks/useSimulationData.js
import { useState, useEffect } from "react";

export default function useSimulationData(userID,username) {

  const [data, setData] = useState(null);
  const [solarPanels, setSolarPanels] = useState([]);
  const [batteries, setBatteries] = useState([]);
  const [load, setLoads] = useState([]);
  const [inverter, setInverter] = useState([]);
  const [time, setTime] = useState({ days: 0, hour: 0, minute: 0, second: 0 });
  const [bankBalance, setBankBalance] = useState(0);
  const [assetsValue, setAssetsValue] = useState(0);
  const [solarEarning, setsolarEarning] = useState(0);
  const [gridPowerInCost, setGridPowerInCost] = useState(0);
  const [loadRevenue, setLoadRevenue] = useState(0);
  const [stats, setStats] = useState({
    totalGridPowerIn:0,solarKWhGenerated: 0, buyingRatePerkWh: 0, sellingRatePerkWh: 0, roi: 0, solarCycle: 0,
    totalSolarPanelPower: 0, totalLoad: 0, maxPowerFromBattery: 0, totalInverterPower: 0,totalPowerAvailableForLoad:0,
    totalPowerFromBattery: 0, totalChargeInBattery: 0, totalBatteryCapacity: 0,
    totalPowerForChargingBatteries: 0, gridPowerIn: 0, powerToSell: 0,
    totalInverterPowerOutput: 0, batteryChargeDischargePower: 0, totalMaxSolarPanelPower: 0
  });

  async function fetchStatus() {
    try {
      if (!userID) return;
      const res = await fetch(`/api/status?userID=${encodeURIComponent(userID)}&username=${username}`);
      if (!res.ok) throw new Error('Failed to fetch status');
      const data = await res.json();
      if(data.sim){
        setSolarPanels(data.sim.solarPanels);
        setBatteries(data.sim.batteries);
        setLoads(data.sim.loads);
        setInverter(data.sim.inverters);
        setData(data);
        setTime(data.sim.time);
        setBankBalance(data.sim.bankBalance);
        setAssetsValue(data.sim.assetsValue);
        setsolarEarning(data.sim.solarEarning);
        setGridPowerInCost(data.sim.gridPowerInCost);
        setLoadRevenue(data.sim.loadRevenue);
        setStats(data.sim.stats);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  useEffect(() => {
    if (!userID) return;
    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);
    return () => clearInterval(interval);
  }, [userID]);

  return {
    data, solarPanels, batteries, load, inverter,
    time, bankBalance, assetsValue, solarEarning,
    gridPowerInCost, loadRevenue, stats, fetchStatus
  };
}
