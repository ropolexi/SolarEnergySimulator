"use server";
import { getUserNftBalance } from '@/app/actions/getUserNftBalance';
import { userSimulation } from './simulationStore';
import { setData } from './dataStore';
import { getAssetImage } from '@/app/actions/getAssetImage';
import { owner_id } from '@/config/header';
import { NFTArray } from '@/config/header';
// const solarNFTPostHashHex = "97f6b40eb36ca8d2e0cb7cc3f0eeeaac2abcc3a268bc614019af53784203a4cf";
// const batteryNFTPostHashHex = "b744282de02397fb367d5d563e8cd3321f4c90b5f859a2678da59004756b6f7f";
// const batteryLargeNFTPostHashHex = "8602b14ccdb06d74269ddfa3c4ec763dc12550669dd947a4976e2ae3a4ebca91"
// const loadNFTPostHashHex = "18f5bc9a8b3c09f4f03570839a07c652259c9cb08084067dac82c12cc0d12e5f";
// const inverterNFTPostHashHex = "77cfde3d0b19de93a29d9e178554896f5e42559ad7e577b236cd955db5a89e7b";

//const simulationDataPostHash="ec06f52b3a3e5478eb35d225554e520c4a40bc6d126306576ae19dca05707818"
var first=true
const imageURLs={}

export async function updateImagesURL(){
    if(first){
        first=false
        for (const NFTPostHashHex of NFTArray) {
            imageURLs[NFTPostHashHex] = await getAssetImage(NFTPostHashHex)
        }
        console.log(imageURLs)
    }
}

export async function backgroundCheckNFT() {
    console.log(NFTArray)
    for (const userId in userSimulation) {
        console.log("UserID:" + userId)
        if (userId==owner_id){
            continue
        }
        for (const NFTPostHashHex of NFTArray) {
            console.log("Checking NFT:"+NFTPostHashHex)
            const { count, extraData } = await getUserNftBalance(userId, NFTPostHashHex);
            console.log("User has " + count + " ,ExtraData:" + extraData)
            if (!extraData ) continue
            if (extraData.Type == "solar-panel") {
                console.log("Solar panel")
                const current_count = userSimulation[userId].solarPanels.filter((entry) => entry.maxPower == extraData.maxPower).length
                if (count > current_count) {
                    for (const i = 0; i < count - current_count; i++) {
                        const newId = userSimulation[userId].nextSolarPanelId++
                        userSimulation[userId].solarPanels.push({ id: newId, maxPower: parseInt(extraData.maxPower), power: 0,imageURL:imageURLs[NFTPostHashHex] })
                    }
                } else if (count < current_count) {
                    for (const i = 0; i < current_count - count; i++) {
                        userSimulation[userId].solarPanels.splice(i, 1)
                    }
                }
            } else if (extraData.Type == "battery") {
                console.log("Battery")
                const current_count = userSimulation[userId].batteries.filter((entry) => entry.capacity == extraData.capacity).length
                if (count > current_count) {
                    for (const i = 0; i < count - current_count; i++) {
                        const newId = userSimulation[userId].nextBatteryId++
                        userSimulation[userId].batteries.push({ id: newId, capacity: parseInt(extraData.capacity), charge: parseInt(extraData.capacity) / 2,imageURL:imageURLs[NFTPostHashHex] })
                    }
                } else if (count < current_count) {
                    for (const i = 0; i < current_count - count; i++) {
                        userSimulation[userId].batteries.splice(i, 1)
                    }
                }
            } else if (extraData.Type == "inverter") {
                console.log("Inverter")
                const current_count = userSimulation[userId].inverters.filter((entry) => entry.maxPower == extraData.maxPower).length
                if (count > current_count) {
                    for (const i = 0; i < count - current_count; i++) {
                        const newId = userSimulation[userId].nextInverterId++
                        userSimulation[userId].inverters.push({ id: newId, maxPower: parseInt(extraData.maxPower),power:0,on:false,switch:false,imageURL:imageURLs[NFTPostHashHex]})
                    }
                } else if (count < current_count) {
                    for (const i = 0; i < current_count - count; i++) {
                        userSimulation[userId].inverters.splice(i, 1)
                    }
                }
            }
            else if (extraData.Type == "load") {
                console.log("load")
                const current_count = userSimulation[userId].loads.filter((entry) => entry.power == extraData.power).length
                if (count > current_count) {
                    for (const i = 0; i < count - current_count; i++) {
                        const newId = userSimulation[userId].nextLoadId++
                        userSimulation[userId].loads.push({ id: newId, power: parseInt(extraData.power),on:false,switch:true,imageURL:imageURLs[NFTPostHashHex]})
                    }
                } else if (count < current_count) {
                    for (const i = 0; i < current_count - count; i++) {
                        userSimulation[userId].loads.splice(i, 1)
                    }
                }
            }
        }

    }
    setData(userSimulation)

}
