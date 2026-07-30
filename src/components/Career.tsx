import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Selected work <span>&amp;</span>
          <br /> product journey
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AJAY NXT</h4>
                <h5>Creative digital studio</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building websites, app experiences, video edits and visual systems
              for businesses in India and global markets.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Diamond Restaurants</h4>
                <h5>Client website + controls</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Premium responsive website for a restaurant, bakery and sweets brand,
              with an easy content-management workflow and complete handover.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Rajmahal Palace</h4>
                <h5>Luxury hospitality demo</h5>
              </div>
              <h3>DEMO</h3>
            </div>
            <p>
              A cinematic palace-style web concept created to demonstrate premium
              hospitality direction, motion and visual storytelling.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Move To Go</h4>
                <h5>Mobility product concept</h5>
              </div>
              <h3>BUILD</h3>
            </div>
            <p>
              Customer app, rider app and admin dashboard architecture for rides,
              parcel delivery, live tracking, OTP flows and operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
