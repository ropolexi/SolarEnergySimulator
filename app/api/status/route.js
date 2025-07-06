'use server'
import { getOrCreateUserSimulation } from '@/lib/simulation';

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userID')
    const username = searchParams.get('username')
    if (!userId) {
        return new Response(JSON.stringify({ error: 'Missing userID' }), { status: 400 })
    }

    const sim = getOrCreateUserSimulation(userId);
    sim.username=username
    //console.log(sim)

return new Response(
    JSON.stringify({
        sim
    }),
    {
        status: 200,
        header: { 'Content-Type': 'application/json' }
    }
)
}