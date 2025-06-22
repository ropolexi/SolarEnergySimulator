
import { toast } from 'react-toastify';
export default function InverterItems({ inverter, userID ,onUpdate}) {
    async function addInverter() {
        // const res = await fetch(`/api/inverter?userID=${userID}`, { method: 'POST' })
        // if (!res.ok) {
        //     const errorData = await res.json();
        //     console.error('Error:', errorData.message || errorData.error);
        //     return;
        // }
        // const data = await res.json();
        // toast(data.message);
        // onUpdate()
       
      window.open('https://diamondapp.com/nft/77cfde3d0b19de93a29d9e178554896f5e42559ad7e577b236cd955db5a89e7b', '_blank');
    

    }

    async function removeInverter(id) {
        // const res = await fetch(`/api/inverter?userID=${userID}&id=${id}`, { method: 'DELETE' })
        // if (!res.ok) {
        //     const errorData = await res.json();
        //     console.error('Error:', errorData.message || errorData.error);
        //     return;
        // }
        // const data = await res.json();
        // toast(data.message);
        // onUpdate()

    }
    return (

        <section>
            <h2>Hybrid Inverter</h2>
            <div className="button-group">
                <button onClick={addInverter}>Buy 4kW Inverter</button>
            </div>
            <ul className="item-grid">
                {inverter.map(inv => (
                    <li key={inv.id} className="card">
                        <img src={inv.imageURL} alt="Inverter" width={128} />
                        <div>Max Power: {inv.maxPower}W</div>
                        <div>Power: {parseFloat(inv.power).toFixed(2)}W</div>
                        {/* <button onClick={() => removeInverter(inv.id)}>Sell</button> */}
                    </li>
                ))}
            </ul>
        </section>
    )
}