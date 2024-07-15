import React, { useEffect, useState } from 'react';

const ScoreBar = ({ score, avgscore, label }) => {
  const [scorePercentage, setScorePercentage] = useState(0)
  const [avgScorePercentage, setAvgScorePercentage] = useState(0)
  const [barColor, setBarColor] = useState('bg-[#2246E2]')
  const [avgBarColor, setAvgBarColor] = useState('bg-[#2246E2]')
  const [scorePosition, setScorePosition] = useState('0%')
  const [avgScorePosition, setAvgScorePosition] = useState('0%')

  useEffect(() => {
    setScorePercentage((score / 250) * 100)
    setAvgScorePercentage((avgscore / 250) * 100)
    setBarColor(getBarColor(scorePercentage))
  }, [score, avgscore])

  useEffect(() => {
    const color = getBarColor(scorePercentage)
    console.log(color)
    setBarColor(color)
    setScorePosition(`${scorePercentage-5}%`)
    setAvgScorePosition(`${avgScorePercentage-5}%`)
  }, [scorePercentage, avgScorePercentage])

  function getBarColor(value) {
    console.log(value)
    if (value <= 20) {
      return '#E23D3E';
    } else if (value <= 40) {
      return '#EB7E5C';
    } else if (value <= 60) {
      return '#F7C780';
    } else if (value <= 80) {
      return '#A8D281';
    } else {
      return '#4FDD83';
    }
  }

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
                className={`h-full rounded-l-full bg-[${barColor}] mb-5`}
                style={{ width: `${scorePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="">
          <span
            className="text-black relative text-sm text-semibold"
            style={{ left: avgScorePosition, top: "10px" }}
          >
            {avgscore}
          </span>
          <div className="grid place-items-center mb-0 h-5 m-auto">
            <div className="h-[8px] bg-gray-300 rounded-full w-full overflow-hidden relative">
              <div
                className={`h-full rounded-l-full ${avgBarColor} mb-0`}
                style={{ width: `${avgScorePercentage}%` }}
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
        <div className='mt-[20px]'>
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
              score={socialClarityScore}
              avgscore={avgSocialClarityScore}
              label="Social Clarity Score"
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