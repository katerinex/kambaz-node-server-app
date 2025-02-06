// src/toggleNavigation.js

// src/components/KambazNavigation.js
import { useEffect } from "react";

export default function KambazNavigation() {
  useEffect(() => {
    // Get the DOM elements after the component is mounted
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

    // Cleanup the event listeners when the component unmounts
    return () => {
      kambazToggle.removeEventListener('click', () => {
        kambazNavigation.classList.toggle('show');
      });
      courseToggle.removeEventListener('click', () => {
        courseStatus.classList.toggle('show');
      });
    };
  }, []);

  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center"
    >
      {/* NEU Logo */}
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0"
      >
        <img src="/images/NEU-logo.svg" width="75px" alt="NEU Logo" />
      </a>

      {/* Account */}
      <button id="kambaz-navigation-toggle" className="list-group-item text-white bg-black border-0 py-3">
        {/* Add an icon or text for the toggle */}
        <i className="fas fa-bars"></i>
        <br />
        Kambaz Navigation
      </button>

      {/* Dashboard (Active Link) */}
      <button id="course-navigation-toggle" className="list-group-item text-white bg-black border-0 py-3">
        {/* Add an icon or text for the toggle */}
        <i className="fas fa-bars"></i>
        <br />
        Course Navigation
      </button>

      {/* The Sections that toggle visibility */}
      <div id="wd-courses-navigation" className="collapse">
        <ul>
          <li>
            <a href="/Kambaz/Account">Account</a>
          </li>
          <li>
            <a href="/Kambaz/Dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/Kambaz/Courses">Courses</a>
          </li>
        </ul>
      </div>

      <div id="wd-course-status" className="collapse">
        <ul>
          <li>
            <a href="/Kambaz/Calendar">Calendar</a>
          </li>
          <li>
            <a href="/Kambaz/Inbox">Inbox</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
