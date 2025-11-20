function Hero({ data, onCheckFees, onDownloadBrochure, onApplyNow }) {
  return (
    <section className={`hero ${data.heroClass}`}>
      <div className="container">
        <h1 className="hero-title">{data.name}</h1>
        <p className="hero-subtitle">{data.subtitle}</p>
        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={onCheckFees}>
            Check Course-wise Fees
          </button>
          <button className="btn btn-secondary" onClick={onDownloadBrochure}>
            Download Brochure
          </button>
          <button className="btn btn-accent" onClick={onApplyNow}>
            Apply Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero

