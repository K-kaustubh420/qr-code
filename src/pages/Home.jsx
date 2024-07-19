import React, { useState } from 'react';
import Qr from '../components/Qr';
import html2canvas from 'html2canvas';

function Home() {
  const [qrValue, setQrValue] = useState('hey');
  const [qrColorStart, setQrColorStart] = useState('#000000');
  const [qrColorEnd, setQrColorEnd] = useState('#000000');
  const [bgImage, setBgImage] = useState(null);
  const [qrLogo, setQrLogo] = useState(null);

  const handleInputChange = (e) => {
    setQrValue(e.target.value);
  };

  const handleColorStartChange = (e) => {
    setQrColorStart(e.target.value);
  };

  const handleColorEndChange = (e) => {
    setQrColorEnd(e.target.value);
  };

  const handleBgImageChange = (e) => {
    setBgImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleQrLogoChange = (e) => {
    setQrLogo(URL.createObjectURL(e.target.files[0]));
  };

  const handleDownloadSvg = () => {
    const svg = document.querySelector('svg');
    if (svg) {
      const serializer = new XMLSerializer();
      const svgBlob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="card glass shadow-lg rounded-lg  p-6 m-4 w-full lg:w-1/3">
        <h1 className="text-2xl font-bold mb-4 text-center">Generate QR Codes</h1>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Upload a background image</label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-warning w-full"
              onChange={handleBgImageChange}
            />
          </div>
          <div>
            <label className="block mb-1">Set QR color (Start)</label>
            <input
              type="color"
              value={qrColorStart}
              onChange={handleColorStartChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Set QR color (End)</label>
            <input
              type="color"
              value={qrColorEnd}
              onChange={handleColorEndChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Set QR logo</label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-warning w-full"
              onChange={handleQrLogoChange}
            />
          </div>
        </div>
      </div>
      <div className="card glass shadow-lg rounded-lg  p-6 m-4 w-full lg:w-1/3 flex flex-col items-center qr-container">
        <figure className="mb-4">
          <Qr
            value={qrValue}
            colorStart={qrColorStart}
            colorEnd={qrColorEnd}
            bgImage={bgImage}
            logo={qrLogo}
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title mb-4">Your QR Code</h2>
          <input 
            type="text" 
            value={qrValue} 
            onChange={handleInputChange} 
            className="input input-bordered w-full mb-4"
            placeholder="Enter text for QR code"
          />
          <div className="card-actions space-x-4">
            <button className="btn btn-primary" onClick={handleDownloadSvg}>Download SVG</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
