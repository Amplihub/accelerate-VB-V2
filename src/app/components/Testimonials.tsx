import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/pagination";
import "./Testimonials.css";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power2.out";
const DURATION = 0.7;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Autoplay only resumes from here up — matches the source behaviour.
function isTabletUp() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
}

/* ── Part 1 data — video testimonials ───────────────────────────
   Deduped from the source markup, which repeated several slides for
   loop buffering. Swiper 11 shifts real slides instead of cloning
   them, so the 9 unique entries below are all the loop needs.
   Two entries ship as .mov — see the note in the section comment. */
type VideoTestimonial = {
  name: string;
  role: string;
  video: string;
  poster?: string;
};

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "Vajira Weerasekera",
    role: "Founder, Veritas Human Edge",
    video: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a3954d721502f4c61ef9a94.mp4",
    poster: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a3d4c32163e40d86234ba9b.jpg",
  },
  {
    name: "Arjun Paliwal",
    role: "Founder & CEO, InvestorKit",
    video: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/6a2f6b8ad7e5b817778d7231.mp4",
    // No poster in the source — falls back to the neutral placeholder.
  },
  {
    name: "Robert Herjavec",
    role: "@SharkTank",
    video: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/691181d0c3a1ea5c0423b2f2.mp4",
    poster: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68e0ce34b0f3d8cdc4217b87.png",
  },
  {
    name: "Daniel Trkulja",
    role: "Founder, ThreadLabs",
    video: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68e73867468f553fc2b095ce.mp4",
    poster: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68e69669d855cfce7f3078e8.png",
  },
  {
    name: "Maxine Horne",
    role: "CEO, Vita Group",
    video: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/697b0f891543e6a3417649a0.mp4",
    poster: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/697b28f204b05b401843bd7b.png",
  },
  {
    name: "Shaveen Bandaranayake",
    role: "Founder, TheLawSimplified",
    video: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/69217880a6ad080aaed33340.mp4",
    poster: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/69217a1847e1036d047cfb06.png",
  },
  {
    name: "Ishini Saparamadu",
    role: "CEO, Concolabs",
    video: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68e73867468f55d622b095cc.mp4",
    poster: "https://storage.googleapis.com/msgsndr/0JdcK8nm75u9Gb745fHy/media/68dfcb0d94a323597bb79f5e.png",
  },
  {
    name: "Kaushi Gunasekera",
    role: "CEO, mortgagepremiers",
    video: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69e0ecc18696a78b8d5462a9.mov",
    poster: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69e0ee6f83b092a6c7ac1b16.jpg",
  },
  {
    name: "Roshini Marasinghe",
    role: "CEO, Cloverone",
    video: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69e0ed890b562c72811362cf.mov",
    poster: "https://assets.cdn.filesafe.space/0JdcK8nm75u9Gb745fHy/media/69e0f5702c135a8c838bbd26.png",
  },
];

/* ── Part 2 data — text testimonials ────────────────────────────
   ⚠️ DEV NOTE — these are real client quotes. The source copy named
   "Editoz Club" and "Chali"; those have been swapped to "Accelerate"
   / "the team" as instructed, but every substitution below still
   needs a read-through by whoever owns the client relationship
   before this ships. Substituted spots are flagged inline.

   ⚠️ DEV NOTE — no profile photo URLs came through with the source.
   Each entry falls back to a brand-tinted initials tile; drop the
   real image URL into `photo` to replace it. */
type TextTestimonial = {
  name: string;
  company: string;
  title: string;
  quote: string;
  photo?: string;
};

const TEXT_TESTIMONIALS: TextTestimonial[] = [
  {
    name: "Daniel Lubetzky",
    company: "KIND Snacks",
    title: "We are glad to count them as an extension of our team",
    // "Chali and the team at Editoz Club" → "Accelerate"
    quote:
      "It has been a pleasure partnering with Accelerate and the team. Their entrepreneurial spirit and commitment to ambitious goals are evident in everything they do — but what sets them apart is their ability to translate brand values into short-form content that travels. They have played a meaningful role in jump-starting our social media growth, and we are glad to count them as an extension of our team.",
  },
  {
    name: "Maxine Horne",
    company: "@SharkTank",
    title: "Nothing is ever too much trouble",
    // "Editoz Club" → "Accelerate"
    quote:
      "When it comes to personal branding services, I always work with the team at Accelerate. I've found them to be professional, understanding, and highly responsive... Nothing is ever too much trouble for the team.",
  },
  {
    name: "Kenny Lee",
    company: "@LightMyBricks",
    title: "Consistent growth with seamless content delivery",
    // "Editoz Club" → "Accelerate"
    quote:
      "Accelerate has been a game-changer in growing my following with their superb content creation support. Their knack for bringing ideas to life and managing projects is exceptional. The communication and teamwork are top-notch, making the whole process smooth and effective.",
  },
  {
    name: "Daniel Trkulja",
    company: "@Threadlabs",
    title: "It's been a fantastic experience",
    quote:
      "I'd be more than happy to give a case study because you've been such an incredible help to me, from the moment we engaged to building that brand identity. Being connected with the team, the communication, and the extra mile you've taken have been incredibly helpful and invaluable for me, especially as someone completely new to this. For anyone considering it, I'd happily recommend you. It's been a fantastic experience.",
  },
  {
    name: "Shaveen Bandaranayake",
    company: "@TheLawSimplified",
    title: "The result was real growth",
    quote:
      "I have to say, I'm very impressed, not just by the competence and diligence the team has, but how insightful and thoughtful they are in providing custom-made solutions in terms of social media promotions, strategy, and various techniques, even in relation to production.",
  },
  {
    name: "Alejandra Lopez",
    company: "PCOS & Fitness Creator",
    title: "The Biggest Transformation Was My Confidence",
    // "Editoz Club" → "Accelerate" (twice)
    quote:
      "Before joining Accelerate, I wanted to grow on social media but lacked the confidence and clarity to put myself out there... Today, I feel comfortable recording videos, sharing my thoughts online, and putting myself out there with confidence. I'd highly recommend Accelerate to anyone looking to build confidence, develop their personal brand, and create content consistently.",
  },
  {
    name: "Ishini Saparamadu",
    company: "@Concolabs",
    title: "The result was real growth",
    quote:
      "Before joining Accelerate, I didn't use social media in a structured way. What stood out was how the team took the time to understand our industry before creating content, refining every detail before publishing. The result was real growth, not just numbers, with strong reach, new leads, and valuable professional connections.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

/* Nav arrow, in one of two placements.

   `overlay` pins it to the carousel's left/right edge — used on the
   video carousel, where it lands on a faded-out poster frame. It must
   stay a sibling of the Swiper container rather than a child: that
   element masks its own edges to transparent, and anything inside it
   fades out along with them.

   Without `overlay` it's an inline button for the row underneath —
   used on the text carousel, where an overlaid arrow would sit on top
   of the quote copy. */
function NavArrow({
  dir,
  label,
  onClick,
  overlay = false,
}: {
  dir: "prev" | "next";
  label: string;
  onClick: () => void;
  overlay?: boolean;
}) {
  return (
    <button
      className={"acc-arrow" + (overlay ? ` acc-arrow--nav acc-arrow--${dir}` : "")}
      onClick={onClick}
      aria-label={`${dir === "prev" ? "Previous" : "Next"} ${label}`}
      type="button"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d={dir === "prev" ? "M9 11L5 7L9 3" : "M5 3L9 7L5 11"}
          stroke="#1A56DB"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ── Video carousel ─────────────────────────────────────────────
   Interaction is carried over from the source unchanged: pressing
   play starts that video with native controls, pauses every other
   one, and stops carousel autoplay. When the video ends the
   controls hide again and autoplay resumes on tablet and up.

   One addition: navigating away from a playing slide pauses it, so
   audio can't keep running off-screen while the user browses. */
function VideoCarousel() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const stopVideo = (index: number, rewind: boolean) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.pause();
    video.controls = false;
    if (rewind) video.currentTime = 0;
  };

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((_, i) => {
      if (i !== index) stopVideo(i, true);
    });

    const video = videoRefs.current[index];
    if (!video) return;

    video.controls = true;
    const played = video.play();
    // Autoplay policies can reject this; don't leave the card in a
    // playing state if the browser refused.
    if (played && typeof played.catch === "function") {
      played.catch(() => {
        video.controls = false;
        setPlayingIndex(null);
      });
    }

    setPlayingIndex(index);
    swiperRef.current?.autoplay?.stop();
  };

  const handleEnded = (index: number) => {
    stopVideo(index, false);
    setPlayingIndex(null);
    if (isTabletUp() && !prefersReducedMotion()) swiperRef.current?.autoplay?.start();
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    if (playingIndex !== null && playingIndex !== swiper.realIndex) {
      stopVideo(playingIndex, true);
      setPlayingIndex(null);
    }
  };

  return (
    <div className="acc-vt">
      <div className="acc-carousel">
        <Swiper
          modules={[Autoplay, Pagination]}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={handleSlideChange}
          slidesPerView="auto"
          centeredSlides
          loop
          spaceBetween={18}
          speed={550}
          autoplay={prefersReducedMotion() ? false : { delay: 4200, disableOnInteraction: false }}
          watchSlidesProgress
          pagination={{ clickable: true }}
        >
          {VIDEO_TESTIMONIALS.map((item, i) => (
            <SwiperSlide key={item.name}>
              <div className={"acc-vt-card" + (playingIndex === i ? " is-playing" : "")}>
                <div className="acc-vt-media">
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={item.video}
                    poster={item.poster}
                    preload="metadata"
                    playsInline
                    onEnded={() => handleEnded(i)}
                  />
                  <button
                    className="acc-vt-play"
                    type="button"
                    onClick={() => handlePlay(i)}
                    aria-label={`Play ${item.name}'s testimonial`}
                  >
                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" aria-hidden="true">
                      <path d="M1 1.4v15.2L14 9 1 1.4Z" fill="#1A56DB" />
                    </svg>
                  </button>
                </div>

                <div className="acc-vt-meta">
                  <p className="acc-vt-name">{item.name}</p>
                  <p className="acc-vt-role">{item.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <NavArrow dir="prev" label="video testimonial" overlay onClick={() => swiperRef.current?.slidePrev()} />
        <NavArrow dir="next" label="video testimonial" overlay onClick={() => swiperRef.current?.slideNext()} />
      </div>
    </div>
  );
}

/* ── Text carousel ─────────────────────────────────────────────
   Arrows sit in a row below the cards here rather than overlaid on
   the carousel's edges — the video carousel's overlay lands on a
   faded poster frame, but here it would cover the quote copy. */
function TextCarousel() {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className="acc-tt">
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        loop
        spaceBetween={18}
        speed={550}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={prefersReducedMotion() ? false : { delay: 5600, disableOnInteraction: false }}
      >
        {TEXT_TESTIMONIALS.map((item) => (
          <SwiperSlide key={item.name + item.company}>
            <article className="acc-tt-card">
              <svg
                className="acc-tt-quotemark"
                width="26"
                height="20"
                viewBox="0 0 26 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0 20V11.6C0 5.5 3.5 1.1 9.6 0l.8 3.3C6.9 4.3 5 6.3 4.8 9h4.4v11H0Zm15.9 0V11.6c0-6.1 3.5-10.5 9.6-11.6l.8 3.3c-3.5 1-5.4 3-5.6 5.7H25v11h-9.1Z" />
              </svg>

              <h3 className="acc-tt-title">{item.title}</h3>
              <p className="acc-tt-quote">&ldquo;{item.quote}&rdquo;</p>

              <div className="acc-tt-person">
                {item.photo ? (
                  <img className="acc-tt-photo" src={item.photo} alt={item.name} width={44} height={44} />
                ) : (
                  <span className="acc-tt-photo acc-tt-photo--initials" aria-hidden="true">
                    {initials(item.name)}
                  </span>
                )}
                <div>
                  <p className="acc-tt-name">{item.name}</p>
                  <p className="acc-tt-company">{item.company}</p>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="acc-ctrls">
        <NavArrow dir="prev" label="review" onClick={() => swiperRef.current?.slidePrev()} />
        <NavArrow dir="next" label="review" onClick={() => swiperRef.current?.slideNext()} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Testimonials — one section, two carousels.
   Video wall on top, written reviews directly
   beneath it under the same header.
───────────────────────────────────────────── */
export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const videoBlockRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      [headerRef.current, videoBlockRef.current, textBlockRef.current].forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: DURATION,
          ease: EASE,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      className="acc-tst"
      style={{ backgroundColor: "#ffffff", scrollMarginTop: 110 }}
    >
      <div className="max-w-[1200px] mx-auto pt-1 md:pt-2 pb-8 md:pb-12 px-6">

        {/* Header — same eyebrow pill + Inter display headline as every
            other section on the page. */}
        <div ref={headerRef}>
          <div className="flex justify-center mb-2">
            <span
              className="inline-block font-bold uppercase tracking-[0.1em] text-[#1A56DB] rounded-full"
              style={{ fontSize: "11px", backgroundColor: "#EAF1FF", padding: "5px 16px" }}
            >
              Testimonials
            </span>
          </div>

          <h2
            className="font-extrabold text-foreground text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            In Their Own Words
          </h2>
        </div>

        {/* ── Part 1 — video testimonials ──
            mt is smaller than the other blocks on purpose: the video
            swiper carries 28px of its own top padding to give the
            arch's centre slide room to scale up. */}
        <div ref={videoBlockRef} className="mt-6">
          <VideoCarousel />
        </div>

        {/* ── Part 2 — written reviews, same section ── */}
        <div ref={textBlockRef} className="mt-8 md:mt-10">
          <TextCarousel />
        </div>

      </div>
    </section>
  );
}
