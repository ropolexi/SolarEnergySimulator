import { ToastContainer, toast } from 'react-toastify';
export default function SolarPanelsItem({ solarPanels, userID ,onUpdate}) {

  async function addSolar(maxPower) {
    // const res = await fetch(`/api/solar?userID=${userID}&maxPower=${maxPower}`, { method: 'POST' })
    // if (!res.ok) {
    //   const errorData = await res.json();
    //   console.error('Error:', errorData.message || errorData.error);
    //   return;
    // }
    // const data = await res.json();
    // toast(data.message);
    // onUpdate()
    if(maxPower==550){
      window.open('https://diamondapp.com/nft/97f6b40eb36ca8d2e0cb7cc3f0eeeaac2abcc3a268bc614019af53784203a4cf', '_blank');
    }
  }

  async function removeSolar(id) {
    // const res = await fetch(`/api/solar?userID=${userID}&id=${id}`, { method: 'DELETE' })
    // if (!res.ok) {
    //   const errorData = await res.json();
    //   console.error('Error:', errorData.message || errorData.error);
    //   return;
    // }
    // const data = await res.json();
    // toast(data.message);
    // onUpdate()
   
  }

  return (
    <section>
      <h2>Solar Panels</h2>
      <div className="button-group">
        <button onClick={() => addSolar(550)}>Buy 550W</button>
        {/* <button onClick={() => addSolar(5500)}>Buy 5500W ($2750)</button> */}
      </div>
      <ul className="item-grid">
        {solarPanels.map(panel => (
          <li key={panel.id} className="card">
            <img src="/img/solar-panel-154549_640.png" alt="Solar Panel" width={128} />
            <div>Max Power: {panel.maxPower}W</div>
            <div>Power: {parseFloat(panel.power).toFixed(2)}W</div>
            {/* <button onClick={() => removeSolar(panel.id)}>Sell</button> */}
          </li>
        ))}
      </ul>
    </section>
  )
}
