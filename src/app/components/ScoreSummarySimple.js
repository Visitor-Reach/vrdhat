import React from 'react';
import Circularbar1 from "../components/Circularbar1";

const ScoreBar = ({ score, avgscore, label }) => {
  const score_percentage = (score / 250) * 100;
  const avgscore_percentage = (avgscore / 250) * 100;
  let barColor = 'bg-red-500';
  let avgbarColor = 'bg-red-500';


  if (score_percentage >= 75) {
    barColor = 'bg-[#2246E2]';
  } else if (score_percentage >= 50) {
    barColor = 'bg-orange-500';
  }

  if (avgscore_percentage >= 75) {
    avgbarColor = 'bg-[#2246E2]';
  } else if (avgscore_percentage >= 50) {
    avgbarColor = 'bg-orange-500';
  }

  const scorePosition = `${score_percentage-5}%`;
  const avgscorePosition = `${avgscore_percentage-5}%`;

  return (
<div className="mb-0 grid grid-cols-2 gap-5 mt-3 w-full">
  <div className="grid place-items-end">
    <span className="text-slate-800 w-full block font-[400] text-[15px] leading-[150%] tracking-[-0.6px] relative top-[12px]">
      {label}
    </span>
    <span className="text-slate-400 w-full block font-[400] text-[15px] leading-[150%] tracking-[-0.6px]">
      Visitor Reach Church Average
    </span>
  </div>
  <div className="">
    <div className="h-[28px]">
      <span
        className="text-black relative text-sm text-semibold"
        style={{ left: scorePosition, top: "10px" }}
      >
        {score}
      </span>
      <div className="grid place-items-center mb-0 h-5 m-auto">
        <div className="h-[8px] bg-gray-300 rounded-full w-full overflow-hidden relative">
          <div
            className={`h-full rounded-l-full ${barColor} mb-5`}
            style={{ width: `${score_percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
    <div className="">
      <span
        className="text-black relative text-sm text-semibold"
        style={{ left: avgscorePosition, top: "10px" }}
      >
        {avgscore}
      </span>
      <div className="grid place-items-center mb-0 h-5 m-auto">
        <div className="h-[8px] bg-gray-300 rounded-full w-full overflow-hidden relative">
          <div
            className={`h-full rounded-l-full ${avgbarColor} mb-0`}
            style={{ width: `${avgscore_percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
  
</div>
  );
};

const ScoreSummarySimple = ({
  digitalVoiceScore,
  avgDigitalVoiceScore,
  digitalMapsScore,
  avgDigitalMapsScore,
  socialClarityScore,
  avgSocialClarityScore,
  websiteAuthorityScore,
  avgWebsiteAuthorityScore,
}) => {
  return (
    <div className='grid grid-cols-3 bg-white rounded-3xl w-full p-4 h-[430px]'>
      <div className='col-span-3 '>
        <h2 className="m-4 text-black font-medium text-center text-[30px] leading-[115%] tracking-[-1.2px]">
          Digital Health Score Summary
        </h2>
        <div className='mt-[50px]'>
          <div className='w-11/12 h-11/12 cl'>
            <ScoreBar
              score={digitalVoiceScore}
              avgscore={avgDigitalVoiceScore}
              label="Digital Voice Score"
            />
            <ScoreBar
              score={digitalMapsScore}
              avgscore={avgDigitalMapsScore}
              label="Digital Maps Score"
            />
            <ScoreBar
              score={websiteAuthorityScore}
              avgscore={avgWebsiteAuthorityScore}
              label="Website Authority Score"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ScoreSummarySimple;