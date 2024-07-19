import React from 'react';
import QRCode from 'react-qr-code';

function Qr({ value, colorStart, colorEnd, bgImage, logo }) {
  const gradientId = `qr-gradient-${Math.random().toString(36).substr(2, 9)}`;

  const qrStyle = {
    backgroundImage: bgImage ? `url(${bgImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    width: '256px',
    height: '256px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={qrStyle}>
      <svg
        viewBox="0 0 256 256"
        style={{ height: "auto", maxWidth: "100%", width: "100%", position: 'absolute' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: colorStart, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: colorEnd, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <QRCode
          size={256}
          value={value}
          fgColor={`url(#${gradientId})`}
          bgColor="transparent" // Ensure QR code's default background is transparent
        />
      </svg>
      {logo && (
        <img 
          src={logo} 
          alt="QR Logo" 
          style={{
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '50px', 
            height: '50px'
          }}
        />
      )}
    </div>
  );
}

export default Qr;
