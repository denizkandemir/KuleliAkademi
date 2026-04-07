import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const useFadeInOnScroll = (selector = '.fade-in, .fade-in-left, .fade-in-right', shouldRun = true) => {
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!shouldRun) return;

    // Remove 'show' class from all elements first
    const allElements = document.querySelectorAll(selector);
    allElements.forEach(element => element.classList.remove('show'));

    const elements = document.querySelectorAll(selector);

    if (elements.length > 0) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.26 }
      );

      elements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }
  }, [selector, params, location, shouldRun]);
};

export default useFadeInOnScroll;
