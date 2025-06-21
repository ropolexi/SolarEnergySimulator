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
    if(sim.solarEarning>0){
        sim.bankBalance += sim.solarEarning
        sim.solarEarning = 0

        return new Response(
        JSON.stringify({message:'Transfered to bank'}),
        {
            status:200,
            headers:{'Content-Type': 'application/json'}
        }
        )
    }else{
        return new Response(
        JSON.stringify({message:'Solar earnings is zero'}),
        {
            status:200,
            headers:{'Content-Type': 'application/json'}
        }
        )
    }

   
    
    
    

    
}