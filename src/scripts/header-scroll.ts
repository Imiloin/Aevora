// Hide or show the header when scrolling the page
const header = document.getElementById('header');

let lastScrollTop = 0;
let isTOCClick = false;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (header && !isTOCClick) {
    if (scrollTop > lastScrollTop) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  }
  lastScrollTop = scrollTop;
  isTOCClick = false;
});

// Hide header when clicking in-page anchor links (e.g. TOC)
document.querySelectorAll('a[href*="#"]').forEach((link) => {
  if (header) {
    link.addEventListener('click', () => {
      isTOCClick = true;
      header.style.transform = 'translateY(-100%)';
    });
  }
});
