"use client";

import { useEffect, useRef } from "react";
import styles from "../app/stacked/Stickycolumns.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


export default function StickyColumns() {
    const sectionRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {

        // Text split — uses global .sc-line class (defined in CSS module as :global)
        const section = sectionRef.current as HTMLElement | null;
        if (!section) return;
        section.querySelectorAll(`.${styles.col3} h1, .${styles.col3} p`).forEach((el: { textContent: any; innerHTML: string; }) => {
            const text = el.textContent;
            el.innerHTML = `<div class="sc-line"><span>${text}</span></div>`;
        });

        gsap.set(`.${styles.col3} .${styles.ccw} .sc-line span`, { y: "0%" });
        gsap.set(`.${styles.col3} .${styles.ccw2} .sc-line span`, { y: "-125%" });
        const c1 = `.${styles.col1}`;
        const c2 = `.${styles.col2}`;
        const c3 = `.${styles.col3}`;
        const c4 = `.${styles.col4}`;
        const ci1 = `.${styles.cimg1}`;
        const ci2 = `.${styles.cimg2}`;
        const ccw = `.${styles.col3} .${styles.ccw}  .sc-line span`;
        const ccw2 = `.${styles.col3} .${styles.ccw2} .sc-line span`;

        const EASE = "power3.inOut";
        const DUR = 1.0;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${window.innerHeight * 4}px`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                snap: {
                    snapTo: [0, 0.375, 0.875, 1], // [0, 1.5/4, 3.5/4, 1]
                    duration: { min: 0.4, max: 0.8 },
                    delay: 0,
                    ease: "power1.inOut",
                    inertia: false
                }
            }
        });

        tl.addLabel("phase1", 0)
            /* forward 0 → 1 */
            .to(c1, { opacity: 0, scale: 0.75, duration: DUR, ease: EASE }, "phase1")
            .to(c2, { x: "0%", duration: DUR, ease: EASE }, "phase1")
            .to(c3, { y: "0%", duration: DUR, ease: EASE }, "phase1")
            .to(`${ci1} img`, { scale: 1.25, duration: DUR, ease: EASE }, "phase1")
            .to(ci2, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: DUR, ease: EASE }, "phase1")
            .to(`${ci2} img`, { scale: 1, duration: DUR, ease: EASE }, "phase1")

            .addLabel("phase2", 2)
            /* forward 1 → 2 */
            .to(c2, { opacity: 0, scale: 0.75, duration: DUR, ease: EASE }, "phase2")
            .to(c3, { x: "0%", duration: DUR, ease: EASE }, "phase2")
            .to(c4, { y: "0%", duration: DUR, ease: EASE }, "phase2")
            .to(ccw, { y: "-125%", duration: DUR, ease: EASE }, "phase2")
            .to(ccw2, { y: "0%", duration: DUR - 0.2, ease: EASE }, "phase2+=0.2")

            /* Sticky Buffer & End Pause */
            .to({}, { duration: 1.0 })
            .addLabel("end");

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div className={styles.mainContainer}>
            <section className={styles.section} ref={sectionRef}>
                <div className={styles.wrapper}>

                    {/* Col 1 — text */}
                    <div className={`${styles.col} ${styles.col1}`}>
                        <div className={styles.content}>
                            <div className={styles.contentWrapper}>
                                <img src="/Isolation_Mode.svg" alt="Mesh detail" className="absolute top-0 right-[-5%] w-64 h-64  pointer-events-none " />
                                <div className={`${styles.ccw} !h-full !flex !flex-col !justify-between  `}>
                                    <div className="flex flex-col items-start gap-2 ml-7">
                                        <img src="/logocard.svg" alt="Smooth Optics" className="w-[160px] h-auto object-contain" />
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg mt-3" style={{ color: 'var(--sc-fg-200)' }}>Characteristics</h3>
                                        </div>
                                        <div className="flex flex-col gap-4 text-[1.05rem] leading-[1.6] text-[var(--sc-fg-100)] opacity-90">
                                            <p className="m-0">Smooth Optics is the stand out innovation in the lens sector. The process for creating Smooth Optics designs starts by defining the lens surface in terms of its optical properties.</p>
                                            <p className="m-0">This PATENTED approach reverses the normal design process, so rather than create a surface and analyze to determine its optical performance, the starting point is describing the mean power required by the eye at all points of the lens and then deriving the surface to match this ideal.</p>
                                            <p className="m-0">The mean power profile is more even and smoother, not only in the principal viewing zones, but also the peripheral areas.</p>
                                        </div>
                                    </div>
                                    <div className="mt-7 flex justify-start ml-7 pb-2">
                                        <img src="/imgbottom.png" alt="Smooth Optics Comparison" className="w-full max-w-[300px] h-auto " />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col 2 — two images stacked */}
                    <div className={`${styles.col} ${styles.col2}`}>
                        <div className={`${styles.img} ${styles.cimg1}`}>
                            <div className={styles.imgWrapper} style={{ background: "#c5b8a8" }}>
                                <img src="/about-optika2.jpg" alt="Living room" />
                            </div>
                        </div>
                        <div className={`${styles.img} ${styles.cimg2}`}>
                            <div className={styles.imgWrapper} style={{ background: "#b0a090" }}>
                                <img src="/hero.jpg" alt="Sofa" />
                            </div>
                        </div>
                    </div>

                    {/* Col 3 — swappable text */}
                    <div className={`${styles.col} ${styles.col3}`}>
                        <div className={styles.content}>
                            <div className={styles.contentWrapper}>
                                <img src="/Isolation_Mode.svg" alt="Mesh detail" className="absolute top-0 right-[-5%] w-64 h-64  pointer-events-none " />
                                <div className={`${styles.ccw} !h-full !flex !flex-col !justify-between  `}>
                                    <div className="flex flex-col items-start gap-2 ml-7">
                                        <img src="/logocard.svg" alt="Smooth Optics" className="w-[160px] h-auto object-contain" />
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg mt-3" style={{ color: 'var(--sc-fg-200)' }}>Characteristics</h3>
                                        </div>
                                        <div className="flex flex-col gap-4 text-[1.05rem] leading-[1.6] text-[var(--sc-fg-100)] opacity-90">
                                            <p className="m-0">Smooth Optics is the stand out innovation in the lens sector. The process for creating Smooth Optics designs starts by defining the lens surface in terms of its optical properties.</p>
                                            <p className="m-0">This PATENTED approach reverses the normal design process, so rather than create a surface and analyze to determine its optical performance, the starting point is describing the mean power required by the eye at all points of the lens and then deriving the surface to match this ideal.</p>
                                            <p className="m-0">The mean power profile is more even and smoother, not only in the principal viewing zones, but also the peripheral areas.</p>
                                        </div>
                                    </div>
                                    <div className="mt-7 flex justify-start ml-7 pb-2">
                                        <img src="/imgbottom.png" alt="Smooth Optics Comparison" className="w-full max-w-[300px] h-auto" />
                                    </div>
                                </div>
                                <div className={`${styles.ccw2} !h-full !flex !flex-col !justify-between  `}>
                                    <div className="flex flex-col items-start gap-2 ml-7">
                                        <img src="/logocard.svg" alt="Smooth Optics" className="w-[160px] h-auto object-contain" />
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg mt-3" style={{ color: 'var(--sc-fg-200)' }}>Characteristics</h3>
                                        </div>
                                        <div className="flex flex-col gap-4 text-[1.05rem] leading-[1.6] text-[var(--sc-fg-100)] opacity-90">
                                            <p className="m-0">Smooth Optics is the stand out innovation in the lens sector. The process for creating Smooth Optics designs starts by defining the lens surface in terms of its optical properties.</p>
                                            <p className="m-0">This PATENTED approach reverses the normal design process, so rather than create a surface and analyze to determine its optical performance, the starting point is describing the mean power required by the eye at all points of the lens and then deriving the surface to match this ideal.</p>
                                            <p className="m-0">The mean power profile is more even and smoother, not only in the principal viewing zones, but also the peripheral areas.</p>
                                        </div>
                                    </div>
                                    <div className="mt-7 flex justify-start ml-7 pb-2">
                                        <img src="/imgbottom.png" alt="Smooth Optics Comparison" className="w-full max-w-[300px] h-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col 4 — single image */}
                    <div className={`${styles.col} ${styles.col4}`}>
                        <div className={styles.img}>
                            <div className={styles.imgWrapper} >
                                <img src="/about-optika.jpg" alt="Interior space" className="object-left" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className={styles.revealMessage}>
                <p>Ready for an adventure?</p>
            </div>
        </div>
    );
}