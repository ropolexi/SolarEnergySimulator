import { ToastContainer, toast } from 'react-toastify';
export default function BatteryItem({ batteries, userID, onUpdate }) {
  async function addBattery(capacity) {
    // const res = await fetch(`/api/battery?userID=${userID}&capacity=${capacity}`, { method: 'POST' })
    // if (!res.ok) {
    //   const errorData = await res.json();
    //   console.error('Error:', errorData.message || errorData.error);
    //   return;
    // }
    // const data = await res.json();
    // toast(data.message);
    // onUpdate()
    if(capacity==1000){
      window.open('https://diamondapp.com/nft/b744282de02397fb367d5d563e8cd3321f4c90b5f859a2678da59004756b6f7f', '_blank');
    }
  }

  async function removeBattery(id) {
    // const res = await fetch(`/api/battery?userID=${userID}&id=${id}`, { method: 'DELETE' })
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
      <h2>Batteries</h2>
      <div className="button-group">
        <button onClick={() => addBattery(1000)}>Buy 1kWh</button>
        {/* <button onClick={() => addBattery(10000)}>Buy 10kWh ($3000)</button> */}
      </div>
      <ul className="item-grid">
        {batteries.map(battery => (
          <li key={battery.id} className="card">
            <img src="/img/rechargeable-battery-147182_640.png" alt="Battery" width={128} />
            <div>Capacity: {parseFloat(battery.capacity)}Wh</div>
            <div>Charge: {parseFloat(battery.charge).toFixed(2)}Wh</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(battery.charge * 100) / battery.capacity}%`,
                  backgroundColor: battery.charge / battery.capacity > 0.2 ? '#4caf50' : '#f44336',
                }}
              ></div>
            </div>
            {/* <button onClick={() => removeBattery(battery.id)}>Sell</button> */}
          </li>
        ))}
      </ul>
    </section>
  )

}