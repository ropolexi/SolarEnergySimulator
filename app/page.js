"use client"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import SolarPanelsItem from "./components/SolarPanelsItem/SolarPanelsItem";
import BatteryItem from "./components/BatteryItem/BatteryItem";
import LoadItems from "./components/LoadItem/LoadItem";
import InverterItems from "./components/InverterItem/InverterItem";
import useSimulationData from "./hooks/useSimulationData";
import SystemOverview from "./components/SystemOverview/SystemOverview";
import StatsPanel from "./components/StatsPanel/StatsPanel";
import Link from 'next/link';

export default function HomePage() {
  const [userID, setUserID] = useState("")
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');


  const handleGetPublicKey = async () => {
    setError('');

    try {
      const response = await fetch('https://node.deso.org/api/v0/get-single-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: username }),
      });

      const data = await response.json();

      if (data?.Profile?.PublicKeyBase58Check) {
        return data.Profile.PublicKeyBase58Check;
      } else {
        setError('User not found or invalid username.');
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching public key.');
      return null
    }
  };


  const {
    data, solarPanels, batteries, load, inverter,
    time, bankBalance, assetsValue, solarEarning,
    gridPowerInCost, loadRevenue, stats, fetchStatus
  } = useSimulationData(userID, username);

  async function transferSolarEarningsToBank() {
    const res = await fetch(`/api/transfer?userID=${userID}`, { method: 'POST' });
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error:', errorData.message || errorData.error);
      return;
    }
    const data = await res.json();
    toast(data.message);
    fetchStatus();
  }

  async function payElectricityBill() {
    const res = await fetch(`/api/bill?userID=${userID}`, { method: 'POST' });
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error:', errorData.message || errorData.error);
      return;
    }
    const data = await res.json();
    toast(data.message);
    fetchStatus();
  }

  async function transferLoadRevenueToBank() {
    const res = await fetch(`/api/revenue?userID=${userID}`, { method: 'POST' });
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error:', errorData.message || errorData.error);
      return;
    }
    const data = await res.json();
    toast(data.message);
    fetchStatus();
  }

  useEffect(() => {
    const saved = localStorage.getItem("userID");
    const saved_username = localStorage.getItem("username");
    if (saved) setUserID(saved);
    if (saved_username) setUsername(saved_username);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const publicKey = await handleGetPublicKey()
    if (publicKey) {
      setUserID(publicKey);
      localStorage.setItem("userID", publicKey);
      localStorage.setItem("username", username);
    }
  };
  return (
    <div>

      <div className="container">
        <ToastContainer />
        <div className="header">
          <h1>Solar Energy Simulator</h1>
         
          <div className="time-display">
            <span>Days: {time.days}</span>
            {userID &&
              <p>
                Time: {String(time.hour).padStart(2, '0')}:
                {String(time.minute).padStart(2, '0')}:
                {String(time.second).padStart(2, '0')}
              </p>
            }
          </div>
        </div>
         <p className="description">Simulates energy generation and load management</p>
        <section className="stats-overview">
          <div className="stats-panel">
            {userID && (
              <StatsPanel
                stats={stats}
                assetsValue={assetsValue}
                solarEarning={solarEarning}
                gridPowerInCost={gridPowerInCost}
                loadRevenue={loadRevenue}
                bankBalance={bankBalance}
                onTransferSolar={transferSolarEarningsToBank}
                onPayBill={payElectricityBill}
                onTransferLoadRevenue={transferLoadRevenueToBank}
              />
            )}


          </div>
        </section>

        


        <section>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="username-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="User">Enter Username:</label>
              <input
                type="text"
                id="myInput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button type="submit" disabled={!username.trim()}>Update</button>
            </form>
            <section className="public-key">
              {userID && <p>Public Key: {userID}</p>}
            </section>
          </div>

        </section>

        {/* <section>
          <h3>Username: {userID}</h3>
        </section> */}
        {userID && <SystemOverview stats={stats} />}


        {userID && (
          <>
          <div className="button-group">
             <a href="https://nftz.me/u/SolarEnergySim/forsale" target="_blank"><button>Market Place</button></a>
            </div>
            <SolarPanelsItem solarPanels={solarPanels} userID={userID} onUpdate={fetchStatus} />
            <BatteryItem batteries={batteries} userID={userID} onUpdate={fetchStatus} />
            <LoadItems load={load} userID={userID} onUpdate={fetchStatus} />
            <InverterItems inverter={inverter} userID={userID} onUpdate={fetchStatus} />
          </>
        )}

      </div>
    </div>
  );
}