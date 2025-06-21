import { getOrCreateUserSimulation } from '@/lib/simulation';
const batteryPricePerWh=0.3

export async function POST(request) {
    
    // const {searchParams}= new URL(request.url)
    // const userID = searchParams.get('userID')
    // const capacityStr = searchParams.get('capacity')

    // if(!userID){
    //     return new Response(
    //         JSON.stringify({error:'Missing userID'}),{status:404}
    //     )
    // }
    // let capacity;
    // if (capacityStr) {
    //     const parsedCapacity = parseFloat(capacityStr);
    //     if (isNaN(parsedCapacity)) {
    //         return new Response(
    //             JSON.stringify({ error: 'Invalid capacity value' }),
    //             { status: 400 } // Changed status code to 400 (Bad Request)
    //         );
    //     }
    //     capacity = parsedCapacity;
    // } else {
    //     capacity = 550; // Default value if maxPower is missing
    // }


    // const sim = getOrCreateUserSimulation(userID);
    // if(sim.bankBalance>batteryPricePerWh*capacity){
    //     const newId = sim.nextBatteryId++
    //     sim.batteries.push({id:newId,capacity:capacity,charge:capacity/2})
    //     sim.bankBalance -= batteryPricePerWh*capacity
    //     sim.assetsValue += batteryPricePerWh*capacity

    //     return new Response(
    //     JSON.stringify({message:'Battery Added',id:newId}),
    //     {
    //         status:200,
    //         headers:{'Content-Type': 'application/json'}
    //     }
    // )
    // }else{
    //     return new Response(
    //     JSON.stringify({message:'Bank balance low'}),
    //     {
    //         status:200,
    //         headers:{'Content-Type': 'application/json'}
    //     }
    // )
    // }

    
}

export async function DELETE(request) {
    // const {searchParams} = new URL(request.url)
    // const userID=searchParams.get('userID')
    // const idStr = searchParams.get('id')

    // if(!userID){
    //     return new Response(
    //         JSON.stringify({error:'Missing userID'}),{status:404}
    //     )
    // }
    // const sim = getOrCreateUserSimulation(userID);
    // const id = parseInt(idStr)

    // for(let i=0;i<sim.batteries.length;i++){
    //     if(sim.batteries[i].id===id){
            
    //         sim.bankBalance += batteryPricePerWh*sim.batteries[i].capacity
    //         sim.assetsValue -= batteryPricePerWh*sim.batteries[i].capacity
    //         sim.batteries.splice(i,1)
    //         return new Response(
    //             JSON.stringify({message:'Battery removed',id}),
    //             {
    //                 status:200,
    //                 headers:{'Content-Type': 'application/json'}
    //             }
    //         )
    //     }
    // }
    
}