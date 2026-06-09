/**
 * Centralized brand content for Accident Payments.
 * Keeping copy in one place makes the landing page easy to tune without
 * touching component markup.
 */

export const site = {
  name: "Accident Payments",
  domain: "accidentpayments.com",
  phone: "+1 (800) CLAIM-NOW",
  phoneHref: "",
  tagline: "Free Case Review. Maximum Compensation.",
  mission:
    "Ensure everyone in America gets fast, free access to legal advice — and pursues the claims they're entitled to.",
  ctaLabel: "Get Free Case Review",
  ctaHref: "/case-review",
} as const;

export const navItems = [
  {
    label: "How It Works",
    bgColor: "#1a1a1a",
    textColor: "#ffffff",
    links: [
      { label: "Our Process", href: "/#process", ariaLabel: "How the process works" },
      { label: "Why It's Free", href: "/#why-free", ariaLabel: "Why our service is free" },
      { label: "Get Matched", href: "/case-review", ariaLabel: "Get matched with a lawyer" },
    ],
  },
  {
    label: "Case Types",
    bgColor: "#FF7E33",
    textColor: "#1a1a1a",
    links: [
      { label: "Auto Accidents", href: "/#case-types", ariaLabel: "Auto accident claims" },
      { label: "Workplace Injury", href: "/#case-types", ariaLabel: "Workplace injury claims" },
      {
        label: "Medical Malpractice",
        href: "/#case-types",
        ariaLabel: "Medical malpractice claims",
      },
    ],
  },
  {
    label: "Company",
    bgColor: "#262626",
    textColor: "#ffffff",
    links: [
      { label: "About Us", href: "/#about", ariaLabel: "About Accident Payments" },
      { label: "FAQ", href: "/#faq", ariaLabel: "Frequently asked questions" },
    ],
  },
] as const;

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: "file" | "phone" | "dollar";
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Tell us what happened",
    description:
      "Share a few details about your accident in under two minutes — on any device. Our matching engine instantly finds an injury attorney near you.",
    icon: "file",
  },
  {
    step: "02",
    title: "Talk to a real lawyer",
    description:
      "A qualified attorney reaches out directly for a free, no-obligation consultation. No call centers, no runaround — just real legal advice.",
    icon: "phone",
  },
  {
    step: "03",
    title: "Collect what you're owed",
    description:
      "Find out what your claim is truly worth and pursue maximum compensation. You pay nothing unless your lawyer wins your case.",
    icon: "dollar",
  },
];

export type CaseType = {
  /** Matches the Fillout form keys used by /case-review. */
  slug:
    | "auto-accident"
    | "personal-injury"
    | "workers-comp"
    | "slip-and-fall"
    | "malpractice"
    | "ssdi";
  title: string;
  blurb: string;
  examples: string[];
  icon: "car" | "user" | "hardhat" | "alert" | "stethoscope" | "gavel";
};

export const caseTypes: CaseType[] = [
  {
    slug: "auto-accident",
    title: "Auto Accidents",
    blurb: "Cars, trucks, motorcycles, rideshare and hit-and-run collisions.",
    examples: ["Car & truck", "Motorcycle", "Hit and run", "Rideshare"],
    icon: "car",
  },
  {
    slug: "personal-injury",
    title: "Personal Injury",
    blurb: "When someone else's negligence leaves you hurt.",
    examples: ["Dog bites", "Wrongful death", "Nursing home abuse", "Product defects"],
    icon: "user",
  },
  {
    slug: "workers-comp",
    title: "Workplace Injury",
    blurb: "Hurt on the job or denied the benefits you earned.",
    examples: ["Injured at work", "Denied comp", "ERISA disability", "Lost wages"],
    icon: "hardhat",
  },
  {
    slug: "slip-and-fall",
    title: "Slip & Fall",
    blurb: "Unsafe premises that should have been kept safe.",
    examples: ["Broken bones", "Spine & nerve damage", "Cuts & bruises", "Sprains"],
    icon: "alert",
  },
  {
    slug: "malpractice",
    title: "Medical Malpractice",
    blurb: "Care that fell below the standard you deserved.",
    examples: ["Misdiagnosis", "Surgical errors", "Birth injury", "Negligence"],
    icon: "stethoscope",
  },
  {
    slug: "ssdi",
    title: "Disability & SSDI",
    blurb: "Benefits claims when you're unable to work.",
    examples: ["Unable to work", "Long-term disability", "Denied SSDI", "Appeals"],
    icon: "gavel",
  },
];

export type Testimonial = {
  name: string;
  location: string;
  role: string;
  text: string;
  rating: number;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Lynda M.",
    location: "Knoxville, TN",
    role: "Slip & Fall Claim",
    text: "I slipped in a supermarket with no wet-floor sign and hurt my back. Within an hour a premises-liability lawyer called me and told me my case was absolutely worth pursuing.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Robert K.",
    location: "Nashville, TN",
    role: "Auto Accident",
    text: "After my car accident I had no idea where to turn. They connected me with an attorney who fought the insurance company and got me far more than they first offered.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Maria G.",
    location: "Memphis, TN",
    role: "Workplace Injury",
    text: "I was injured at work and overwhelmed by the process. My lawyer guided me through every step and the outcome exceeded everything I expected.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James P.",
    location: "Chattanooga, TN",
    role: "Personal Injury",
    text: "Professional, responsive, and genuinely caring. The attorney I was matched with made a stressful injury case feel completely manageable.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    name: "Sandra L.",
    location: "Austin, TX",
    role: "Medical Malpractice",
    text: "A misdiagnosis cost me months of my life. I never thought I had a case until the free review — my attorney proved otherwise and won.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Darnell W.",
    location: "Atlanta, GA",
    role: "Auto Accident",
    text: "The whole thing took two minutes to start and cost me nothing. They handled the insurer so I could focus on actually getting better.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Priya N.",
    location: "Phoenix, AZ",
    role: "SSDI Benefits",
    text: "My disability claim had been denied twice. The lawyer they matched me with knew exactly how to win the appeal. I finally have my benefits.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    name: "Marcus T.",
    location: "Dallas, TX",
    role: "Slip & Fall",
    text: "Fast, free, and no pressure. I got honest advice about whether my case was worth it — and it was. Couldn't recommend it more.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Elena R.",
    location: "Miami, FL",
    role: "Personal Injury",
    text: "I felt like the insurance company was running me in circles. My attorney shut that down immediately and got me what I was owed.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export const faqs = [
  {
    id: "how-it-works",
    question: "How does Accident Payments work?",
    answer:
      "It's three simple steps. Personal injury lawyers across the U.S. tell us the case types they specialize in. You submit your case details in about two minutes. The closest attorney who handles your claim type is notified instantly and reaches out for a free consultation.",
  },
  {
    id: "do-i-need-lawyer",
    question: "Do I really need a lawyer for my claim?",
    answer:
      "Insurance companies make more money when they pay you less. A personal injury lawyer levels the playing field — handling the paperwork, negotiating aggressively, and pursuing the maximum compensation you're entitled to while you focus on recovery.",
  },
  {
    id: "cost",
    question: "How much does this cost me?",
    answer:
      "The case review is completely free, and the attorneys in our network work on contingency. That means you pay nothing up front and nothing at all unless your lawyer recovers compensation for you.",
  },
  {
    id: "case-types",
    question: "What types of cases do you handle?",
    answer:
      "Auto accidents, personal injury, workplace injuries, slip-and-fall, medical malpractice, wrongful death, and disability (SSDI) claims. Not sure if you qualify? Submit your details and we'll help you find out.",
  },
  {
    id: "deadline",
    question: "How long do I have to file a claim?",
    answer:
      "The statute of limitations varies by state and case type, but it generally ranges from one to three years from the date of injury. Waiting too long can cost you your right to compensation, so it's best to get a free review as soon as possible.",
  },
  {
    id: "coverage",
    question: "Do you cover my state?",
    answer:
      "Yes. Our attorney network spans all 50 states, and we match you with a qualified injury lawyer located near you for every supported case type.",
  },
];

export const stats = [
  { value: "$2.4B+", label: "Recovered for clients" },
  { value: "500K+", label: "Cases reviewed" },
  { value: "50", label: "States covered" },
  { value: "$0", label: "Cost unless you win" },
] as const;
