import { useState } from 'react';


export default function CircularProgressbar({ value, title, max_value }) {
  const strokeWidth = 5; // Ancho del trazo (stroke width)
  const radius = 85; // Radio del círculo (circle radius)
  const circumference = Math.PI * radius * 2; // Circunferencia del círculo (circle circumference)

  // Calculate the progress ratio for both stroke dasharray and offset
  const progressRatio = value / max_value;
  const progressDasharray = circumference;
  const progressDashoffset = circumference - progressRatio * circumference;

  // Calculate colors based on progress
  const getGradientColor = (progress) => {
    // Adjust these ranges and colors as needed
    if (progress <= 0.2) {
      return '#E23D3E';
    } else if (progress <= 0.4) {
      return '#EB7E5C';
    } else if (progress <= 0.6) {
      return '#F7C780';
    } else if (progress <= 0.8) {
      return '#A8D281';
    } else {
      return '#4FDD83';
    }
  };

  const getLetterScore = (input_value) => {
    // Adjust these ranges and letters as needed
    if (input_value <= 0.2) {
      return 'F';
    } else if (input_value <= 0.4) {
      return 'D';
    } else if (input_value <= 0.6) {
      return 'C';
    } else if (input_value <= 0.8) {
      return 'B';
    } else {
      return 'A';
    }
  };

  return (
    <div className=''>
      
      <text
        x="50%"
        y="0%"
        className='w-full text-center font-bold text-3xl mb-3'
        textAnchor="middle"
        dominantBaseline="middle"
        fill="black"
      >
        {title}
      </text>
      <svg width="250" height="250" viewBox="0 0 200 200">
        {/* Background circle (full circle) */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          className="circle-background"
          strokeWidth={strokeWidth}
          stroke="#ddd" // Set background color here (replace with desired color)
        />

        {/* Progress bar (filled portion) */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={getGradientColor(progressRatio)}
          strokeWidth={strokeWidth} // Adjust stroke width for visual differentiation
          className="circle-progress"
          style={{
            strokeDasharray: progressDasharray,
            strokeDashoffset: progressDashoffset,
            strokeLinecap: 'round', // Apply rounded corners
          }}
          transform="rotate(-90 100 100)"
        />

        {/* Labels */}
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill='#vr-title-first'
          style={{ fontWeight: '600', fontSize: '4rem' }}
        >
          {getLetterScore(progressRatio)}
        </text>

        <text
          x="50%"
          y="70%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill='#vr-title-first'
          style={{ fontWeight: '500', fontSize: '1rem' }}
        >
          {value} out of {max_value}
        </text>
      </svg>
    </div>
  );
}