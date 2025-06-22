import { getTotalGridPowerIn } from '@/lib/simulation';
import {timeSimulation} from '@/lib/simulationStore';

const timeInterval = 15 * 60 * 1000
const chargingFactor = 0.5
const loadProductionRevenuePerkWPerHour = 0.46
const gridBaseGeneratorPower = 1000000

const safeDivide = (numerator, denominator) => {
  return denominator !== 0 ? numerator / denominator : 0;
};

export async function updateSimulation(sim1) {
    const sim = sim1
    
    sim.time.hour = timeSimulation.hour
    sim.time.minute = timeSimulation.minute
    sim.time.second = timeSimulation.second
    sim.time.days = timeSimulation.days
    sim.time_seconds = timeSimulation.time_seconds
    
    //Sun simulate
    sim.stats.solarCycle = Math.sin((Math.PI / 12) * ((timeSimulation.time_seconds / 3600) - 6))

    //Salery
    sim.bankBalance += (sim.salery / (30 * 24 * 3600)) * (timeInterval / 1000)

    //Solar Panel power output
    sim.stats.totalSolarPanelPower = 0
    sim.stats.totalMaxSolarPanelPower = 0
    sim.solarPanels.forEach(panel => {
        panel.power = sim.stats.solarCycle > 0 ? sim.stats.solarCycle * panel.maxPower : 0
        sim.stats.totalSolarPanelPower += panel.power
        sim.stats.totalMaxSolarPanelPower += panel.maxPower
    })

    sim.stats.totalLoad = 0
    sim.loads.forEach(load => {
        sim.stats.totalLoad += load.switch ? load.power : 0
        const value = load.switch ? loadProductionRevenuePerkWPerHour * (load.power / 1000) * (timeInterval / (3600 * 1000)) : 0
        sim.loadRevenue += value
        sim.stats.totalUnresetLoadEarnings += value
    })


    //check battery max power can draw for time interval
    sim.stats.maxPowerFromBattery = 0
    sim.stats.totalChargeInBattery = 0
    sim.stats.totalBatteryCapacity = 0

    sim.batteries.forEach(battery => {
        sim.stats.totalChargeInBattery += battery.charge
        sim.stats.totalBatteryCapacity += battery.capacity
    })

    sim.stats.maxPowerFromBattery = sim.stats.totalChargeInBattery / (timeInterval / (3600 * 1000))

    //Hybrid Inverter method
    //get total inverter power capable
    sim.stats.totalInverterPower = 0

    sim.inverters.forEach((inverter => {
        sim.stats.totalInverterPower += inverter.maxPower
    }))

    sim.stats.totalPowerForChargingBatteries = 0
    sim.stats.powerToSell = 0
    sim.stats.gridPowerIn = 0
    sim.stats.batteryChargeDischargePower = 0
    sim.stats.totalGridPowerIn = gridBaseGeneratorPower - getTotalGridPowerIn()

    if (sim.stats.totalInverterPower > sim.stats.totalLoad && (sim.stats.totalSolarPanelPower + sim.stats.maxPowerFromBattery) > sim.stats.totalLoad) {

        if (sim.stats.totalSolarPanelPower > sim.stats.totalLoad) {//sun light is more than enough to power the load
            let res = ((sim.stats.totalBatteryCapacity - sim.stats.totalChargeInBattery) * chargingFactor) / (timeInterval / (3600 * 1000))
            let requiredBatteryChargingPower = res > 0 ? res : 0

            console.log("requiredBatteryChargingPower:" + requiredBatteryChargingPower)
            let remainingPowerAfterLoad = sim.stats.totalSolarPanelPower - sim.stats.totalLoad
            sim.stats.totalPowerForChargingBatteries = requiredBatteryChargingPower > remainingPowerAfterLoad ? remainingPowerAfterLoad : requiredBatteryChargingPower

            sim.batteries.forEach(battery => {
                battery.charge += sim.stats.totalPowerForChargingBatteries * (timeInterval / (3600 * 1000)) * safeDivide((battery.capacity - battery.charge) ,(sim.stats.totalBatteryCapacity - sim.stats.totalChargeInBattery))
            })
            sim.stats.batteryChargeDischargePower = sim.stats.totalPowerForChargingBatteries

            //find excess power for the grid
            let remainingPowerAfterCharging = remainingPowerAfterLoad - sim.stats.totalPowerForChargingBatteries

            sim.stats.powerToSell = remainingPowerAfterCharging > (sim.stats.totalInverterPower - sim.stats.totalLoad) ? (sim.stats.totalInverterPower - sim.stats.totalLoad) : remainingPowerAfterCharging
            sim.stats.gridPowerIn = -sim.stats.powerToSell
            const value = sim.stats.sellingRatePerkWh * (sim.stats.powerToSell / 1000) * (timeInterval / (3600 * 1000))
            sim.solarEarning += value
            sim.stats.totalUnresetSolarEarnings += value
            sim.inverters.forEach(inverter => {
                inverter.power = (sim.stats.powerToSell + sim.stats.totalLoad) / sim.inverters.length
            })
            sim.stats.solarKWhGenerated += ((sim.stats.powerToSell + sim.stats.totalLoad) / 1000) * (timeInterval / (3600 * 1000))
            sim.stats.totalPowerAvailableForLoad = sim.stats.totalLoad
            sim.stats.totalGridPowerIn = gridBaseGeneratorPower - getTotalGridPowerIn()

        } else if (sim.stats.totalSolarPanelPower + sim.stats.maxPowerFromBattery > sim.stats.totalLoad) {//sun light + battery power is enough to power the load
            //can not charge battery, battery draining
            let batteryPowerRequired = sim.stats.totalLoad - sim.stats.totalSolarPanelPower
            let batteryChargeRequired = batteryPowerRequired * (timeInterval / (3600 * 1000))
            sim.batteries.forEach(battery => {
                battery.charge -= batteryChargeRequired * safeDivide(battery.charge , sim.stats.totalChargeInBattery)
            })
            sim.stats.batteryChargeDischargePower = -batteryPowerRequired
            sim.inverters.forEach(inverter => {
                inverter.power = (sim.stats.totalSolarPanelPower + batteryPowerRequired) / sim.inverters.length
            })
            sim.stats.solarKWhGenerated += ((sim.stats.totalSolarPanelPower + batteryPowerRequired) / 1000) * (timeInterval / (3600 * 1000))

            sim.stats.totalPowerFromBattery = batteryPowerRequired
            sim.stats.totalPowerAvailableForLoad = sim.stats.totalSolarPanelPower + batteryPowerRequired
        }


    } else {
        //hybrid inverter total can not provid enough power to the load , then switch to pass through mode from grid power direct
        if (sim.stats.totalGridPowerIn >= sim.stats.totalLoad) {//if grid has enough power
            sim.stats.gridPowerIn = sim.stats.totalLoad
            const value = sim.stats.buyingRatePerkWh * (sim.stats.totalLoad / 1000) * (timeInterval / (3600 * 1000))
            sim.gridPowerInCost += value
            sim.stats.totalUnresetgridPowerInCost += value
            sim.stats.totalPowerAvailableForLoad = sim.stats.totalLoad
            sim.stats.totalGridPowerIn = gridBaseGeneratorPower - getTotalGridPowerIn()
        } else {
            sim.stats.totalPowerAvailableForLoad = 0
        }
        //inverter bypassing
        sim.inverters.forEach(inverter => {
            inverter.power = 0
        })
    }


    //to reflect switch status with power on realtime effect
    for (let i = 0; i < sim.loads.length; i++) {
        if (sim.stats.totalPowerAvailableForLoad >= sim.stats.totalLoad) {
            sim.loads[i].on = sim.loads[i].switch
        } else {
            sim.loads[i].on = false
        }
    }

    sim.stats.roi = 0
    sim.stats.roi = (((sim.time.days * 24 + sim.time.hour) / (sim.stats.totalUnresetSolarEarnings + sim.stats.totalUnresetLoadEarnings - sim.stats.totalUnresetgridPowerInCost)) * sim.assetsValue) / 24
    sim.stats.roi = sim.stats.roi > 0 ? sim.stats.roi.toFixed(0) : 0

    console.log("Calculation done.")

}