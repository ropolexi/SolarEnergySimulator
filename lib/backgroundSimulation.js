import { getOrCreateUserSimulation } from '@/lib/simulation';
import { updateSimulation } from '@/lib/simulationEngine'; // Extract logic from your GET handler
import { userSimulation, timeSimulation } from '@/lib/simulationStore';
import { backgroundCheckNFT } from './backgroundCheckNFT';
import { getData } from './dataStore';


const timeInterval = 15 * 60 * 1000;
const time_seconds = 0


async function runBackroundCheckForNFT() {
  backgroundCheckNFT()
  setInterval(() => {
    backgroundCheckNFT()
  }, 60000); 
}

async function runAllSimulations() {
  setInterval(() => {

    timeSimulation.time_seconds += timeInterval / 1000
    timeSimulation.hour = Math.floor(timeSimulation.time_seconds / 3600);
    timeSimulation.minute = Math.floor((timeSimulation.time_seconds % 3600) / 60)
    timeSimulation.second = Math.floor(timeSimulation.time_seconds % 60)

    if ((timeSimulation.time_seconds / 3600) >= 24) {
      timeSimulation.hour = 0
      timeSimulation.minute = 0
      timeSimulation.second = 0
      timeSimulation.days++
      timeSimulation.time_seconds = 0
    }

    for (const userId in userSimulation) {
      const sim = getOrCreateUserSimulation(userId);
      console.log("Background running")
      updateSimulation(sim, time_seconds); // use the extracted update function

    }

  }, 2000);
}

export async function startSimulationLoop() {
  if (typeof window === 'undefined') {
    const data_file= await getData()
    for(const userId in data_file){
      userSimulation[userId]=data_file[userId]
    }
    console.log(data_file)
    runAllSimulations();
    runBackroundCheckForNFT();
    
  }
}
