function Fees({ onViewFees }) {
  return (
    <section className="section fees">
      <div className="container">
        <h2 className="section-title">Fee Structure</h2>
        <div className="fees-info">
          <p>
            Our fee structure is designed to be affordable while maintaining high-quality education standards. 
            Fees vary by course and include tuition, library, and laboratory charges.
          </p>
          <button className="btn btn-primary" onClick={onViewFees}>
            View Detailed Fee Structure
          </button>
        </div>
      </div>
    </section>
  )
}

export default Fees

