import { getOrCreateUserSimulation } from '@/lib/simulation';
const inverterPricePerWatt = 0.15
export async function POST(request) {
    // const {searchParams}= new URL(request.url)
    // const userID = searchParams.get('userID')

    // if(!userID){
    //     return new Response(
    //         JSON.stringify({error:'Missing userID'}),{status:404}
    //     )
    // }
    // const sim = getOrCreateUserSimulation(userID);
    // if(sim.bankBalance>inverterPricePerWatt*4000){
    //     const newId = sim.nextInverterId++
    //     sim.inverters.push({id:newId,maxPower:4000,power:0,on:false,switch:false})
    //     sim.bankBalance -= inverterPricePerWatt*4000
    //     sim.assetsValue += inverterPricePerWatt*4000

    //     return new Response(
    //         JSON.stringify({message:'Inverter Added',id:newId}),
    //         {
    //             status:200,
    //             headers:{'Content-Type': 'application/json'}
    //         }
    //     )
    // }else{
    //     return new Response(
    //         JSON.stringify({message:'Bank balance low'}),
    //         {
    //             status:200,
    //             headers:{'Content-Type': 'application/json'}
    //         }
    //     )
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

    // for(let i=0;i<sim.inverters.length;i++){
    //     if(sim.inverters[i].id===id){
    //         sim.inverters.splice(i,1)
    //         sim.bankBalance += inverterPricePerWatt*4000
    //         sim.assetsValue -= inverterPricePerWatt*4000

    //         return new Response(
    //             JSON.stringify({message:'Inverter removed',id}),
    //             {
    //                 status:200,
    //                 headers:{'Content-Type': 'application/json'}
    //             }
    //         )
    //     }
    // }
    
}