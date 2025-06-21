import { getOrCreateUserSimulation } from '@/lib/simulation';

export async function POST(request) {
    
    const {searchParams}= new URL(request.url)
    const userID = searchParams.get('userID')

    if(!userID){
        return new Response(
            JSON.stringify({error:'Missing userID'}),{status:404}
        )
    }
    const sim = getOrCreateUserSimulation(userID);
    let message=""
    if(sim.bankBalance>sim.gridPowerInCost){
        if(sim.gridPowerInCost<=0){
            message = "Nothing to pay"
        }else{
            message = "Bill settled"
        }
        sim.bankBalance -= sim.gridPowerInCost
        sim.gridPowerInCost = 0
    }else{
        message = "Insufficient bank balance to pay the bill"
    }

    return new Response(
        JSON.stringify({message:message}),
        {
            status:200,
            headers:{'Content-Type': 'application/json'}
        }
    )    
}