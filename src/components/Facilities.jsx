function Facilities({ facilities }) {
  return (
    <section className="section facilities">
      <div className="container">
        <h2 className="section-title">Facilities</h2>
        <div className="facilities-grid">
          {facilities.map((facility, index) => (
            <div key={index} className="facility-card">
              <h3>{facility.icon} {facility.title}</h3>
              <p>{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Facilities

