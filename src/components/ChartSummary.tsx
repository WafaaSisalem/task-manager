interface ChartSummaryProps {
  total: number;
  completed: number;
}

export function ChartSummary({ total, completed }: ChartSummaryProps) {
  // 1. Derived Data calculations
  const pending = total - completed;
  
  // Calculate percentage for our SVG circle
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  
  // Math for SVG Circle Drawing
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  // strokeDashoffset tells the SVG how much of the border to hide!
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="chart-container">
      <h3>Task Summary</h3>
      
      <div className="svg-wrapper">
        <svg width="150" height="150" viewBox="0 0 150 150">
          {/* Background Circle (Pending) */}
          <circle
            cx="75"
            cy="75"
            r={radius}
            fill="transparent"
            stroke="var(--color-navy)"
            strokeWidth="15"
            opacity="0.1"
          />
          
          {/* Foreground Circle (Completed) */}
          <circle
            cx="75"
            cy="75"
            r={radius}
            fill="transparent"
            stroke="var(--color-green)"
            strokeWidth="15"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            /* This CSS transition gives us a cool animation when tasks change! */
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            transform="rotate(-90 75 75)" // Rotate so it starts from the top
          />
          
          {/* Text in the middle */}
          <text x="75" y="80" textAnchor="middle" fontSize="20" fontWeight="bold" fill="var(--text-main)">
            {completed}/{total}
          </text>
        </svg>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <span className="dot" style={{ backgroundColor: 'var(--color-green)' }}></span>
          Completed: {completed}
        </div>
        <div className="legend-item">
          <span className="dot" style={{ backgroundColor: 'rgba(25, 34, 76, 0.1)' }}></span>
          Pending: {pending}
        </div>
      </div>
    </div>
  );
}
