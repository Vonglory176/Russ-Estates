import React, { useState } from 'react';
import { IconSelector } from '../components/IconSelector';
import { ReactIcon } from '../components/ReactIcon';

export default function IconTestPage() {
  const [selectedIcon, setSelectedIcon] = useState<string>('FaHome');
  const [iconColor, setIconColor] = useState<string>('#007bff');

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>React Icons Test Page</h1>
      <p>This page helps you test and find the right React Icons for your services.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h2>Icon Selector</h2>
          <IconSelector 
            onSelect={setSelectedIcon}
            selectedIcon={selectedIcon}
          />
        </div>

        <div>
          <h2>Preview</h2>
          <div style={{ 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            background: 'white'
          }}>
            <h3>Selected Icon Preview</h3>
            <div style={{ marginBottom: '20px' }}>
              <label>
                Icon Name: 
                <input
                  type="text"
                  value={selectedIcon}
                  onChange={(e) => setSelectedIcon(e.target.value)}
                  style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
                />
              </label>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label>
                Icon Color: 
                <input
                  type="color"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  style={{ marginLeft: '10px' }}
                />
                <input
                  type="text"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  style={{ marginLeft: '10px', padding: '5px', width: '100px' }}
                  placeholder="#000000"
                />
              </label>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px',
              padding: '20px',
              border: '1px solid #eee',
              borderRadius: '4px',
              background: '#f9f9f9'
            }}>
              <ReactIcon 
                iconName={selectedIcon} 
                color={iconColor} 
                size={64}
              />
              <div>
                <strong>Icon: {selectedIcon}</strong><br />
                <span>Color: {iconColor}</span>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h4>Different Sizes:</h4>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <ReactIcon iconName={selectedIcon} color={iconColor} size={16} />
                <ReactIcon iconName={selectedIcon} color={iconColor} size={24} />
                <ReactIcon iconName={selectedIcon} color={iconColor} size={32} />
                <ReactIcon iconName={selectedIcon} color={iconColor} size={48} />
                <ReactIcon iconName={selectedIcon} color={iconColor} size={64} />
                <ReactIcon iconName={selectedIcon} color={iconColor} size={80} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Popular Icons for Real Estate</h2>
        <p>Here are some commonly used icons for real estate websites:</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: '15px',
          marginTop: '20px'
        }}>
          {[
            'FaHome', 'FaBuilding', 'FaSearch', 'FaMapMarkerAlt', 'FaPhone',
            'FaEnvelope', 'FaUser', 'FaKey', 'FaCalculator', 'FaChartLine',
            'FaShieldAlt', 'FaStar', 'FaHeart', 'FaEye', 'FaHandshake',
            'MdApartment', 'MdBusiness', 'MdLocationOn', 'MdEmail', 'MdPhone',
            'IoBusiness', 'IoHome', 'IoSearch', 'IoLocation', 'IoMail',
            'GiHouse', 'GiModernCity', 'GiMagnifyingGlass', 'GiMapPin', 'GiPhone'
          ].map((iconName) => (
            <div
              key={iconName}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => setSelectedIcon(iconName)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ReactIcon iconName={iconName} size={32} color="#007bff" />
              <span style={{ marginTop: '8px', fontSize: '12px', textAlign: 'center' }}>
                {iconName}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>How to Use in Strapi</h2>
        <ol>
          <li>Use the icon selector above to find the icon you want</li>
          <li>Copy the icon name (e.g., "FaHome")</li>
          <li>In Strapi, paste the icon name into the "Icon Name" field</li>
          <li>Set the desired color in the "Icon Color" field (hex, rgb, or CSS color name)</li>
          <li>Save your service</li>
        </ol>
        
        <h3>Color Examples:</h3>
        <ul>
          <li>Hex: #007bff, #28a745, #dc3545</li>
          <li>RGB: rgb(0, 123, 255), rgb(40, 167, 69)</li>
          <li>CSS Colors: red, blue, green, orange, purple</li>
        </ul>
      </div>
    </div>
  );
} 