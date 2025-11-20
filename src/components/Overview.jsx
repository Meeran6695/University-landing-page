function Overview({ data }) {
  return (
    <section className="section overview">
      <div className="container">
        <h2 className="section-title">University Overview</h2>
        <div className="content-grid">
          <div className="content-card">
            <h3>About Us</h3>
            <p>{data.about}</p>
          </div>
          <div className="content-card">
            <h3>Accreditations</h3>
            <ul>
              {data.accreditations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="content-card">
            <h3>Why Choose Us</h3>
            <ul>
              {data.whyChoose.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview

