"use client"

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  GraduationCap,
  HelpCircle,
  Layout,
  MapPin,
  Search,
  ShieldCheck,
  Users,
  Zap,
  AlertCircle,
  BookOpen,
  Calculator,
  Calendar,
  PenTool,
  CreditCard,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from "next/navigation"

// --- Components ---

const Button = ({ children, className = '', primary = false, ...props }: any) => (
  <button
    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all active:scale-[0.98] ${primary
      ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700'
      : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'
      } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = '' }: any) => (
  <div className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm ${className}`}>
    {children}
  </div>
);

const Accordion = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-medium text-slate-800 pr-4">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sections ---

export default function App() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  
  const heroImages = ["/heroo.jpeg", "/hero2.png"];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left, go to next image
        setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
      } else {
        // Swiped right, go to previous image
        setHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      }
    }
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const handleBuyNow = () => {
    router.push("/checkout")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* Header / Logo */}
      <header className="px-6 py-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="ApplySolo Logo"
            className="h-16 md:h-28 w-auto"
            style={{ filter: "brightness(0) invert(31%) sepia(87%) saturate(2257%) hue-rotate(0deg) brightness(40%) contrast(92%)" }}
          />
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#inside" onClick={(e) => { e.preventDefault(); scrollToSection("inside"); }} className="hover:text-blue-600">What's Inside</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }} className="hover:text-blue-600">FAQ</a>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto">

        {/* SECTION 1 & 2 — HERO */}
        <section className="px-6 pt-4 pb-16 md:flex md:flex-row-reverse md:items-center md:gap-12">
          {/* Mobile Hero Image First */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-10 md:mb-0 md:w-1/2"
          >
            <div 
              className="relative aspect-[4/5] w-full max-w-md md:max-w-none mx-auto overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Mockup Container */}
              <div className="relative h-full w-full bg-white rounded-none border border-slate-200 shadow-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroImageIndex}
                    src={heroImages[heroImageIndex]}
                    alt="Germany Admission Blueprint"
                    className="w-full h-full  cursor-grab active:cursor-grabbing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                {/* Skip Button */}
                <button
                  onClick={() => setHeroImageIndex((prev) => (prev + 1) % heroImages.length)}
                  className="absolute bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm z-10"
                >
                  {heroImageIndex === 0 ? "Next" : "Back"}
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setHeroImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === heroImageIndex
                          ? "bg-blue-600 w-8"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Germany Admission Blueprint
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                A step-by-step roadmap for Indian students applying to Masters & MBA in Germany(70+Pages).
              </p>

              {/* SECTION 3 — QUICK VALUE POINTS */}
              <div className="space-y-4 mb-10">
                {[
                  "APS process explained clearly",
                  "ECTS credit calculation examples",
                  "UniAssist application steps",
                  "SOP writing structure",
                  "Germany admission timeline"
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              {/* SECTION 4 — PRIMARY CTA */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Button primary onClick={handleBuyNow}>
                    Get Instant Access – ₹499
                  </Button>

                  {/* TRICK 1: Instant Clarity Strip */}
                  <div className="flex flex-col items-center gap-2 text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant PDF Access</span>
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> One-Time Payment</span>
                    </div>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Consultants Required</span>
                  </div>
                </div>

                {/* BONUS TRICK: Micro-proof */}
                <div className="flex items-center justify-center md:justify-start gap-3 py-3 px-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    Used by <span className="text-slate-900 font-bold">250+ students</span> preparing for Germany admissions
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TRICK 2: Scroll Hook */}
        <div className="px-6 py-8 bg-white border-y border-slate-50 text-center">
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            Inside you'll see the exact <span className="text-blue-600 font-bold">APS → UniAssist → Admission</span> process used by successful applicants.
          </p>
          <div className="mt-4 flex justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-5 h-5 text-slate-300" />
            </motion.div>
          </div>
        </div>

        {/* SECTION 5 — PROBLEM SECTION */}
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Applying to Germany Can Be Confusing</h2>
            <p className="text-slate-600">Most students waste months searching YouTube and Telegram groups.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: ShieldCheck, title: "APS process confusion" },
              { icon: Layout, title: "UniAssist applications" },
              { icon: Calculator, title: "ECTS calculations" },
              { icon: Search, title: "University shortlisting" },
              { icon: PenTool, title: "SOP writing" },
              { icon: Zap, title: "Visa process" }
            ].map((item, i) => (
              <Card key={i} className="flex flex-col items-center text-center gap-4 p-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-slate-800 leading-tight">{item.title}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 6 — WHAT'S INSIDE */}
        <section id="inside" className="py-20 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Inside The Blueprint</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {[
              { title: "APS Process Flowchart", desc: "Detailed breakdown of the new APS requirements.", img: "/itb1.png" },
              { title: "ECTS Calculation Example", desc: "How to convert your Indian credits to German ECTS.", img: "/itb2.png" },
              { title: "Germany Application Timeline", desc: "Month-by-month guide for Winter & Summer intake.", img: "/itb3.png" },
              { title: "SOP Writing Framework", desc: "The exact structure that gets you admitted.", img: "/itb4.png" },
              { title: "After Reaching Germany", desc: "Essential steps and guidance once you arrive in Germany.", img: "/itb5.png" }
            ].map((page, i) => (
              <motion.div
                key={i}
                className="min-w-[280px] md:min-w-[320px] snap-center cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  rotateY: 15,
                  z: 50
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setSelectedImage(page.img)}
              >
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[550px] md:min-h-[620px]">
                  {/* Image fills full width, no padding */}
                  <div className={`w-full ${i === 0 ? 'h-80 md:h-96' : 'h-72 md:h-96'} overflow-hidden flex-shrink-0`}>
                    <img
                      src={page.img}
                      alt={page.title}
                      className={`w-full h-full ${i === 0 ? 'object-cover object-contain' : 'object-cover'}`}
                    />
                    
                  </div>
                  {/* Text content below image, padded */}
                  <div className="flex flex-col gap-3 p-6 flex-1">
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 mb-2">{page.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{page.desc}</p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Page {i + 12}</span>
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                        <ChevronDown className="w-3 h-3 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 7 — ADMISSION LETTERS */}
        <section className="bg-slate-900 py-20 px-6 text-white overflow-hidden">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Real Admission Results</h2>
            <p className="text-slate-400">Students using this roadmap have successfully received offers from German public universities.</p>
          </div>

          <div className="relative flex justify-center items-center gap-4 md:gap-8">
            <div className="w-100 md:w-92 aspect-[3/4] bg-white rounded-2xl border border-white/10 overflow-hidden rotate-[-6deg] translate-x-12 shadow-xl">
              <img src="/ol2.png" alt="Admission Letter 1" className="w-full h-full object-cover" />
            </div>
            <div className="z-10 w-0 md:w-[1020px] aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              <img src="/ol1.png" alt="Official Admission Letter" className="w-full h-full " />
            </div>
            <div className="w-100 md:w-92 aspect-[3/4] bg-white rounded-2xl border border-white/10 overflow-hidden rotate-[6deg] -translate-x-12 shadow-xl">
              <img src="/ol3.png" alt="Admission Letter 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* SECTION 8 — WHO THIS GUIDE IS FOR */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Who This Guide Is For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: GraduationCap, text: "Students planning Masters in Germany" },
              { icon: Users, text: "Students applying for MBA in Germany" },
              { icon: Zap, text: "Students applying without expensive consultants" }
            ].map((item, i) => (
              <Card key={i} className="flex flex-col items-center text-center gap-6 p-8">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-semibold text-slate-800 text-lg">{item.text}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 9 — PRICE SECTION */}
        <section className="py-24 px-6 bg-blue-50 border-y border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4 block">Limited Time Offer</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Consultants Charge ₹50,000+</h2>
            <p className="text-lg text-slate-600 mb-10">Get the same admission roadmap for just</p>

            {/* TRICK 3: Consultant Price Comparison Visual */}
            <div className="max-w-md mx-auto mb-12 bg-white rounded-3xl p-8 shadow-xl shadow-blue-500/5 border border-blue-100">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Consultants</span>
                  <span className="text-slate-400 font-bold line-through">₹50,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-900 font-bold text-lg">Applysolo Blueprint</span>
                  <div className="text-right">
                    <span className="text-4xl font-black text-blue-600">₹499</span>
                    <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Save 99% Today</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-sm mx-auto space-y-4">
              <Button primary className="py-5 text-xl" onClick={handleBuyNow}>
                Download The Blueprint
              </Button>
              <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Instant PDF Access</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> PDF Guide</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10 — FAQ */}
        <section id="faq" className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
            <div className="bg-white rounded-3xl border border-slate-100 p-2">
              <Accordion
                question="Who is this guide for?"
                answer="This guide is specifically designed for Indian students (both freshers and working professionals) who want to apply for a Masters or MBA in Germany. It covers everything from APS to Visa."
              />
              <Accordion
                question="Can I apply without a consultant?"
                answer="Absolutely! In fact, most public universities in Germany prefer direct applications. This blueprint gives you the exact steps to do it yourself, saving you lakhs in consultancy fees."
              />
              <Accordion
                question="When should I start the process?"
                answer="Ideally, you should start 8-10 months before your intended intake. For Winter intake (Oct), start in Jan. For Summer intake (April), start in June."
              />
            </div>
          </div>
        </section>

        {/* SECTION 11 — FOOTER */}
        <footer className="py-12 px-6 border-t border-slate-100">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="ApplySolo Logo"
                className="h-12 md:h-14 w-auto"
                style={{ filter: "brightness(0) invert(31%) sepia(87%) saturate(2257%) hue-rotate(0deg) brightness(40%) contrast(92%)" }}
              />
            </div>

            <div className="flex gap-8 text-sm text-slate-500">
              <button
                onClick={() => router.push("/privacy-policy")}
                className="hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => router.push("/contact")}
                className="hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
            </div>

            <div className="text-sm text-slate-400">
              © 2024 Applysolo. All rights reserved.
            </div>
          </div>

          <div className="mt-12 max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] text-center">
            <span>✔ Instant PDF Access</span>
            <span>✔ One-Time Payment</span>
            <span>✔ No Consultant Required</span>
          </div>
        </footer>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-6 left-6 right-6 md:hidden z-50">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button primary className="shadow-2xl py-4" onClick={handleBuyNow}>
            Get Blueprint – ₹499
          </Button>
        </motion.div>
      </div>
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-[2rem] overflow-y-auto shadow-2xl custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 md:p-8">
                <img
                  src={selectedImage}
                  alt="Big Screen View"
                  className="w-full h-auto rounded-xl shadow-sm"
                />
              </div>
              <button
                className="fixed top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors group z-[110]"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
