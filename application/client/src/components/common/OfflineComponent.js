import React from 'react'
import Navbar from '../layout/Navbar';

export default function OfflineComponent() {
  return (
    <div>
      <Navbar />
      <div className="container-fill-height landing-page">
        <div className="container-content-middle text-center">
          <h1 className="text-center">No Connection :(</h1>
          <p className="text-center">It seems you currently have no internet connection.</p>
          <p className="text-center">The app will automatically reconnect when one becomes available.</p>
        </div>
      </div>
    </div >
  )
}
