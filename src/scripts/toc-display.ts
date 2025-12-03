const toc = document.getElementById('toc');
if (toc) {
  const mainElement = document.querySelector('main');
  const headings = Array.from(mainElement?.querySelectorAll('h2, h3') || []) as HTMLElement[];

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const firstHeadingTop = headings[0].offsetTop;
        const lastHeadingBottom =
          headings[headings.length - 1].offsetTop + headings[headings.length - 1].offsetHeight;

        if (scrollTop < firstHeadingTop || scrollTop > lastHeadingBottom) {
          toc.classList.remove('visible');
        } else {
          toc.classList.add('visible');
        }

        // Calculate the heading currently in the viewport
        let currentActive: HTMLElement | null = null;
        for (let i = 0; i < headings.length; i++) {
          const heading = headings[i];
          if (heading.offsetTop <= scrollTop + 50 /* 50px to trigger early */) {
            currentActive = heading;
          } else {
            break;
          }
        }

        // Set the corresponding TOC link to active
        document.querySelectorAll('.toc a').forEach((link) => {
          link.classList.remove('active');
        });
        if (currentActive) {
          const id = currentActive.getAttribute('id');
          const tocLink = document.querySelector(`.toc a[href="#${id}"]`);
          if (tocLink) {
            tocLink.classList.add('active');
            // Scroll the currently active TOC link into view
            tocLink.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
            });
          }
        }

        ticking = false;
      });

      ticking = true;
    }
  });
}
