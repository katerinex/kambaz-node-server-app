// Get the toggle buttons and navigation elements
const kambazToggle = document.getElementById('kambaz-navigation-toggle');
const kambazNavigation = document.getElementById('wd-courses-navigation');
const courseToggle = document.getElementById('course-navigation-toggle');
const courseStatus = document.getElementById('wd-course-status');

// Add event listeners to the toggle buttons
kambazToggle.addEventListener('click', () => {
  kambazNavigation.classList.toggle('show');
});

courseToggle.addEventListener('click', () => {
  courseStatus.classList.toggle('show');
});

// Add these buttons to your JSX:
{/* Kambaz Navigation Toggle */}
<button id="kambaz-navigation-toggle">
  {/* Add an icon or text for the toggle */}
  <i className="fas fa-bars"></i> {/* Example using Font Awesome */}
</button>

{/* Course Navigation Toggle */}
<button id="course-navigation-toggle">
  {/* Add an icon or text for the toggle */}
  <i className="fas fa-bars"></i> {/* Example using Font Awesome */}
</button>