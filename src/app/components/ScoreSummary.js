import React from 'react';
import Circularbar1 from "../components/Circularbar1";

const ScoreBar = ({ score, avgscore, label }) => {
  const score_percentage = (score / 250) * 100;
  const avgscore_percentage = (avgscore / 250) * 100;
  let barColor = 'bg-red-500';
  let avgbarColor = 'bg-red-500';


  if (score_percentage <= 20) {
    barColor = 'bg-[#E23D3E]';
  } else if (score_percentage <= 40) {
    barColor = 'bg-[#EB7E5C]';
  } else if (score_percentage <= 60) {
    barColor = 'bg-[#F7C780]';
  } else if (score_percentage <= 80) {
    barColor = 'bg-[#A8D281]';
  } else {
    barColor = 'bg-[#4FDD83]';
  }

  if (avgscore_percentage <= 20) {
    avgbarColor = 'bg-[#E23D3E]';
  } else if (avgscore_percentage <= 40) {
    avgbarColor = 'bg-[#EB7E5C]';
  } else if (avgscore_percentage <= 60) {
    avgbarColor = 'bg-[#F7C780]';
  } else if (avgscore_percentage <= 80) {
    avgbarColor = 'bg-[#A8D281]';
  } else {
    avgbarColor = 'bg-[#4FDD83]';
  }
  
  

  const scorePosition = `${score_percentage-5}%`;
  const avgscorePosition = `${avgscore_percentage-5}%`;

  return (
<div className="max-md:mb-[50px] grid md:grid-cols-2 max-md:grid-cols-1 max-md:gap-2 mt-3 w-full">
    <div className="max-md:mb-[10px]">
      <span className="text-slate-800 w-full block font-regular text-md relative top-6 left-5">
        {label}
      </span>
    </div>
    <div className="">
      <span
        className="text-black relative text-sm text-semibold"
        style={{ left: scorePosition }}
      >
        {score}
      </span>
      <div className="grid place-items-center mb-0 h-5 m-auto">
        <div className="h-4 bg-gray-300 rounded-full w-full overflow-hidden relative">
          <div
            className={`h-full rounded-l-full ${barColor} mb-5`}
            style={{ width: `${score_percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
    <div className="max-md:mb-[15px]">
      <span className="text-slate-400 w-full block font-regular text-md relative top-6 left-5 px-[10px]">
        Visitor Reach Church Average
      </span>
    </div>
    <div className="">
      <span
        className="text-black relative text-sm text-semibold"
        style={{ left: avgscorePosition }}
      >
        {avgscore}
      </span>
      <div className="grid place-items-center mb-0 h-5 m-auto">
        <div className="h-4 bg-gray-300 rounded-full w-full overflow-hidden relative">
          <div
            className={`h-full rounded-l-full ${avgbarColor} mb-0`}
            style={{ width: `${avgscore_percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  
</div>
  );
};

const ScoreSummary = ({
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
    <div className='max-md:flex max-md:flex-col max-md:flex-wrap md:grid md:grid-cols-3 bg-white rounded-3xl max-md:w-full w-full p-4 shadow-2xl'>
      <div className='col-span-2'>
        <h2 className="text-2xl m-4 text-black font-medium ">
          Digital Health Score Summary
        </h2>
        <div className=''>
          <div className='max-md:w-full max-md:h-full w-11/12 h-11/12'>
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
            {/* <ScoreBar
              score={socialClarityScore}
              avgscore={avgSocialClarityScore}
              label="Social Clarity Score"
            /> */}
            <ScoreBar
              score={websiteAuthorityScore}
              avgscore={avgWebsiteAuthorityScore}
              label="Website Authority Score"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl m-4 text-black font-medium text-center">
          Your Church's Total <br /> Digital Health Score
        </h1>
        <Circularbar1
          value={
            digitalVoiceScore +
            digitalMapsScore +
            socialClarityScore +
            websiteAuthorityScore
          }
          title={""}
          max_value={750}
        />
        <div className='pt-20 justify-center justify-items-center text-center'>
            <p className='text-2xl text-slate-500 text-regular relative -top-12'>
              Check your email for your church’s detailed report
            </p>
          </div>
      </div>
    </div>
  );
};

export default ScoreSummary;