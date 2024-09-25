const toc = document.getElementById("toc");
if (toc) {
    const mainElement = document.querySelector("main");
    const headings = Array.from(
        mainElement?.querySelectorAll("h2, h3") || [],
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute("id");
                const tocLink = document.querySelector(
                    `.toc a[href="#${id}"]`,
                );
                if (tocLink) {
                    if (entry.intersectionRatio > 0.1) {
                        tocLink.classList.add("active");
                    } else {
                        tocLink.classList.remove("active");
                    }
                }
            });
        },
        {
            rootMargin: "0px 0px -80% 0px",
            threshold: [0.1, 0.5, 1],
        },
    );

    headings.forEach((section) => {
        observer.observe(section);
    });

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const firstHeadingTop = headings[0].offsetTop;
                const lastHeadingBottom =
                    headings[headings.length - 1].offsetTop +
                    headings[headings.length - 1].offsetHeight;

                if (
                    scrollTop < firstHeadingTop ||
                    scrollTop > lastHeadingBottom
                ) {
                    toc.classList.add("hidden");
                } else {
                    toc.classList.remove("hidden");
                }

                // 手动计算当前视口中的标题
                let currentActive: HTMLElement | null = null;
                for (let i = 0; i < headings.length; i++) {
                    const heading = headings[i];
                    if (
                        heading.offsetTop <=
                        scrollTop + window.innerHeight / 2
                    ) {
                        currentActive = heading;
                    } else {
                        break;
                    }
                }

                // 设置相应的 TOC 链接为 active
                document
                    .querySelectorAll(".toc a")
                    .forEach((link) => {
                        link.classList.remove("active");
                    });
                if (currentActive) {
                    const id = currentActive.getAttribute("id");
                    const tocLink = document.querySelector(
                        `.toc a[href="#${id}"]`,
                    );
                    if (tocLink) {
                        tocLink.classList.add("active");
                    }
                }

                ticking = false;
            });

            ticking = true;
        }
    });
}
