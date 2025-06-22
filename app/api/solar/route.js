// import { backgroundCheckNFT } from '@/lib/backgroundCheckNFT';
// import { getOrCreateUserSimulation } from '@/lib/simulation';
const solarPanelPricePerWatt=0.5

export async function POST(request) {
    
    // const {searchParams}= new URL(request.url)
    // const userID = searchParams.get('userID')
    // const maxPowerStr = searchParams.get('maxPower')

    // if(!userID){
    //     return new Response(
    //         JSON.stringify({error:'Missing userID'}),{status:404}
    //     )
    // }
    // let maxPower;

    // if (maxPowerStr) {
    //     const parsedMaxPower = parseFloat(maxPowerStr);
    //     if (isNaN(parsedMaxPower)) {
    //         return new Response(
    //             JSON.stringify({ error: 'Invalid maxPower value' }),
    //             { status: 400 } // Changed status code to 400 (Bad Request)
    //         );
    //     }
    //     maxPower = parsedMaxPower;
    // } else {
    //     maxPower = 550; // Default value if maxPower is missing
    // }
    // console.log(maxPower)
    // const sim = getOrCreateUserSimulation(userID);
    // if(sim.bankBalance>solarPanelPricePerWatt*maxPower){
    //     const newId = sim.nextSolarPanelId++
    //     sim.solarPanels.push({id:newId,maxPower:maxPower,power:0})
    //     sim.bankBalance -= solarPanelPricePerWatt*maxPower
    //     sim.assetsValue += solarPanelPricePerWatt*maxPower
        
        // return new Response(
        // JSON.stringify({message:'Solar Panel Added',id:newId}),
        // {
        //     status:200,
        //     headers:{'Content-Type': 'application/json'}
        // }
        // )
    
    //}
    // else{
    //     return new Response(
    //     JSON.stringify({message:'Bank balance low'}),
    //     {
    //         status:200,
    //         headers:{'Content-Type': 'application/json'}
    //     })
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

    // for(let i=0;i<sim.solarPanels.length;i++){
    //     if(sim.solarPanels[i].id===id){
            
    //         sim.bankBalance += solarPanelPricePerWatt*sim.solarPanels[i].maxPower
    //         sim.assetsValue -= solarPanelPricePerWatt*sim.solarPanels[i].maxPower
    //         sim.solarPanels.splice(i,1)
    //         return new Response(
    //             JSON.stringify({message:'Solar panel removed',id}),
    //             {
    //                 status:200,
    //                 headers:{'Content-Type': 'application/json'}
    //             }
    //         )
    //     }
    // }
    
}