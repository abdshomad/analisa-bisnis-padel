import React from 'react';

// Custom content renderer for Treemap
export const CustomizedTreemapContent: React.FC<any> = ({ root, depth, x, y, width, height, index, colors, name, textColor }) => {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[index % colors.length] : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill={textColor || "#fff"} fontSize={14}>
            {name}
          </text>
        ) : null}
        {depth === 2 ? (
            <text x={x+4} y={y+14} fill={textColor || "#fff"} fontSize={12} fillOpacity={0.9}>
                {name}
            </text>
        ) : null}
      </g>
    );
  };