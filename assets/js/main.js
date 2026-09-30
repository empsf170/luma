document.addEventListener("DOMContentLoaded", () => {
    const top = document.querySelector(".top");
    const links = [...document.querySelectorAll(".nav-link")];
    const nav = document.querySelector("#eventNav");
    const sections = [...document.querySelectorAll("main section[id]")];

    const setActive = (id) => {
        links.forEach(link => {
            const active = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", active);
            link.setAttribute("aria-current", active ? "page" : "false");
        });
    };

    const updateActive = () => {
        let current = "home";
        const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 260);

        sections.forEach(section => {
            if (marker >= section.offsetTop) current = section.id;
        });

        setActive(current);
        top?.classList.toggle("show", window.scrollY > 450);
    };

    links.forEach(link => {
        link.addEventListener("click", () => {
            const id = link.getAttribute("href").replace("#", "");
            setActive(id);

            // Close the Bootstrap mobile menu after selecting a page section.
            if (nav?.classList.contains("show") && window.bootstrap) {
                const collapse = bootstrap.Collapse.getOrCreateInstance(nav);
                collapse.hide();
            }
        });
    });

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    top?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActive("home");
    });

    document.querySelector("#contact form")?.addEventListener("submit", e => {
        e.preventDefault();
        alert("Thank you. We will be in touch shortly.");
        e.target.reset();
    });

    setActive("home");
    updateActive();
});
