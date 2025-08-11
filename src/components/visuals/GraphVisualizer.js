import React from 'react';
import { BarChart3, TrendingUp, PieChart, Grid3x3, Hash } from 'lucide-react';

const GraphVisualizer = ({ graphData, graphType }) => {
  if (!graphData) return null;

  const renderBarChart = () => {
    const { items, title, unit = '' } = graphData;
    const maxValue = Math.max(...Object.values(items));
    const barWidth = 60;
    const chartWidth = Object.keys(items).length * (barWidth + 20) + 40;
    const chartHeight = 250;
    const barMaxHeight = 180;

    return (
      <div className="bg-white p-4 rounded-lg border-2 border-pink-300">
        <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          {title || 'Bar Chart'}
        </h3>
        <svg width={chartWidth} height={chartHeight} className="mx-auto">
          {/* Y-axis */}
          <line x1="30" y1="10" x2="30" y2="210" stroke="#9333ea" strokeWidth="2" />
          
          {/* X-axis */}
          <line x1="30" y1="210" x2={chartWidth - 10} y2="210" stroke="#9333ea" strokeWidth="2" />
          
          {/* Y-axis labels */}
          {[0, Math.floor(maxValue/3), Math.floor(2*maxValue/3), maxValue].map((value, i) => (
            <g key={i}>
              <text x="25" y={210 - (i * 60)} textAnchor="end" fontSize="12" fill="#6b7280">
                {value}
              </text>
              <line x1="28" y1={210 - (i * 60)} x2="32" y2={210 - (i * 60)} stroke="#9333ea" strokeWidth="2" />
            </g>
          ))}

          {/* Bars and labels */}
          {Object.entries(items).map(([label, value], index) => {
            const barHeight = (value / maxValue) * barMaxHeight;
            const x = 50 + index * (barWidth + 20);
            const y = 210 - barHeight;

            return (
              <g key={label}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="url(#barGradient)"
                  rx="4"
                  className="hover:opacity-80 transition-opacity"
                />
                
                {/* Value label on top of bar */}
                <text
                  x={x + barWidth/2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#7c3aed"
                >
                  {value}{unit}
                </text>
                
                {/* X-axis label */}
                <text
                  x={x + barWidth/2}
                  y="230"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#374151"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  const renderPictogram = () => {
    const { items, symbolValue, symbol = '⭐', title } = graphData;
    
    return (
      <div className="bg-white p-4 rounded-lg border-2 border-pink-300">
        <h3 className="text-lg font-bold text-purple-700 mb-3">
          {title || 'Pictogram'} (Each {symbol} = {symbolValue})
        </h3>
        <div className="space-y-2">
          {Object.entries(items).map(([label, count]) => (
            <div key={label} className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-24">{label}:</span>
              <div className="flex flex-wrap gap-1">
                {[...Array(count)].map((_, i) => (
                  <span key={i} className="text-2xl">{symbol}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLineGraph = () => {
    const { points, title, unit = '', xLabel } = graphData;
    const maxY = Math.max(...points.map(p => p.y));
    const minY = Math.min(...points.map(p => p.y));
    const chartWidth = 400;
    const chartHeight = 250;
    const plotWidth = 340;
    const plotHeight = 180;
    const marginLeft = 40;
    const marginTop = 20;

    return (
      <div className="bg-white p-4 rounded-lg border-2 border-pink-300">
        <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {title || 'Line Graph'}
        </h3>
        <svg width={chartWidth} height={chartHeight} className="mx-auto">
          {/* Y-axis */}
          <line x1={marginLeft} y1={marginTop} x2={marginLeft} y2={marginTop + plotHeight} 
                stroke="#9333ea" strokeWidth="2" />
          
          {/* X-axis */}
          <line x1={marginLeft} y1={marginTop + plotHeight} x2={marginLeft + plotWidth} y2={marginTop + plotHeight} 
                stroke="#9333ea" strokeWidth="2" />

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`grid-h-${i}`}
                  x1={marginLeft} 
                  y1={marginTop + (i * plotHeight / 4)}
                  x2={marginLeft + plotWidth}
                  y2={marginTop + (i * plotHeight / 4)}
                  stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
          ))}

          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map(i => {
            const value = maxY - (i * (maxY - minY) / 4);
            return (
              <text key={`y-label-${i}`}
                    x={marginLeft - 5} 
                    y={marginTop + (i * plotHeight / 4) + 5}
                    textAnchor="end" fontSize="12" fill="#6b7280">
                {Math.round(value)}{unit}
              </text>
            );
          })}

          {/* Plot line */}
          <polyline
            points={points.map((p, i) => {
              const x = marginLeft + (i * plotWidth / (points.length - 1));
              const y = marginTop + plotHeight - ((p.y - minY) / (maxY - minY)) * plotHeight;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#ec4899"
            strokeWidth="3"
          />

          {/* Data points */}
          {points.map((p, i) => {
            const x = marginLeft + (i * plotWidth / (points.length - 1));
            const y = marginTop + plotHeight - ((p.y - minY) / (maxY - minY)) * plotHeight;
            
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill="#a855f7" stroke="white" strokeWidth="2" />
                <text x={x} y={marginTop + plotHeight + 20} textAnchor="middle" fontSize="11" fill="#374151">
                  {p.x}
                </text>
              </g>
            );
          })}

          {/* Axis labels */}
          {xLabel && (
            <text x={chartWidth / 2} y={chartHeight - 5} textAnchor="middle" fontSize="12" fill="#6b7280">
              {xLabel}
            </text>
          )}
        </svg>
      </div>
    );
  };

  const renderPieChart = () => {
    const { items, title, total } = graphData;
    const centerX = 150;
    const centerY = 120;
    const radius = 80;
    
    let currentAngle = -90; // Start from top
    const colors = ['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    
    const slices = Object.entries(items).map(([label, value], index) => {
      const percentage = (value / total) * 100;
      const angle = (value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      return {
        pathData,
        color: colors[index % colors.length],
        label,
        value,
        percentage: percentage.toFixed(1)
      };
    });

    return (
      <div className="bg-white p-4 rounded-lg border-2 border-pink-300">
        <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          {title || 'Pie Chart'} (Total: {total})
        </h3>
        <div className="flex items-center gap-4">
          <svg width="300" height="240" className="mx-auto">
            {slices.map((slice, index) => (
              <path
                key={index}
                d={slice.pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </svg>
          <div className="space-y-2">
            {slices.map((slice, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: slice.color }}></div>
                <span className="text-sm font-medium">{slice.label}: {slice.value} ({slice.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTallyChart = () => {
    const { items, title } = graphData;
    
    const renderTallyMarks = (count) => {
      const groups = [];
      const fives = Math.floor(count / 5);
      const remainder = count % 5;
      
      for (let i = 0; i < fives; i++) {
        groups.push(
          <div key={`group-${i}`} className="inline-flex items-center mr-3">
            <span className="text-2xl font-mono text-purple-700">||||</span>
            <span className="text-2xl font-mono text-purple-700 -ml-3">╱</span>
          </div>
        );
      }
      
      if (remainder > 0) {
        groups.push(
          <div key="remainder" className="inline-flex">
            {[...Array(remainder)].map((_, i) => (
              <span key={i} className="text-2xl font-mono text-purple-700 mr-1">|</span>
            ))}
          </div>
        );
      }
      
      return groups;
    };

    return (
      <div className="bg-white p-4 rounded-lg border-2 border-pink-300">
        <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
          <Hash className="w-5 h-5" />
          {title || 'Tally Chart'}
        </h3>
        <div className="space-y-3">
          {Object.entries(items).map(([label, count]) => (
            <div key={label} className="flex items-center gap-4 p-2 bg-pink-50 rounded">
              <span className="font-semibold text-gray-700 w-32">{label}:</span>
              <div className="flex items-center">
                {renderTallyMarks(count)}
              </div>
              <span className="ml-auto text-sm font-bold text-purple-600">({count})</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCarrollDiagram = () => {
    const { property1, property2, items, title } = graphData;
    
    return (
      <div className="bg-white p-4 rounded-lg border-2 border-pink-300">
        <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
          <Grid3x3 className="w-5 h-5" />
          {title || 'Carroll Diagram'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-2 border-purple-400 p-3 bg-purple-100"></th>
                <th className="border-2 border-purple-400 p-3 bg-purple-100 font-bold">{property2}: Yes</th>
                <th className="border-2 border-purple-400 p-3 bg-purple-100 font-bold">{property2}: No</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-purple-400 p-3 bg-purple-100 font-bold">{property1}: Yes</td>
                <td className="border-2 border-purple-400 p-3 bg-pink-50">
                  {items['Yes/Yes'] && (
                    <div className="text-center">
                      {Array.isArray(items['Yes/Yes']) ? (
                        <div>
                          {items['Yes/Yes'].join(', ')}
                          <div className="text-sm font-bold text-purple-600 mt-1">
                            ({items['Yes/Yes'].length})
                          </div>
                        </div>
                      ) : items['Yes/Yes']}
                    </div>
                  )}
                </td>
                <td className="border-2 border-purple-400 p-3 bg-pink-50">
                  {items['Yes/No'] && (
                    <div className="text-center">
                      {Array.isArray(items['Yes/No']) ? (
                        <div>
                          {items['Yes/No'].join(', ')}
                          <div className="text-sm font-bold text-purple-600 mt-1">
                            ({items['Yes/No'].length})
                          </div>
                        </div>
                      ) : items['Yes/No']}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td className="border-2 border-purple-400 p-3 bg-purple-100 font-bold">{property1}: No</td>
                <td className="border-2 border-purple-400 p-3 bg-pink-50">
                  {items['No/Yes'] && (
                    <div className="text-center">
                      {Array.isArray(items['No/Yes']) ? (
                        <div>
                          {items['No/Yes'].join(', ')}
                          <div className="text-sm font-bold text-purple-600 mt-1">
                            ({items['No/Yes'].length})
                          </div>
                        </div>
                      ) : items['No/Yes']}
                    </div>
                  )}
                </td>
                <td className="border-2 border-purple-400 p-3 bg-pink-50">
                  {items['No/No'] && (
                    <div className="text-center">
                      {Array.isArray(items['No/No']) ? (
                        <div>
                          {items['No/No'].join(', ')}
                          <div className="text-sm font-bold text-purple-600 mt-1">
                            ({items['No/No'].length})
                          </div>
                        </div>
                      ) : items['No/No']}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  switch (graphType) {
    case 'bar':
      return renderBarChart();
    case 'pictogram':
      return renderPictogram();
    case 'line':
      return renderLineGraph();
    case 'pie':
      return renderPieChart();
    case 'tally':
      return renderTallyChart();
    case 'carroll':
      return renderCarrollDiagram();
    default:
      return null;
  }
};

export default GraphVisualizer;