function Placements({ data }) {
  return (
    <section className="section placements">
      <div className="container">
        <h2 className="section-title">Placements</h2>
        <div className="stats-grid">
          {data.stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="companies">
          <h3>Top Recruiters</h3>
          <div className="company-logos">
            {data.companies.map((company, index) => (
              <span key={index}>{company}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Placements

