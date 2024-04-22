'use client'
import React, { useState, useEffect } from 'react'
import './style.css'
import './page2.css'
import './page3.css'
import './page4.css'
import './page5.css'
import './page6.css'
import './page7.css'
import './outro.css'
import Circularbar from '../components/Circularbar1.js'
import ScoreSummary from '../components/ScoreSummarySimple.js'

export default function FullReport() {
  const [isLoading, setIsLoading] = useState(true)
  const [church_name, set_church_name] = useState('')
  const [digitalVoice, setDigitalVoice] = useState(0)
  const [digitalMaps, setDigitalMaps] = useState(0)
  const [applelMaps, setAppleMaps] = useState(0)
  const [googleMaps, setGooglelMaps] = useState(0)
  const [socialClarity, setsocialClarity] = useState(0)
  const [websiteAuthority, setwebsiteAuthority] = useState(0)
  const [vrVoice, setvrVoice] = useState(0)
  const [vrMaps, setvrMaps] = useState(0)
  const [vrSocial, setvrSocial] = useState(0)
  const [vrWebsite, setvrWebsite] = useState(0)
  const [last_month_searches, set_last_month_searches] = useState(0)
  const [loc_city, setLoc_city] = useState('')
  const [loc_zipcode, setLoc_zipcode] = useState('')
  const [loc_address, setLoc_address] = useState('')
  const [loc_state, setLoc_state] = useState('')
  const [webpage, setWebpage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + '/api/fetch-data')
        const data = await response.json()

        set_church_name(data.church_name)
        setDigitalVoice(data.digitalVoice)
        setDigitalMaps(data.digitalMaps)
        setAppleMaps(data.appleMaps)
        setGooglelMaps(data.googleMaps)
        setsocialClarity(data.socialClarity)
        setwebsiteAuthority(data.websiteAuthority)
        setvrVoice(data.vrVoice)
        setvrMaps(data.vrMaps)
        setvrSocial(data.vrSocial)
        setvrWebsite(data.vrWebsite)
        set_last_month_searches(data.last_month_searches)
        setLoc_city(data.loc_city)
        setLoc_address(data.loc_address)
        setLoc_zipcode(data.loc_zipcodesetLoc_ziploc_zipcode)
        setLoc_state(data.loc_state)
        setWebpage(data.website)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <section id="intro">
        <img className="img-logo-main" src="Logo.png" />
        <div className="main-text">
          <h2 className="title1">Digital Health Assessment</h2>
          <h1 className="title2-intro">{church_name}</h1>
          <div className="address-website">
            <div className="address">
              <img src="Group.png" alt="" />
              <p>
                {loc_address}, {loc_city}, {loc_state} {loc_zipcode}
              </p>
            </div>
            <div className="website">
              <img src="Group1.png" alt="" />
              <p>{webpage}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="page1">
        <div className="page1-text">
          <h1>
            Did you know there are <span id="monthly-users">{last_month_searches} monthly</span> Google searches for
            “churches near me” in{' '}
            <span id="location">
              {loc_city}, {loc_state}
            </span>
            ?
          </h1>
        </div>
        <img className="img-logo2" src="Logo.png" />
      </section>

      <section id="page2">
        <div className="navbar">
          <img className="img-logo-nav" src="Logo.png" />
          <div className="nav-links">
            <div className="nav-child nav-page2">
              <img className="nav-img-logo" src="img-navbar1-blue.png" />
              <a href="#page2">Digital Voice Score</a>
            </div>
            <div className="nav-child nav-page3">
              <img className="nav-img-logo" src="img-navbar2.png" />
              <a href="#page3">Digital Maps Score</a>
            </div>
            <div className="nav-child nav-page4">
              <img className="nav-img-logo" src="img-navbar3.png" />
              <a href="#page4">Social Clarity Score</a>
            </div>
            <div className="nav-child nav-page5">
              <img className="nav-img-logo" src="img-navbar4.png" />
              <a href="#page5">Website Authority Score</a>
            </div>
            <div className="nav-child nav-page6">
              <img className="nav-img-logo" src="img-navbar5.png" />
              <a href="#page6">Digital Health Score</a>
            </div>
            <div className="nav-child nav-page7">
              <img className="nav-img-logo" src="img-navbar6.png" />
              <a href="#page7">Visitor Reach Process</a>
            </div>
          </div>
          <h1 id="nav-church-name">Dreamer’s Church</h1>
        </div>
        <div className="containers">
          <div className="ct1">
            <img src="img-ct1-page2.png" />
            <br />
            <h1 className="ct1-title">
              What Is <span id="title-ch-ct1">Voice Search</span> & Why It’s Important
            </h1>
            <br />
            <p className="ct1-p">
              Voice technology allows people to perform a hands-free search by asking questions to their smart devices
              such as smartphones, smart speakers, and in-car systems. Your church’s Digital Voice Score shows how
              optimized your digital presence is when it comes to showing up in voice search results.
            </p>
          </div>
          <div className="ct2">
            <h1 className="ct2-title">57%</h1>
            <p className="ct2-p">
              of American adults use voice assistants on their devices to find out information on a daily basis.
            </p>
          </div>
          <div className="ct3">
            <h1 className="ct3-title">Your Digital Voice Score</h1>
            <Circularbar value={digitalVoice} title={undefined} max_value={250} />
            <br />
            <img src="img-ct3-page2.png" />
            <br />
            <h2 className="ct3-title2">Only 2% of churches</h2>
            <br />
            <p className="ct3-p">
              are optimized for voice search. If your church’s digital presence isn’t optimized for voice search, people
              won’t be able to find and visit your church!
            </p>
            <br />
            <a className="ct3-a" href="#">
              Source: VisitorReach
            </a>
          </div>
        </div>
      </section>

      <section id="page3">
        <div className="navbar">
          <img className="img-logo-nav" src="Logo.png" />
          <div className="nav-links">
            <div className="nav-child nav-page2">
              <img className="nav-img-logo" src="img-navbar1.png" />
              <a href="#page2">Digital Voice Score</a>
            </div>
            <div className="nav-child nav-page3">
              <img className="nav-img-logo" src="img-navbar2-blue.png" />
              <a href="#page3">Digital Maps Score</a>
            </div>
            <div className="nav-child nav-page4">
              <img className="nav-img-logo" src="img-navbar3.png" />
              <a href="#page4">Social Clarity Score</a>
            </div>
            <div className="nav-child nav-page5">
              <img className="nav-img-logo" src="img-navbar4.png" />
              <a href="#page5">Website Authority Score</a>
            </div>
            <div className="nav-child nav-page6">
              <img className="nav-img-logo" src="img-navbar5.png" />
              <a href="#page6">Digital Health Score</a>
            </div>
            <div className="nav-child nav-page7">
              <img className="nav-img-logo" src="img-navbar6.png" />
              <a href="#page7">Visitor Reach Process</a>
            </div>
          </div>
          <h1 id="nav-church-name">Dreamer’s Church</h1>
        </div>

        <div className="containers-pg3">
          <div className="ct1-pg3">
            <h1 className="ct1-title">
              People in the U.S. search for “churches near me” over <span id="title-ch-ct1">1 million</span> times each
              month
            </h1>
          </div>

          <div className="ct2-pg3">
            <h1 className="ct1-title">
              Nearly <span id="title-ch-ct1">2 billion</span> people use Google Maps every month
            </h1>
            <p className="ct1-p"></p>
          </div>

          <div className="ct3-pg3">
            <img src="img-ct3-page3.png" />
            <h1 className="ct3-title">
              What is your <span id="title-ch-ct1">Digital Maps</span> Score & Why it’s Important
            </h1>
            <p className="ct3-p">
              From where we eat to where we visit, digital maps are more important in our lives than ever before. The
              Digital Maps Score reflects how likely your church is to show up on these digital navigation apps when
              someone searches for “churches near me,” If your church information isn’t listed correctly, they won’t
              find you.
            </p>
          </div>

          <div className="ct4-pg3">
            <div className="ct4-pg3-txt-img">
              <img src="img-ct4-page3.png" />
              <h1 className="ct3-title">Your Google Maps Search Score</h1>
            </div>
            <Circularbar value={googleMaps} title={undefined} max_value={119} />
          </div>

          <div className="ct5-pg3">
            <div className="ct4-pg3-txt-img">
              <img src="img-ct4-page3.png" />
              <h1 className="ct3-title">Your Apple Maps Search Score</h1>
            </div>
            <Circularbar value={applelMaps} title={undefined} max_value={119} />
          </div>
        </div>
      </section>

      <section id="page4">
        <div className="navbar">
          <img className="img-logo-nav" src="Logo.png" />
          <div className="nav-links">
            <div className="nav-child nav-page2">
              <img className="nav-img-logo" src="img-navbar1.png" />
              <a href="#page2">Digital Voice Score</a>
            </div>
            <div className="nav-child nav-page3">
              <img className="nav-img-logo" src="img-navbar2.png" />
              <a href="#page3">Digital Maps Score</a>
            </div>
            <div className="nav-child nav-page4">
              <img className="nav-img-logo" src="img-navbar3-blue.png" />
              <a href="#page4">Social Clarity Score</a>
            </div>
            <div className="nav-child nav-page5">
              <img className="nav-img-logo" src="img-navbar4.png" />
              <a href="#page5">Website Authority Score</a>
            </div>
            <div className="nav-child nav-page6">
              <img className="nav-img-logo" src="img-navbar5.png" />
              <a href="#page6">Digital Health Score</a>
            </div>
            <div className="nav-child nav-page7">
              <img className="nav-img-logo" src="img-navbar6.png" />
              <a href="#page7">Visitor Reach Process</a>
            </div>
          </div>
          <h1 id="nav-church-name">Dreamer’s Church</h1>
        </div>

        <div className="containers-pg4">
          <div className="ct1-pg4">
            <h1 className="ct1-title-pg4">
              Americans average <span id="title-ch-ct1">17.5 hours a week</span> on social media—{' '}
              <span id="title-ch-ct1">six</span> times more than they spend in church.
            </h1>
          </div>

          <div className="ct2-pg4">
            <img src="img-ct2-page4.png" />
            <br />
            <h1 className="ct1-title">
              What is your <span id="title-ch-ct1">Social Clarity</span> Score & Why does it Matter
            </h1>
            <br />
            <p className="ct1-p">
              Your Social Clarity Score reviews your church’s social information and validates whether your content is
              listed correctly and aligns with major directories. VisitorReach specializes in perfecting your social
              clarity score to maximize your digital reach through personalized marketing campaigns.
            </p>
          </div>

          <div className="ct3-pg4">
            <h1 className="ct3-title">Your Instagram Clarity Score</h1>
            <div className="img-txt-pg4">
              <img src="img-ct3-page4.png" />
              <h1>Failed</h1>
            </div>
            <p className="ct3-p">@dreamerschurchatx</p>
          </div>

          <div className="ct4-pg4">
            <h1 className="ct3-title">Your Facebook Clarity Score</h1>
            <div className="img-txt-pg4">
              <img src="img-ct4-page4.png" />
              <h1>Passed</h1>
            </div>
            <p className="ct3-p">Dreamer’s Church Austin</p>
          </div>
        </div>
      </section>

      <section id="page5">
        <div className="navbar">
          <img className="img-logo-nav" src="Logo.png" />
          <div className="nav-links">
            <div className="nav-child nav-page2">
              <img className="nav-img-logo" src="img-navbar1.png" />
              <a href="#page2">Digital Voice Score</a>
            </div>
            <div className="nav-child nav-page3">
              <img className="nav-img-logo" src="img-navbar2.png" />
              <a href="#page3">Digital Maps Score</a>
            </div>
            <div className="nav-child nav-page4">
              <img className="nav-img-logo" src="img-navbar3.png" />
              <a href="#page4">Social Clarity Score</a>
            </div>
            <div className="nav-child nav-page5">
              <img className="nav-img-logo" src="img-navbar4-blue.png" />
              <a href="#page5">Website Authority Score</a>
            </div>
            <div className="nav-child nav-page6">
              <img className="nav-img-logo" src="img-navbar5.png" />
              <a href="#page6">Digital Health Score</a>
            </div>
            <div className="nav-child nav-page7">
              <img className="nav-img-logo" src="img-navbar6.png" />
              <a href="#page7">Visitor Reach Process</a>
            </div>
          </div>
          <h1 id="nav-church-name">Dreamer’s Church</h1>
        </div>

        <div className="containers-pg5">
          <div className="ct1-pg5">
            <img src="img-ct1-page5.png" />
            <br />
            <h1 className="ct1-title-pg5">
              Why your <span id="title-ch-ct1">Website Authority Score</span> is Important
            </h1>
            <br />
            <p className="ct1-p">
              The #1 organic result is 10x more likely to receive a click compared to #10 spot. This makes having a
              well-ranking website extremely important. A strong online presence leads to more people finding your
              church, identifying with your mission and culture, and visiting your church.
            </p>
          </div>

          <div className="ct2-pg5">
            <h1 className="ct2-title-pg5">
              9 out of 10 people will visit your church website before ever visiting in-person
            </h1>
          </div>

          <div className="ct3-pg5">
            <h1 className="ct3-title">Your Church Website Authority Score</h1>
            <Circularbar value={websiteAuthority} title={undefined} max_value={250} />
          </div>

          <div className="ct4-pg5">
            <div className="ct4-pg5-text-img">
              <div className="ct4-pg5-text">
                <h1 className="ct3-title">Your Church’s Domain Keywords in Organic Search</h1>
                <p className="ct3-p">
                  The top 8 keywords or phrases your website is known for by Google and other search engines
                </p>
              </div>
              <img src="img-ct4-page5.png" />
            </div>
            <ul className="ul-pg5">
              <li>dreamer's church austin</li>
              <li>experience spirit-filled services in austin</li>
              <li>seeking churches in austin</li>
              <li>austin churches</li>
              <li>dreamer's church austin</li>
              <li>experience spirit-filled services in austin</li>
              <li>seeking churches in austin</li>
              <li>austin churches</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="page6">
        <div className="navbar">
          <img className="img-logo-nav" src="Logo.png" />
          <div className="nav-links">
            <div className="nav-child nav-page2">
              <img className="nav-img-logo" src="img-navbar1.png" />
              <a href="#page2">Digital Voice Score</a>
            </div>
            <div className="nav-child nav-page3">
              <img className="nav-img-logo" src="img-navbar2.png" />
              <a href="#page3">Digital Maps Score</a>
            </div>
            <div className="nav-child nav-page4">
              <img className="nav-img-logo" src="img-navbar3.png" />
              <a href="#page4">Social Clarity Score</a>
            </div>
            <div className="nav-child nav-page5">
              <img className="nav-img-logo" src="img-navbar4.png" />
              <a href="#page5">Website Authority Score</a>
            </div>
            <div className="nav-child nav-page6">
              <img className="nav-img-logo" src="img-navbar5-blue.png" />
              <a href="#page6">Digital Health Score</a>
            </div>
            <div className="nav-child nav-page7">
              <img className="nav-img-logo" src="img-navbar6.png" />
              <a href="#page7">Visitor Reach Process</a>
            </div>
          </div>
          <h1 id="nav-church-name">Dreamer’s Church</h1>
        </div>
        <div className="containers-pg6">
          <div className="ct1-pg6">
            <h1 className="ct1-title">Digital Health Score Summary</h1>
            <ScoreSummary
              digitalVoiceScore={digitalVoice}
              avgDigitalVoiceScore={vrVoice}
              digitalMapsScore={digitalMaps}
              avgDigitalMapsScore={vrMaps}
              socialClarityScore={socialClarity}
              avgSocialClarityScore={vrSocial}
              websiteAuthorityScore={websiteAuthority}
              avgWebsiteAuthorityScore={vrWebsite}
            />
          </div>
          <div className="ct2-pg6">
            <p className="ct2-p-pg6">
              What can your church do to improve your digital outreach strategy to engage those who are lost, hurting,
              and seeking the truth of the gospel message?
            </p>
          </div>
          <div className="ct3-pg6">
            <h1 className="ct3-title">Your Church’s Total Digital Health Score</h1>
            <Circularbar
              value={digitalVoice + digitalMaps + socialClarity + websiteAuthority}
              title={undefined}
              max_value={1000}
            />
            <br />
            <p className="ct3-p">
              If you’re surprised by your digital health score, you are not alone. Most churches are in the same boat.
            </p>
            <br />
            <img src="img-ct4-page6.png" alt="" />
            <br />
            <h2 className="ct3-title2">79% of churches</h2>
            <br />
            <p className="ct3-p">
              feel they don’t “have a well-defined digital ministry” for engaging nonbelievers or people outside their
              church community.
            </p>
          </div>
        </div>
      </section>

      <section id="page7">
        <div className="navbar">
          <img className="img-logo-nav" src="Logo.png" />
          <div className="nav-links">
            <div className="nav-child nav-page2">
              <img className="nav-img-logo" src="img-navbar1.png" />
              <a href="#page2">Digital Voice Score</a>
            </div>
            <div className="nav-child nav-page3">
              <img className="nav-img-logo" src="img-navbar2.png" />
              <a href="#page3">Digital Maps Score</a>
            </div>
            <div className="nav-child nav-page4">
              <img className="nav-img-logo" src="img-navbar3.png" />
              <a href="#page4">Social Clarity Score</a>
            </div>
            <div className="nav-child nav-page5">
              <img className="nav-img-logo" src="img-navbar4.png" />
              <a href="#page5">Website Authority Score</a>
            </div>
            <div className="nav-child nav-page6">
              <img className="nav-img-logo" src="img-navbar5.png" />
              <a href="#page6">Digital Health Score</a>
            </div>
            <div className="nav-child nav-page7">
              <img className="nav-img-logo" src="img-navbar6-blue.png" />
              <a href="#page7">Visitor Reach Process</a>
            </div>
          </div>
          <h1 id="nav-church-name">Dreamer’s Church</h1>
        </div>
        <div className="ct-pg7-title-text">
          <br />
          <h1 className="ct1-title-pg7">
            <span id="title-ch-ct1">VisitorReach™</span>—Your Digital Outreach Platform
          </h1>
          <br />
          <p>
            VisitorReach is much more than just a website optimization platform or advertising agency. It’s a digital
            outreach program empowering pastors to have continual and consistent 1:1 SMS{' '}
            <span id="title-ch-ct1">conversations with seekers and new people to your city.</span> Churches that partner
            with VisitorReach average 40–160 new conversations every month and see new visitors walking through their
            doors every week.
          </p>
          <br />
          <div className="containers-pg7">
            <div className="ct1-pg7">
              <img src="img-ct1-page7.png" alt="" />
              <br />
              <p className="ct1-p">
                "We had new people responding within hours, and we had people showing up to youth and weekend service
                within one week."
              </p>
              <br />
              <p>—The Father's House, Vacaville CA</p>
            </div>
            <div className="ct2-pg7">
              <br />
              <img src="img-ct2-page7.png" alt="" />
              <br />
              <p className="ct1-p">
                "Our team loves the simplicity of the VisitorReach platform. It is so easy to use the app, and the
                aiChurchTech assistance makes it so easy to stay up-to-date with all our new visitors."
              </p>
              <br />
              <p>—Jesus Culture, Sacramento, CA</p>
            </div>
          </div>
          <br />
          <h1 className="ct1-title-text-below">
            The VisitorReach Process - <br />
            <span id="title-ch-ct1">Created for Pastors, by Pastors</span>
          </h1>
          <img className="img-pg7" src="img-page7.png" alt="" />
        </div>
      </section>

      <section id="outro">
        <div className="ct-general">
          <div className="ct1-outro">
            <img className="img-logo-outro" src="img-logo-outro.png" />
            <div className="main-text">
              <h1 className="title2 ">
                Grow Your <span id="title-ch-ct1">Church</span>
                <br /> with VisitorReach
              </h1>
              <p className="p-outro">
                To learn more about VisitorReach,
                <span id="color-p-outro">
                  <a href="https://www.visitorreach.com/get-started">
                    schedule
                    <br />a quick 15 minute call
                  </a>
                </span>{' '}
                with our team today.
              </p>
            </div>
            <img className="img-qr-outro" src="img-qr-outro.png" alt="" />
          </div>
          <div className="ct2-outro"></div>
        </div>
      </section>
    </div>
  )
}
