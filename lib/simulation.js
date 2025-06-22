// 'use server'
import { userSimulation } from '@/lib/simulationStore';

function getTotalGridPowerIn() {
  let totalGridPowerIn = 0;

  for (const userId in userSimulation) {
    if (Object.prototype.hasOwnProperty.call(userSimulation, userId)) {
      const userSim = userSimulation[userId];
      if (userSim.stats && typeof userSim.stats.gridPowerIn === 'number') {
        totalGridPowerIn += userSim.stats.gridPowerIn;
      }
    }
  }

  return totalGridPowerIn;
}
function getOrCreateUserSimulation(userId) {
  if (!userSimulation[userId]) {
    userSimulation[userId] = {
      time_seconds: 3600 * 10,
      time: { days: 0, hour: 0, minute: 0, second: 0 },
      lastUpdateTime: 0,
      solarPanels: [],
      batteries: [],
      loads: [],
      inverters: [],
      nextSolarPanelId: 1,
      nextBatteryId: 1,
      nextLoadId: 1,
      nextInverterId: 1,
      salery: 0,
      bankBalance: 0,
      assetsValue: 0,
      solarEarning: 0,
      gridPowerInCost: 0,
      loadRevenue: 0,
      stats: { totalGridPowerIn: 0, solarKWhGenerated: 0, solarCycle: 0, totalSolarPanelPower: 0, totalLoad: 0, maxPowerFromBattery: 0, totalInverterPower: 0, totalPowerAvailableForLoad: 0, totalPowerFromBattery: 0, totalChargeInBattery: 0, totalBatteryCapacity: 0, totalPowerForChargingBatteries: 0, gridPowerIn: 0, powerToSell: 0, batteryChargeDischargePower: 0, totalMaxSolarPanelPower: 0, roi: 0, totalUnresetSolarEarnings: 0, totalUnresetLoadEarnings: 0, totalUnresetgridPowerInCost: 0, buyingRatePerkWh: 0.23, sellingRatePerkWh: 0.1 }
    };
  }
  return userSimulation[userId];
}


export { getOrCreateUserSimulation, getTotalGridPowerIn };