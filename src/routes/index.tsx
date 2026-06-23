import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { IntroLoader } from "@/components/landing/IntroLoader";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import {
  ProblemSection, IntelligenceEngine, LiveActivity, AIBrain,
  DashboardUniverse, Timeline,
} from "@/components/landing/Sections1";
import {
  FeatureGrid, Architecture, WhyCyberify, Comparison,
  DesktopShowcase, DownloadCenter, SecurityFortress, FinalCTA, Footer,
} from "@/components/landing/Sections2";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyberify — AI Workforce Intelligence Platform" },
      { name: "description", content: "From clock-in to AI insight. The workforce intelligence command center for modern teams that ship." },
      { property: "og:title", content: "Cyberify — AI Workforce Intelligence" },
      { property: "og:description", content: "The command center of a futuristic workforce intelligence system." },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ready) {
      // Force back to top before unlocking — browser scroll restoration can otherwise
      // jump us past the Hero section immediately after the IntroLoader finishes
      window.scrollTo({ top: 0, behavior: "instant" });
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [ready]);

  // Hard lock: while in Hero, keep body overflow:hidden so native scroll is impossible.
  // Also snaps back to Hero if user scrolls up from the very top of ProblemSection.
  useEffect(() => {
    if (!ready) return;

    let isAnimating = false;
    let touchStartY = 0;

    const lock = () => { document.body.style.overflow = "hidden"; };
    const unlock = () => { document.body.style.overflow = ""; };

    // Start locked (we're in the Hero)
    lock();

    const goToProblem = () => {
      if (isAnimating) return;
      isAnimating = true;
      unlock();
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      setTimeout(() => {
        isAnimating = false;
        if (window.scrollY < 10) lock();
        else unlock(); 
      }, 900);
    };

    const goToHero = () => {
      if (isAnimating) return;
      isAnimating = true;
      // body is already unlocked here (we're at ProblemSection)
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        isAnimating = false;
        if (window.scrollY < 50) lock(); // Re-lock since we're back in Hero
      }, 900);
    };

    const onWheel = (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      const y = window.scrollY;
      const heroEnd = window.innerHeight;
      if (e.deltaY > 0 && y < heroEnd - 50) {
        e.preventDefault();
        goToProblem();
      } else if (e.deltaY < -15 && y >= heroEnd - 50 && y <= heroEnd + 5) {
        e.preventDefault();
        goToHero();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      const y = window.scrollY;
      const heroEnd = window.innerHeight;
      if (["ArrowDown", "PageDown", " "].includes(e.key) && y < heroEnd - 50) {
        e.preventDefault();
        goToProblem();
      } else if (["ArrowUp", "PageUp"].includes(e.key) && y >= heroEnd - 50 && y <= heroEnd + 5) {
        e.preventDefault();
        goToHero();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      const y = window.scrollY;
      const heroEnd = window.innerHeight;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY > 8 && y < heroEnd - 50) {
        e.preventDefault();
        goToProblem();
      } else if (deltaY < -15 && y >= heroEnd - 50 && y <= heroEnd + 5) {
        e.preventDefault();
        goToHero();
      }
    };

    // Re-lock if user scrolls back to top (e.g. browser back-swipe), and ensure unlocked otherwise
    const onNativeScroll = () => {
      if (!isAnimating) {
        if (window.scrollY < 10) lock();
        else unlock();
      }
    };

    // Handle internal anchor links manually since body lock prevents native hash scrolling
    const onHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const el = document.getElementById(href.substring(1));
        if (el) {
          unlock();
          isAnimating = true; // Protect the flight from being interrupted
          window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
          
          // Re-enable native scroll listeners after the flight is expected to finish
          setTimeout(() => {
            isAnimating = false;
            if (window.scrollY < 10) lock();
            else unlock();
          }, 1200);
        }
      }
    };

    // Must be passive: false to allow e.preventDefault()
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    document.addEventListener("click", onHashClick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onNativeScroll);
      document.removeEventListener("click", onHashClick);
      unlock();
    };
  }, [ready]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {!ready && <IntroLoader onDone={() => setReady(true)} />}
      <Nav />
      <Hero />
      <ProblemSection />
      <IntelligenceEngine />
      <LiveActivity />
      <AIBrain />
      <DashboardUniverse />
      <Timeline />
      <FeatureGrid />
      <Architecture />
      <WhyCyberify />
      <Comparison />
      <DesktopShowcase />
      <DownloadCenter />
      <SecurityFortress />
      <FinalCTA />
      <Footer />
    </div>
  );
}
