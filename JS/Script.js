/* ============================================================
   WHISKERS CAFÉ - Main JavaScript File
   Unit 15: Website Development
   ============================================================
   This file handles:
   1. Responsive navigation toggle (hamburger menu)
   2. Our Cats page – filter buttons
   3. Bookings page – form validation (follows pseudocode spec)
   ============================================================ */


/* ===========================================================
   1. NAVIGATION TOGGLE
   Shows/hides the mobile nav menu when the hamburger is clicked
   =========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // Select the hamburger toggle button and the nav links list
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  // Only run if both elements exist on the current page
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      // Toggle the 'open' CSS class which displays the menu
      navLinks.classList.toggle('open');

      // Update aria-expanded for accessibility screen readers
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a link is tapped
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }


  /* ===========================================================
     2. OUR CATS PAGE – FILTER BUTTONS
     Filters the cat cards by clicking specific Age / Personality / Status values
     =========================================================== */

  const filterBtns = document.querySelectorAll('.filter-btn');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {

        // Remove active styling from all filter buttons
        filterBtns.forEach(function (b) { b.classList.remove('active-filter'); });

        // Mark the clicked button as active
        btn.classList.add('active-filter');

        // Read which attribute and value to filter by
        const attr = btn.getAttribute('data-attr');
        const value = btn.getAttribute('data-value');

        // Get all cat cards on the page
        const catCards = document.querySelectorAll('.cat-card');

        catCards.forEach(function (card) {
          // 'all' shows every card; otherwise match against data attributes
          if (attr === 'all' && value === 'all') {
            card.style.display = '';   // Show card (reset to default display)
          } else {
            // Get the card's data attribute value for the chosen filter
            const cardValue = card.getAttribute('data-' + attr);

            // Show card only if its attribute matches the filter value
            if (cardValue === value) {
              card.style.display = '';   // Card matches – show it
            } else {
              card.style.display = 'none';  // No match – hide it
            }
          }
        });
      });
    });
  }


  /* ===========================================================
     3. BOOKINGS PAGE – FORM VALIDATION
     Follows the pseudocode logic from the specification exactly:

     BEGIN
       DISPLAY booking form
       INPUT fullName
       INPUT email
       INPUT bookingDate
       INPUT bookingTime
       IF fullName is empty OR email is empty OR
          bookingDate is empty OR bookingTime is empty THEN
         DISPLAY "Please complete all fields."
       ELSE
         IF termsAccepted = FALSE THEN
           DISPLAY "Please accept the terms and conditions."
         ELSE
           DISPLAY "Booking successful!"
           DISPLAY "Thank you for booking a visit."
         ENDIF
       ENDIF
     END
     =========================================================== */

  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {

    bookingForm.addEventListener('submit', function (event) {
      // Prevent the browser from submitting and reloading the page
      event.preventDefault();

      // ── Collect form field values ──
      const fullName    = document.getElementById('fullName').value.trim();
      const email       = document.getElementById('email').value.trim();
      const bookingDate = document.getElementById('bookingDate').value.trim();
      const bookingTime = document.getElementById('bookingTime').value;
      const guests      = document.getElementById('guests').value;
      const terms       = document.getElementById('terms').checked;

      // Reference the inline error / success display elements
      const formErrorEl   = document.getElementById('formError');
      const successMsgEl  = document.getElementById('successMessage');

      // Clear any previous error message before re-validating
      formErrorEl.style.display  = 'none';
      formErrorEl.textContent    = '';
      successMsgEl.style.display = 'none';

      // ── Step 1: Check all required fields are filled ──
      // (Pseudocode: IF fullName is empty OR email is empty OR
      //              bookingDate is empty OR bookingTime is empty)
      if (fullName === '' || email === '' || bookingDate === '' || bookingTime === '') {
        // DISPLAY "Please complete all fields."
        formErrorEl.textContent    = 'Please complete all required fields.';
        formErrorEl.style.display  = 'block';
        formErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;   // Stop here – do not proceed
      }

      // ── Step 2: Check terms and conditions are accepted ──
      // (Pseudocode: IF termsAccepted = FALSE)
      if (!terms) {
        // DISPLAY "Please accept the terms and conditions."
        formErrorEl.textContent   = 'Please accept the terms and conditions to continue.';
        formErrorEl.style.display = 'block';
        formErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;   // Stop here – do not proceed
      }

      // ── Step 3: All validation passed ──
      // (Pseudocode: DISPLAY "Booking successful!"
      //              DISPLAY "Thank you for booking a visit.")

      // Hide the form and show the animated success message
      bookingForm.style.display  = 'none';
      successMsgEl.style.display = 'block';
      successMsgEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Populate the success message with the user's name and booking details
      document.getElementById('successName').textContent    = fullName;
      document.getElementById('successDate').textContent    = bookingDate;
      document.getElementById('successTime').textContent    = bookingTime;
      document.getElementById('successGuests').textContent  = guests;

    }); // end submit handler

  } // end if bookingForm

}); // end DOMContentLoaded