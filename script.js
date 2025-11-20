// Configuration - Replace with your Pipedream webhook URL
const PIPEDREAM_WEBHOOK_URL = 'YOUR_PIPEDREAM_WEBHOOK_URL_HERE';

// Get current page identifier
const currentPage = window.location.pathname.includes('university2') ? 'university2' : 'university1';
const universityName = currentPage === 'university2' ? 'Global Excellence University' : 'TechVista University';

// Scroll to form function
function scrollToForm() {
    document.getElementById('leadForm').scrollIntoView({ behavior: 'smooth' });
}

// Download brochure function
function downloadBrochure() {
    // Create a simple PDF download simulation
    const link = document.createElement('a');
    link.href = `#brochure-${currentPage}`;
    link.download = `${universityName}-Brochure.pdf`;
    link.click();
    alert('Brochure download will start shortly. Thank you for your interest!');
}

// Modal functions
function openFeesModal() {
    const modal = document.getElementById('feesModal');
    modal.style.display = 'block';
    loadFeesData();
}

function closeFeesModal() {
    const modal = document.getElementById('feesModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('feesModal');
    if (event.target === modal) {
        closeFeesModal();
    }
}

// Load fees data from API
async function loadFeesData() {
    const feesContent = document.getElementById('feesContent');
    feesContent.innerHTML = '<p>Loading fees...</p>';

    try {
        // Try to fetch from API first
        const apiUrl = currentPage === 'university2' 
            ? '/api/fees/university2' 
            : '/api/fees/university1';
        
        const response = await fetch(apiUrl);
        
        if (response.ok) {
            const data = await response.json();
            displayFees(data);
        } else {
            // Fallback to static data
            displayFees(getStaticFeesData());
        }
    } catch (error) {
        console.error('Error loading fees:', error);
        // Fallback to static data
        displayFees(getStaticFeesData());
    }
}

// Get static fees data as fallback
function getStaticFeesData() {
    if (currentPage === 'university2') {
        return {
            courses: [
                { name: 'B.Tech AI', annual: '₹2,50,000', total: '₹10,00,000' },
                { name: 'B.Tech Data Science', annual: '₹2,50,000', total: '₹10,00,000' },
                { name: 'B.Tech Robotics', annual: '₹2,40,000', total: '₹9,60,000' },
                { name: 'B.Tech Electrical', annual: '₹2,20,000', total: '₹8,80,000' },
                { name: 'B.Tech Chemical', annual: '₹2,20,000', total: '₹8,80,000' },
                { name: 'MBA', annual: '₹3,50,000', total: '₹7,00,000' },
                { name: 'BBA', annual: '₹1,80,000', total: '₹5,40,000' },
                { name: 'BCA', annual: '₹1,50,000', total: '₹4,50,000' },
                { name: 'MCA', annual: '₹2,00,000', total: '₹4,00,000' },
                { name: 'B.Arch', annual: '₹2,80,000', total: '₹14,00,000' },
                { name: 'B.Des', annual: '₹2,60,000', total: '₹13,00,000' },
                { name: 'B.Pharm', annual: '₹2,00,000', total: '₹8,00,000' }
            ]
        };
    } else {
        return {
            courses: [
                { name: 'B.Tech Computer Science', annual: '₹2,20,000', total: '₹8,80,000' },
                { name: 'B.Tech Mechanical', annual: '₹2,00,000', total: '₹8,00,000' },
                { name: 'B.Tech Civil', annual: '₹2,00,000', total: '₹8,00,000' },
                { name: 'B.Tech Electronics', annual: '₹2,10,000', total: '₹8,40,000' },
                { name: 'MBA', annual: '₹3,00,000', total: '₹6,00,000' },
                { name: 'BBA', annual: '₹1,50,000', total: '₹4,50,000' },
                { name: 'BCA', annual: '₹1,20,000', total: '₹3,60,000' },
                { name: 'MCA', annual: '₹1,80,000', total: '₹3,60,000' },
                { name: 'BA LLB', annual: '₹1,80,000', total: '₹9,00,000' },
                { name: 'BBA LLB', annual: '₹2,00,000', total: '₹10,00,000' }
            ]
        };
    }
}

// Display fees in modal
function displayFees(data) {
    const feesContent = document.getElementById('feesContent');
    
    if (!data || !data.courses || data.courses.length === 0) {
        feesContent.innerHTML = '<p>Fee information not available at the moment.</p>';
        return;
    }

    let html = '<div class="fees-list">';
    data.courses.forEach(course => {
        html += `
            <div class="fee-item">
                <h4>${course.name}</h4>
                <p><strong>Annual Fee:</strong> ${course.annual}</p>
                <p><strong>Total Fee:</strong> ${course.total}</p>
            </div>
        `;
    });
    html += '</div>';
    
    feesContent.innerHTML = html;
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadFormElement');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                state: document.getElementById('state').value,
                course: document.getElementById('course').value,
                intakeYear: document.getElementById('intakeYear').value,
                consent: document.getElementById('consent').checked,
                university: universityName,
                source: currentPage,
                timestamp: new Date().toISOString()
            };

            // Validate phone number
            if (!/^[0-9]{10}$/.test(formData.phone)) {
                showMessage('Please enter a valid 10-digit phone number.', 'error');
                return;
            }

            // Validate consent
            if (!formData.consent) {
                showMessage('Please provide consent to proceed.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            try {
                // Submit to Pipedream
                if (PIPEDREAM_WEBHOOK_URL && PIPEDREAM_WEBHOOK_URL !== 'YOUR_PIPEDREAM_WEBHOOK_URL_HERE') {
                    const response = await fetch(PIPEDREAM_WEBHOOK_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        showMessage('Thank you! Your application has been submitted successfully. We will contact you soon.', 'success');
                        form.reset();
                    } else {
                        throw new Error('Submission failed');
                    }
                } else {
                    // Fallback: Store in localStorage and show success
                    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
                    submissions.push(formData);
                    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
                    
                    showMessage('Thank you! Your application has been submitted successfully. We will contact you soon.', 'success');
                    form.reset();
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showMessage('There was an error submitting your form. Please try again later.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Show message function
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

