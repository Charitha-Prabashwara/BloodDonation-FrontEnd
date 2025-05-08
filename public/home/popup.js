document.addEventListener('DOMContentLoaded', function() {
    // Create popup HTML structure
    const popupHTML = `
        <div class="popup-content">
            <button class="close-btn" id="closePopup">&times;</button>
            <div class="blood-icon">🩸</div>
            <h2 class="blood-donation-title">Life-Saving Blood Donation Camp Today!</h2>
            <div class="blood-donation-details">
                <p>Join us in our mission to save lives by donating blood at our community camp.</p>
                <div class="highlight-box">
                    <p><span class="highlight">Date:</span> <span id="currentDate"></span> (Today)</p>
                    <p><span class="highlight">Time:</span> 9:00 AM - 5:00 PM</p>
                    <p><span class="highlight">Location:</span> City Community Center, 123 Health Ave</p>
                </div>
                <p>Each donation can save up to <span class="highlight">3 lives</span>. Walk-ins welcome!</p>
            </div>
            <button class="cta-button">Register Now</button>
            <p style="font-size: 0.8rem; margin-top: 1rem; color: #666;">Eligibility: 18-65 years, >50kg weight, good health</p>
        </div>
    `;

    // Create popup container if it doesn't exist
    let popupContainer = document.getElementById('bloodDonationPopup');
    if (!popupContainer) {
        popupContainer = document.createElement('div');
        popupContainer.id = 'bloodDonationPopup';
        popupContainer.className = 'popup-overlay';
        document.body.appendChild(popupContainer);
    }
    
    // Insert popup content
    popupContainer.innerHTML = popupHTML;

    // Show popup with delay
    setTimeout(function() {
        popupContainer.style.display = 'flex';
        
        // Set current date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        document.getElementById('currentDate').textContent = today.toLocaleDateString('en-US', options);
    }, 1000);

    // Close functionality
    document.addEventListener('click', function(e) {
        // Close button
        if (e.target && e.target.id === 'closePopup') {
            popupContainer.style.display = 'none';
            localStorage.setItem('bloodDonationPopupClosed', 'true');
        }
        
        // Click outside content
        if (e.target === popupContainer) {
            popupContainer.style.display = 'none';
            localStorage.setItem('bloodDonationPopupClosed', 'true');
        }
    });

    // Check localStorage for previously closed popup
    if (localStorage.getItem('bloodDonationPopupClosed')) {
        popupContainer.style.display = 'none';
    }
});