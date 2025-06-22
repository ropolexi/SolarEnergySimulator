import { toast } from 'react-toastify';
export default function LoadItems({ load, userID,onUpdate }) {
    async function addLoad(power) {
        // const res = await fetch(`/api/load?userID=${encodeURIComponent(userID)}&power=${power}`, { method: 'POST' })
        // if (!res.ok) {
        //     const errorData = await res.json();
        //     console.error('Error:', errorData.message || errorData.error);
        //     return;
        // }
        // const data = await res.json();
        // toast(data.message);
        if(power==1000){
            window.open('https://diamondapp.com/nft/18f5bc9a8b3c09f4f03570839a07c652259c9cb08084067dac82c12cc0d12e5f', '_blank');
        }

    }

    async function removeLoad(id) {
        // const res = await fetch(`/api/load?userID=${userID}&id=${id}`, { method: 'DELETE' })
        // if (!res.ok) {
        //     const errorData = await res.json();
        //     console.error('Error:', errorData.message || errorData.error);
        //     return;
        // }
        // const data = await res.json();
        // toast(data.message);
        // onUpdate()

    }


    async function toggleLoad(id, currentState) {
        const res = await fetch(`/api/load?userID=${userID}&id=${id}&toggle=${!currentState}`, { method: 'PUT' });
        if (!res.ok) {
            const errorData = await res.json();
            console.error('Error:', errorData.message || errorData.error);
            return;
        }
        const data = await res.json();
        toast(data.message);
        onUpdate()

    }

    return (
        <section>
            <h2>Loads</h2>
            <div className="button-group">
                <button onClick={() => addLoad(1000)}>Add 1kW</button>
                {/* <button onClick={() => addLoad(5000)}>Add 5kW ($33000)</button> */}
            </div>
            <ul className="item-grid">
                {load.map(loadItem => (
                    <li key={loadItem.id} className="card">
                        <img src={loadItem.imageURL} alt="Load" width={128} />
                        <div>On: {String(loadItem.on)}</div>
                        <div className="button-group">
                            {/* <button onClick={() => removeLoad(loadItem.id)}>Remove</button> */}
                            {/* <button onClick={() => toggleLoad(loadItem.id, loadItem.switch)}>
                                {loadItem.switch ? 'Turn Off' : 'Turn On'}
                            </button> */}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}