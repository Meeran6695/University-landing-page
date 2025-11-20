import { useRef } from 'react'
import Hero from './Hero'
import Overview from './Overview'
import Courses from './Courses'
import Fees from './Fees'
import Placements from './Placements'
import Facilities from './Facilities'
import LeadForm from './LeadForm'
import Footer from './Footer'
import FeesModal from './FeesModal'
import { useState } from 'react'

function UniversityPage({ data }) {
  const formRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openFeesModal = () => {
    setIsModalOpen(true)
  }

  const closeFeesModal = () => {
    setIsModalOpen(false)
  }

  const downloadBrochure = () => {
    alert(`Brochure download will start shortly. Thank you for your interest in ${data.name}!`)
  }

  return (
    <>
      <Hero
        data={data}
        onCheckFees={openFeesModal}
        onDownloadBrochure={downloadBrochure}
        onApplyNow={scrollToForm}
      />
      <Overview data={data.overview} />
      <Courses courses={data.courses} />
      <Fees onViewFees={openFeesModal} />
      <Placements data={data.placements} />
      <Facilities facilities={data.facilities} />
      <div ref={formRef}>
        <LeadForm
          universityName={data.name}
          currentPage={data.currentPage}
          courseOptions={data.courseOptions}
        />
      </div>
      <Footer universityName={data.name} />
      <FeesModal
        isOpen={isModalOpen}
        onClose={closeFeesModal}
        feesData={data.fees}
        currentPage={data.currentPage}
      />
    </>
  )
}

export default UniversityPage

