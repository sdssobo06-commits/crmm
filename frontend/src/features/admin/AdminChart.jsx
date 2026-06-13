import React, { useState } from 'react';
import { useApp } from '../../shared/context/AppContext';

const AdminChart = () => {
  const { language } = useApp();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const data = [
    { day: language === 'uz' ? 'Dush' : 'Mon', sales: 1200, label: '$1,200' },
    { day: language === 'uz' ? 'Sesh' : 'Tue', sales: 1900, label: '$1,900' },
    { day: language === 'uz' ? 'Chor' : 'Wed', sales: 1500, label: '$1,500' },
    { day: language === 'uz' ? 'Pay' : 'Thu', sales: 2300, label: '$2,300' },
    { day: language === 'uz' ? 'Jum' : 'Fri', sales: 3100, label: '$3,100' },
    { day: language === 'uz' ? 'Shan' : 'Sat', sales: 4200, label: '$4,200' },
    { day: language === 'uz' ? 'Yak' : 'Sun', sales: 3800, label: '$3,800' }
  ];

  // SVG dimensions
  const width = 500;
  const height = 200;
  const padding = 30;
  
  // Calculate points
  const maxSales = 5000;
  const points = data.map((item, idx) => {
    const x = padding + (idx * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (item.sales * (height - 2 * padding)) / maxSales;
    return { x, y, ...item };
  });

  // Construct SVG path string for the line
  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Path string for the filled area under the line
  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : '';

  return (
    <div className="glass-card chart-container-card">
      <div className="chart-header-row">
        <div>
          <h3>{language === 'uz' ? 'Sotuvlar Dinamikasi' : 'Sales Dynamics'}</h3>
          <p>{language === 'uz' ? 'Haftalik simulyatsiya qilingan daromad ko\'rsatkichi' : 'Weekly simulated revenue analysis'}</p>
        </div>
        <div className="chart-stats-mini">
          <span className="text-muted">{language === 'uz' ? 'Haftalik Jami:' : 'Weekly Total:'}</span>
          <span className="text-success font-bold" style={{ fontSize: '1.15rem' }}>$18,000</span>
        </div>
      </div>

      <div className="svg-wrapper">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((grid, idx) => {
            const y = padding + (idx * (height - 2 * padding)) / 4;
            return (
              <line 
                key={idx} 
                x1={padding} 
                y1={y} 
                x2={width - padding} 
                y2={y} 
                stroke="var(--glass-border)" 
                strokeDasharray="4 4" 
              />
            );
          })}

          {/* Filled Area */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Line Path */}
          <path 
            d={pathD} 
            fill="none" 
            stroke="var(--color-primary)" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />

          {/* Interactive Data Dots */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredPoint === idx ? "7" : "4"}
                fill={hoveredPoint === idx ? "var(--color-secondary)" : "var(--color-primary)"}
                stroke="#ffffff"
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                onMouseEnter={() => setHoveredPoint(idx)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {/* Day Labels */}
              <text
                x={p.x}
                y={height - 10}
                fill="var(--text-secondary)"
                fontSize="10"
                textAnchor="middle"
              >
                {p.day}
              </text>
            </g>
          ))}

          {/* Tooltip Overlay */}
          {hoveredPoint !== null && (
            <g>
              <rect
                x={points[hoveredPoint].x - 45}
                y={points[hoveredPoint].y - 32}
                width="90"
                height="22"
                rx="4"
                fill="rgba(13, 17, 29, 0.95)"
                stroke="var(--glass-border)"
                strokeWidth="1"
              />
              <text
                x={points[hoveredPoint].x}
                y={points[hoveredPoint].y - 17}
                fill="#ffffff"
                fontSize="10"
                fontWeight="700"
                textAnchor="middle"
              >
                {points[hoveredPoint].label}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default AdminChart;
