import React from 'react';
import { Grid3x3, Circle, Square } from 'lucide-react';

const DiagramVisualizer = ({ diagramType, data, className = '' }) => {
  if (!data) return null;

  const renderCarrollDiagram = () => {
    const { rowLabel, colLabel, grid, title } = data;

    // grid format: [[top-left items], [top-right items], [bottom-left items], [bottom-right items]]
    // or use object with Yes/Yes, Yes/No, No/Yes, No/No keys
    const items = Array.isArray(grid) ? {
      'Yes/Yes': grid[0] || [],
      'Yes/No': grid[1] || [],
      'No/Yes': grid[2] || [],
      'No/No': grid[3] || []
    } : grid;

    return (
      <div className={`bg-white p-4 rounded-lg border-2 border-pink-300 shadow-lg ${className}`}>
        <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
          <Grid3x3 className="w-5 h-5" />
          {title || 'Carroll Diagram'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-2 border-purple-400 p-3 bg-gradient-to-br from-purple-100 to-pink-100"></th>
                <th className="border-2 border-purple-400 p-3 bg-gradient-to-br from-purple-100 to-pink-100 font-bold text-purple-800">
                  {colLabel}: Yes
                </th>
                <th className="border-2 border-purple-400 p-3 bg-gradient-to-br from-purple-100 to-pink-100 font-bold text-purple-800">
                  {colLabel}: No
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-purple-400 p-3 bg-gradient-to-br from-purple-100 to-pink-100 font-bold text-purple-800">
                  {rowLabel}: Yes
                </td>
                <td className="border-2 border-purple-400 p-4 bg-pink-50 hover:bg-pink-100 transition-colors">
                  <div className="text-center min-h-[60px] flex flex-col items-center justify-center">
                    {Array.isArray(items['Yes/Yes']) ? (
                      <>
                        <div className="text-gray-700 font-medium flex flex-wrap justify-center gap-1">
                          {items['Yes/Yes'].join(', ')}
                        </div>
                        <div className="text-sm font-bold text-purple-600 mt-2 bg-purple-200 px-2 py-1 rounded">
                          Count: {items['Yes/Yes'].length}
                        </div>
                      </>
                    ) : items['Yes/Yes']}
                  </div>
                </td>
                <td className="border-2 border-purple-400 p-4 bg-pink-50 hover:bg-pink-100 transition-colors">
                  <div className="text-center min-h-[60px] flex flex-col items-center justify-center">
                    {Array.isArray(items['Yes/No']) ? (
                      <>
                        <div className="text-gray-700 font-medium flex flex-wrap justify-center gap-1">
                          {items['Yes/No'].join(', ')}
                        </div>
                        <div className="text-sm font-bold text-purple-600 mt-2 bg-purple-200 px-2 py-1 rounded">
                          Count: {items['Yes/No'].length}
                        </div>
                      </>
                    ) : items['Yes/No']}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border-2 border-purple-400 p-3 bg-gradient-to-br from-purple-100 to-pink-100 font-bold text-purple-800">
                  {rowLabel}: No
                </td>
                <td className="border-2 border-purple-400 p-4 bg-pink-50 hover:bg-pink-100 transition-colors">
                  <div className="text-center min-h-[60px] flex flex-col items-center justify-center">
                    {Array.isArray(items['No/Yes']) ? (
                      <>
                        <div className="text-gray-700 font-medium flex flex-wrap justify-center gap-1">
                          {items['No/Yes'].join(', ')}
                        </div>
                        <div className="text-sm font-bold text-purple-600 mt-2 bg-purple-200 px-2 py-1 rounded">
                          Count: {items['No/Yes'].length}
                        </div>
                      </>
                    ) : items['No/Yes']}
                  </div>
                </td>
                <td className="border-2 border-purple-400 p-4 bg-pink-50 hover:bg-pink-100 transition-colors">
                  <div className="text-center min-h-[60px] flex flex-col items-center justify-center">
                    {Array.isArray(items['No/No']) ? (
                      <>
                        <div className="text-gray-700 font-medium flex flex-wrap justify-center gap-1">
                          {items['No/No'].join(', ')}
                        </div>
                        <div className="text-sm font-bold text-purple-600 mt-2 bg-purple-200 px-2 py-1 rounded">
                          Count: {items['No/No'].length}
                        </div>
                      </>
                    ) : items['No/No']}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSymbolGrid = () => {
    const { size = '2x2', cells, title, description } = data;
    const [rows, cols] = size.split('x').map(Number);

    return (
      <div className={`bg-white p-4 rounded-lg border-2 border-pink-300 shadow-lg ${className}`}>
        <h3 className="text-lg font-bold text-purple-700 mb-2 flex items-center gap-2">
          <Square className="w-5 h-5" />
          {title || 'Symbol Grid'}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        )}
        <div className="flex justify-center">
          <div
            className="inline-grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
            }}
          >
            {cells.map((cell, index) => {
              const bgColors = [
                'bg-gradient-to-br from-pink-200 to-purple-200',
                'bg-gradient-to-br from-purple-200 to-pink-200',
                'bg-gradient-to-br from-pink-100 to-purple-100',
                'bg-gradient-to-br from-purple-100 to-pink-100'
              ];

              return (
                <div
                  key={index}
                  className={`
                    ${bgColors[index % bgColors.length]}
                    border-2 border-purple-400 rounded-lg p-4
                    hover:scale-105 hover:shadow-xl transition-all duration-200
                    flex flex-col items-center justify-center
                    min-w-[80px] min-h-[80px]
                    cursor-pointer
                  `}
                >
                  {cell.symbol && (
                    <div className="text-4xl mb-2">{cell.symbol}</div>
                  )}
                  {cell.value !== undefined && (
                    <div className="text-xl font-bold text-purple-800">
                      {cell.value}
                    </div>
                  )}
                  {cell.label && (
                    <div className="text-xs text-gray-600 mt-1">{cell.label}</div>
                  )}
                  {cell.color && (
                    <div className="text-sm font-semibold text-gray-700">{cell.color}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderVennDiagram = () => {
    const { leftLabel, rightLabel, leftOnly, both, rightOnly, title } = data;

    return (
      <div className={`bg-white p-4 rounded-lg border-2 border-pink-300 shadow-lg ${className}`}>
        <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
          <Circle className="w-5 h-5" />
          {title || 'Venn Diagram'}
        </h3>
        <div className="relative" style={{ height: '280px' }}>
          <svg width="100%" height="100%" viewBox="0 0 400 280" className="absolute inset-0">
            {/* Left circle */}
            <circle
              cx="140"
              cy="140"
              r="90"
              fill="rgba(236, 72, 153, 0.3)"
              stroke="#ec4899"
              strokeWidth="3"
              className="hover:fill-pink-300 transition-all"
            />

            {/* Right circle */}
            <circle
              cx="260"
              cy="140"
              r="90"
              fill="rgba(168, 85, 247, 0.3)"
              stroke="#a855f7"
              strokeWidth="3"
              className="hover:fill-purple-300 transition-all"
            />

            {/* Labels */}
            <text x="100" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ec4899">
              {leftLabel}
            </text>
            <text x="300" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#a855f7">
              {rightLabel}
            </text>

            {/* Left only section */}
            <foreignObject x="50" y="110" width="100" height="60">
              <div className="text-center text-sm font-medium text-gray-700">
                {Array.isArray(leftOnly) ? leftOnly.join(', ') : leftOnly}
              </div>
            </foreignObject>

            {/* Both section (intersection) */}
            <foreignObject x="170" y="110" width="60" height="60">
              <div className="text-center text-sm font-bold text-purple-800">
                {Array.isArray(both) ? both.join(', ') : both}
              </div>
            </foreignObject>

            {/* Right only section */}
            <foreignObject x="250" y="110" width="100" height="60">
              <div className="text-center text-sm font-medium text-gray-700">
                {Array.isArray(rightOnly) ? rightOnly.join(', ') : rightOnly}
              </div>
            </foreignObject>
          </svg>
        </div>

        {/* Legend with counts */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="bg-pink-100 p-2 rounded text-center">
            <div className="font-bold text-pink-700">Only {leftLabel}</div>
            <div className="text-xs text-gray-600">
              {Array.isArray(leftOnly) ? `(${leftOnly.length})` : ''}
            </div>
          </div>
          <div className="bg-purple-100 p-2 rounded text-center">
            <div className="font-bold text-purple-700">Both</div>
            <div className="text-xs text-gray-600">
              {Array.isArray(both) ? `(${both.length})` : ''}
            </div>
          </div>
          <div className="bg-purple-100 p-2 rounded text-center">
            <div className="font-bold text-purple-700">Only {rightLabel}</div>
            <div className="text-xs text-gray-600">
              {Array.isArray(rightOnly) ? `(${rightOnly.length})` : ''}
            </div>
          </div>
        </div>
      </div>
    );
  };

  switch (diagramType) {
    case 'carroll':
      return renderCarrollDiagram();
    case 'symbolGrid':
      return renderSymbolGrid();
    case 'venn':
      return renderVennDiagram();
    default:
      return (
        <div className={`bg-pink-100 p-4 rounded-lg border-2 border-pink-300 ${className}`}>
          <p className="text-purple-700 font-semibold">
            Diagram type "{diagramType}" not supported yet.
          </p>
        </div>
      );
  }
};

export default DiagramVisualizer;
