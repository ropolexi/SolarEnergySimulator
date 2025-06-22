// import { getOrCreateUserSimulation } from '@/lib/simulation';
const loadPricePerWatt = 6.6
export async function POST(request) {
    // const {searchParams}= new URL(request.url)
    // const userID = searchParams.get('userID')
    // const powerStr = searchParams.get('power')

    // if(!userID){
    //     return new Response(
    //         JSON.stringify({error:'Missing userID'}),{status:404}
    //     )
    // }
    // let power;
    // if (powerStr) {
    //     const parsedPower = parseFloat(powerStr);
    //     if (isNaN(parsedPower)) {
    //         return new Response(
    //             JSON.stringify({ error: 'Invalid capacity value' }),
    //             { status: 400 } // Changed status code to 400 (Bad Request)
    //         );
    //     }
    //     power = parsedPower;
    // } else {
    //     power = 1000; // Default value if maxPower is missing
    // }

    // const sim = getOrCreateUserSimulation(userID);
    // if(sim.bankBalance>loadPricePerWatt*power){
    //     const newId = sim.nextLoadId++
    //     sim.loads.push({id:newId,power:power,on:false,switch:false})
    //     sim.bankBalance -= loadPricePerWatt*power
    //     sim.assetsValue += loadPricePerWatt*power
    //     return new Response(
    //         JSON.stringify({message:'Load Added',id:newId}),
    //         {
    //             status:200,
    //             headers:{'Content-Type': 'application/json'}
    //         }
    //     )
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
    // const index = sim.loads.findIndex(load => load.id === id);

    // if (index === -1) {
    //     return new Response(JSON.stringify({ error: 'Load not found' }), { status: 404 });
    // }

    // sim.bankBalance += loadPricePerWatt*sim.loads[index].power
    // sim.assetsValue -= loadPricePerWatt*sim.loads[index].power
    // sim.loads.splice(index, 1);

    // return new Response(
    //     JSON.stringify({ message: 'Load removed' }), // Return message, not undefined id
    //     {
    //         status: 200,
    //         headers: { 'Content-Type': 'application/json' }
    //     }
    // );
    
    
}

export async function PUT(request) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get('userID');
//   const id = parseInt(searchParams.get('id'));
//   const toggle = searchParams.get('toggle') === 'true';

//   if (!userId || isNaN(id)) return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
//   const sim = getOrCreateUserSimulation(userId);
  
//   const loadIndex = sim.loads.findIndex(load => load.id === id);

//     if (loadIndex === -1) {
//         return new Response(JSON.stringify({ error: 'Load not found' }), { status: 404 });
//     }

//     sim.loads[loadIndex].switch = toggle;

//     return new Response(
//         JSON.stringify({ message: 'Load toggled', id, on: toggle }),
//         {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' }
//         }
//     );
}