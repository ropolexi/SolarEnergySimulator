'use server'
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
    if(sim.loadRevenue>0){
        sim.bankBalance += sim.loadRevenue
        sim.loadRevenue = 0

        return new Response(
        JSON.stringify({message:'Transfered to bank'}),
        {
            status:200,
            headers:{'Content-Type': 'application/json'}
        }
        )
    }else{
        return new Response(
        JSON.stringify({message:'Load revenue is zero'}),
        {
            status:200,
            headers:{'Content-Type': 'application/json'}
        }
        )
    }

   
    
    
    

    
}