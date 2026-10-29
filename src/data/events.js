/**
 * INNOVISION 2026 - Central Data Store
 * Faculty of Science & Technology | Department of Information Technology
 * The ICFAI University, Sikkim
 * Ranka Road, Lower Sichey, Gangtok, Sikkim – 737101
 * Under the Theme: "A Celebration of Ideas, Innovation & Technology"
 * In association with Institution's Innovation Council (Ministry of Education Initiative)
 *
 * Grounded directly on the official INNOVISION 2026 Rules and Regulations document.
 */

export const FEST_INFO = {
  name: "INNOVISION 2026",
  tagline: "A Celebration of Ideas, Innovation & Technology",
  theme: "A Celebration of Ideas, Innovation & Technology",
  edition: "Annual IT, Technical, Gaming & Creative Fest",
  university: "The ICFAI University, Sikkim",
  faculty: "Faculty of Science & Technology",
  department: "Department of Information Technology",
  association: "Institution's Innovation Council (Ministry of Education Initiative)",
  venue: "The ICFAI University, Sikkim, Ranka Road, Lower Sichey, Gangtok, Sikkim – 737101",
  shortVenue: "N.J. Yasaswya Auditorium & FST Labs",
  city: "Gangtok, Sikkim",
  dateString: "November 2026",
  // Live countdown timer target timestamp (ISO format)
  countdownTarget: "2026-11-20T09:00:00+05:30",
  stats: [
    { label: "Official Events", value: 12, suffix: "" },
    { label: "Fest Tracks", value: 4, suffix: " (Tech, Strategy, Esports, Arts)" },
    { label: "Grand Stage", value: 1, suffix: " Auditorium" },
    { label: "Podium Medals", value: 24, suffix: " (Gold & Silver)" },
    { label: "Expected Footfall", value: 1500, suffix: "+" }
  ],
  marqueeItems: [
    "Code Clash",
    "Web Hackathon",
    "Brain Spark (IT Quiz)",
    "Type Race",
    "NextPreneur",
    "Tech Hunt (Treasure Hunt)",
    "BGMI Tournament",
    "MOBA Legends: 5v5",
    "E-Football",
    "Frame Flick (Reel Making)",
    "Photography",
    "Painting Competition"
  ]
};

// Event Coordinators (Faculty & Officials)
export const FACULTY_COORDINATORS = [
  {
    id: "fc-1",
    name: "Mr. Ajit Karki",
    role: "Lead Event Coordinator",
    department: "Faculty of Science & Technology",
    phone: "+91 8250835009",
    cleanPhone: "918250835009",
    email: "ajit.karki@iusikkim.edu.in",
    avatarColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "fc-2",
    name: "Mr. Rahul Shah",
    role: "Technical Coordinator",
    department: "Faculty of Science & Technology",
    phone: "+91 9563213089",
    cleanPhone: "919563213089",
    email: "rahul.shah@iusikkim.edu.in",
    avatarColor: "from-purple-500 to-indigo-600"
  },
  {
    id: "fc-3",
    name: "Mr. Subodh Adhikari",
    role: "Operations Coordinator",
    department: "Faculty of Science & Technology",
    phone: "+91 7866094216",
    cleanPhone: "917866094216",
    email: "subodh.adhikari@iusikkim.edu.in",
    avatarColor: "from-blue-500 to-cyan-600"
  },
  {
    id: "fc-4",
    name: "Mrs. Diksha Giri",
    role: "Cultural & Creative Coordinator",
    department: "Faculty of Science & Technology",
    phone: "+91 9083924727",
    cleanPhone: "919083924727",
    email: "diksha.giri@iusikkim.edu.in",
    avatarColor: "from-pink-500 to-purple-600"
  },
  {
    id: "fc-5",
    name: "Mr. Nishant Chaki",
    role: "IIC & Innovation Coordinator",
    department: "Institution's Innovation Council",
    phone: "+91 9706225826",
    cleanPhone: "919706225826",
    email: "nishant.chaki@iusikkim.edu.in",
    avatarColor: "from-emerald-500 to-teal-600"
  }
];

// Student Representatives & Organising Committee
export const STUDENT_REPRESENTATIVES = [
  { id: "sr-1", name: "Abhishek Chettri", phone: "+91 7001167893", cleanPhone: "917001167893", role: "Student Convener", badge: "Technical Lead" },
  { id: "sr-2", name: "Sumeet Rai", phone: "+91 7001156203", cleanPhone: "917001156203", role: "Student Co-Convener", badge: "Esports Lead" },
  { id: "sr-3", name: "Prem Kr. Yadav", phone: "+91 8159846675", cleanPhone: "918159846675", role: "Event Lead", badge: "Coding Lead" },
  { id: "sr-4", name: "Om Jee Chauhan", phone: "+91 7478288736", cleanPhone: "917478288736", role: "Event Lead", badge: "Hackathon Lead" },
  { id: "sr-5", name: "Sujal Kr. Shah", phone: "+91 8116368690", cleanPhone: "918116368690", role: "Logistics Lead", badge: "Auditorium Setup" },
  { id: "sr-6", name: "Manish Kr. Baitha", phone: "+91 8927436941", cleanPhone: "918927436941", role: "Web & Tech Lead", badge: "Systems Admin" },
  { id: "sr-7", name: "Sarthak Sharma", phone: "+91 9811241243", cleanPhone: "919811241243", role: "Media & PR Lead", badge: "Publicity" },
  { id: "sr-8", name: "Mohor Gosh", phone: "+91 6290281152", cleanPhone: "916290281152", role: "Hospitality Lead", badge: "Guest Relations" },
  { id: "sr-9", name: "Nuyi Apum", phone: "+91 7085310218", cleanPhone: "917085310218", role: "Creative Lead", badge: "Design & Arts" },
  { id: "sr-10", name: "Mishal Dhakal", phone: "+91 9907187423", cleanPhone: "919907187423", role: "Sponsorship Lead", badge: "IIC Relations" },
  { id: "sr-11", name: "Kishan Chettri", phone: "+91 9366375318", cleanPhone: "919366375318", role: "Discipline Lead", badge: "Volunteer Control" }
];

// Code of Conduct & Fest Regulations (Derived directly from Sections 1, 2, 4 & 5 of the Official Document)
export const CODE_OF_CONDUCT = [
  {
    id: "eligibility-id",
    number: "01",
    title: "Proof of Eligibility & Valid University ID",
    shortDesc: "Every participant must carry and present a valid college/university ID card at all times.",
    fullDesc: "INNOVISION 2026 is open to enrolled students of The ICFAI University, Sikkim across all departments (BCA, MCA, BBA, MBA, B.Com, Law, Hospitality/Tourism) and to students of invited external institutions (including Sikkim University, Sikkim Manipal University, Sikkim Skill University, Harkamaya College of Education, and further invited colleges). Every participant must be a currently enrolled student and must carry their valid college/university identity card at all times, presenting it on request."
  },
  {
    id: "registration-leader",
    number: "02",
    title: "Accurate Registration & Team Point of Contact",
    shortDesc: "Details given at registration must be accurate; each team must name one designated leader.",
    fullDesc: "Participants must register through the official process announced by the organisers before the registration deadline. Details provided during registration must be completely accurate; false information leads directly to disqualification. Each participating team must designate one team leader as the sole point of contact. Team members cannot be changed after the registration deadline without prior written approval from the organisers."
  },
  {
    id: "punctuality-schedule",
    number: "03",
    title: "Punctuality & Reporting Times",
    shortDesc: "Participants must report promptly at announced times; late arrivals risk refusal or walkover.",
    fullDesc: "Participants must report at the designated venue at the time announced for their respective event. Late arrivals may be refused entry to the competition. In esports events, any team or player absent past the announced waiting time forfeits the match by walkover. Participants may enter more than one event provided schedules do not clash; the organisers cannot reschedule competitions to accommodate individual clashes."
  },
  {
    id: "fair-play",
    number: "04",
    title: "Fair Play & Anti-Plagiarism Protocol",
    shortDesc: "Plagiarism, copying, unfair aids, unauthorized AI tools, or impersonation is strictly banned.",
    fullDesc: "Plagiarism, copying, use of unfair means, or impersonation is strictly barred in every competition. Unless an event-specific rule explicitly permits it, participants may not use mobile phones, the internet, generative AI tools, or any outside assistance during competition rounds. In coding challenges and hackathons, all solutions must be written original work during the designated window."
  },
  {
    id: "esports-integrity",
    number: "05",
    title: "Esports Integrity & Account Ownership",
    shortDesc: "Zero tolerance for third-party tools, cheats, teaming, or account sharing in esports.",
    fullDesc: "In all esports and gaming tournaments (BGMI, MOBA Legends: 5v5, E-Football), cheating, hacking, third-party mod tools, radar scripts, teaming up with opponents, and deliberate disconnections are strictly prohibited and result in immediate disqualification. Players must compete using their real registered names and their own personal verified accounts. Account sharing is strictly prohibited."
  },
  {
    id: "campus-equipment",
    number: "06",
    title: "Protection of University Property & Equipment",
    shortDesc: "Participants bring their own devices; damage to campus property is strictly the offender's liability.",
    fullDesc: "Participants must bring their own devices and accessories unless stated otherwise for a specific event. Participants are entirely responsible for their own belongings and equipment; the organisers assume no liability for loss or damage. Any intentional or negligent damage to university property, computing labs, or audio-visual gear is the sole liability of the person or team who caused it."
  },
  {
    id: "awards-verdict",
    number: "07",
    title: "Official Awards & Finality of Judges' Decisions",
    shortDesc: "Gold & Silver medals for podium finishes; certificates for all; judges' scores are final.",
    fullDesc: "Official award structure across every competition: 1st Position receives a Gold Medal and Winner’s Certificate; 2nd Position receives a Silver Medal and Runner-Up Certificate; all participants receive an Official Certificate of Participation. Team awards are conferred to each registered member. Judges are appointed by the organisers and the decision of the judges on scoring and evaluation is final and binding."
  },
  {
    id: "protests-grievances",
    number: "08",
    title: "Written Protest Protocol & Disciplinary Action",
    shortDesc: "Written protests by team leader to event coordinator; subjective marking protests not accepted.",
    fullDesc: "Any protest regarding a result or procedural decision must be submitted in writing to the event coordinator by the team leader within the announced timeframe. The protest is decided by the Organising Committee, whose verdict is final. Protests regarding a judge’s marking of the work itself are not accepted. Disqualified participants lose all awards and certificates, and serious breaches may be formally reported to the participant's college."
  }
];

// All 12 Official Competitions (Grouped into Tracks A, B, C, D per Official Document)
export const EVENTS = [
  // =========================================================================
  // TRACK A: TECHNICAL AND CORE IT EVENTS (EVENTS 1 - 4)
  // =========================================================================
  {
    id: "event-code-clash",
    slug: "code-clash",
    aliases: ["coding", "code-storm", "speed-coding"],
    title: "Code Clash (Coding Competition)",
    track: "A. Technical and Core IT Events",
    category: "it",
    categoryLabel: "Technical Track",
    genre: "Algorithmic Problem-Solving & Programming Logic",
    tagline: "An algorithmic problem-solving and programming-logic challenge.",
    shortDesc: "An algorithmic problem-solving and programming-logic challenge where developers solve rigorous computational problems under strict time and penalty constraints.",
    fullDesc: "Code Clash is the premier algorithmic challenge of INNOVISION 2026, hosted by the Department of Information Technology. Participants tackle computational challenges requiring deep mastery of data structures, algorithmic design, and edge-case handling. Solutions are evaluated on correctness, time taken, and penalty points.",
    icon: "code",
    image: "/images/photos/coding.jpg",
    isITOnly: true,
    date: "Day 1 - November 2026",
    time: "10:30 AM - 01:30 PM [TBC]",
    venue: "Advanced Computing Lab, Faculty of Science & Technology",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Entry [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Speed Algorithmic Sprint",
        duration: "60 Minutes",
        description: "Solve rapid-fire algorithmic problems using C, C++, Java, or Python. Solutions evaluated automatically on correctness and execution time."
      },
      {
        roundNumber: 2,
        title: "Complex Logic & Optimization",
        duration: "90 Minutes",
        description: "Tackle high-complexity algorithmic and optimization challenges under live leaderboard conditions. Ranking determined by problems solved, time taken, and penalties."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "Official FST Department of Information Technology Commendation",
        "Podium Medal Ceremony on Grand Auditorium Stage",
        "Institution's Innovation Council Merit Recognition"
      ]
    },
    coordinators: {
      faculty: "Mr. Rahul Shah",
      facultyPhone: "+91 9563213089",
      student: "Prem Kr. Yadav",
      studentPhone: "+91 8159846675"
    },
    rules: [
      "Participants must write their own solutions. Sharing code, or using the internet, AI tools or pre-written solutions, is not allowed unless the organisers say so before the event.",
      "Allowed programming languages: C, C++, Java, and Python on designated lab systems.",
      "Ranking criteria: based on problems solved, time taken, and penalties for incorrect submissions.",
      "Participants must report at the venue at the time announced for the event. Late arrivals may be refused entry.",
      "Plagiarism, copying, use of unfair means or impersonation is strictly prohibited and results in immediate disqualification."
    ],
    generalRules: [
      "Every participant must be a currently enrolled student and carry a valid college/university ID card at all times.",
      "Details given at registration must be accurate. False information can lead to disqualification.",
      "All participants must follow the INNOVISION 2026 Code of Conduct.",
      "Protests must be made in writing by the participant/team leader within the announced timeframe; judges' marking decisions are final."
    ],
    judgingCriteria: [
      { criteria: "Problems Correctly Solved", weight: "50%", description: "Total count of algorithmic test cases and problem statements successfully cleared." },
      { criteria: "Time Taken", weight: "30%", description: "Cumulative time taken to submit verified solutions." },
      { criteria: "Penalty Minimization", weight: "20%", description: "Accuracy of submissions with minimal penalty points for failed runs." }
    ],
    eligibility: [
      "Open to currently enrolled students of The ICFAI University, Sikkim and invited external institutions.",
      "Must carry a valid college/university identity card at all times."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 40
  },
  {
    id: "event-web-hackathon",
    slug: "web-hackathon",
    aliases: ["hackathon", "webforge"],
    title: "Web Hackathon",
    track: "A. Technical and Core IT Events",
    category: "it",
    categoryLabel: "Technical Track",
    genre: "Full-Stack & Web Innovation",
    tagline: "A team event in which teams solve real-world problems over a full day, run as a small hackathon.",
    shortDesc: "A team event in which teams solve real-world problems over a full day, run as a small hackathon. Work must be done during the event and demonstrated to the jury.",
    fullDesc: "The Web Hackathon is an intensive full-day team engineering competition. Teams are given the problem statement at the start of the event. All work must be conducted on site during the event window. At the conclusion, teams must demonstrate and present their live working prototype to the evaluation panel.",
    icon: "globe",
    image: "/images/photos/team-laptop.jpg",
    isITOnly: true,
    date: "Day 2 - November 2026",
    time: "09:00 AM - 05:30 PM [TBC]",
    venue: "Main Computer Center & Innovation Lab, FST",
    teamSize: {
      min: 2,
      max: 4,
      label: "Team Event [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Problem Statement Release & Architecture",
        duration: "1 Hour",
        description: "Problem statements announced at kickoff. Teams submit their architecture diagram, tech stack choice, and MVP plan."
      },
      {
        roundNumber: 2,
        title: "Full-Day Build Sprint & Mentorship",
        duration: "5.5 Hours",
        description: "Continuous hands-on web application development. Mentors conduct checkpoint reviews during the build."
      },
      {
        roundNumber: 3,
        title: "Live Prototype Demo & Presentation",
        duration: "2 Hours",
        description: "Teams present their live working solution followed by technical Q&A before the judging committee."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "Incubation and project guidance through Institution's Innovation Council (IIC)",
        "Grand Stage Medal Ceremony and Winner Team Citation",
        "Official FST Department of Information Technology Showcase"
      ]
    },
    coordinators: {
      faculty: "Mr. Ajit Karki",
      facultyPhone: "+91 8250835009",
      student: "Om Jee Chauhan",
      studentPhone: "+91 7478288736"
    },
    rules: [
      "Teams are given the problem statement at the start of the event.",
      "Work must be done during the event. Pre-built projects or pre-written full solutions are strictly prohibited.",
      "Teams must present or demonstrate their work at the end to the judging panel.",
      "Participants must bring their own laptops, development devices, and accessories.",
      "Each team must name one team leader as the point of contact."
    ],
    generalRules: [
      "Plagiarism, copying, or using unfair means leads to immediate disqualification.",
      "Participants must carry their valid college/university ID card at all times.",
      "Team members cannot be changed after the registration deadline unless the organisers approve it.",
      "Damage to university property or equipment is the responsibility of the team who caused it."
    ],
    judgingCriteria: [
      { criteria: "Innovation & Practical Applicability", weight: "35%", description: "Novelty of approach and real-world effectiveness in addressing the problem statement." },
      { criteria: "Technical Implementation & Code Quality", weight: "35%", description: "Architecture, database/API integration, responsiveness, and clean code practices." },
      { criteria: "Live Demo & Jury Defense", weight: "30%", description: "Clarity of presentation, functional feature walkthrough, and jury Q&A answers." }
    ],
    eligibility: [
      "Open to currently enrolled students of The ICFAI University, Sikkim and invited external institutions.",
      "Must carry a valid college/university identity card at all times."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 20
  },
  {
    id: "event-brain-spark",
    slug: "brain-spark",
    aliases: ["fun-quiz", "quiz", "brainstorm"],
    title: "Brain Spark (IT / Fun Quiz)",
    track: "A. Technical and Core IT Events",
    category: "all",
    categoryLabel: "Open to All Departments",
    genre: "Tech Trivia & General Aptitude",
    tagline: "Tech trivia, general IT aptitude, and rapid-fire quiz rounds.",
    shortDesc: "Tech trivia, general IT aptitude, and rapid-fire quiz rounds testing computing milestones, tech history, and logical puzzles.",
    fullDesc: "Brain Spark is the dynamic IT and fun quiz of INNOVISION 2026. Designed to test agility, knowledge, and quick thinking across computer science breakthroughs, emerging technology, industry milestones, and rapid-fire logic puzzles.",
    icon: "lightbulb",
    image: "/images/photos/quiz.jpg",
    isITOnly: false,
    date: "Day 1 - November 2026",
    time: "02:00 PM - 04:30 PM [TBC]",
    venue: "N.J. Yasaswya Auditorium (Main Hall)",
    teamSize: {
      min: 2,
      max: 2,
      label: "Team of 2 [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Preliminary Aptitude & Tech Screening",
        duration: "30 Minutes",
        description: "Written screening round covering core IT knowledge, tech trivia, and logic puzzles to determine the top finalist teams."
      },
      {
        roundNumber: 2,
        title: "Audio-Visual & Tech Milestone Buzzer Round",
        duration: "45 Minutes",
        description: "Stage buzzer round identifying tech pioneers, historic computing hardware, brands, and innovation trivia."
      },
      {
        roundNumber: 3,
        title: "Rapid Fire Face-Off",
        duration: "30 Minutes",
        description: "60-second high-pressure rapid fire round for final Gold and Silver podium rankings."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "Departmental Commendation",
        "Podium Medal Ceremony on Grand Auditorium Stage"
      ]
    },
    coordinators: {
      faculty: "Mr. Rahul Shah",
      facultyPhone: "+91 9563213089",
      student: "Prem Kr. Yadav",
      studentPhone: "+91 8159846675"
    },
    rules: [
      "Questions cover tech trivia, general IT aptitude, computer history, and rapid-fire logic puzzles.",
      "No mobile phones, internet access, smartwatches, or outside aids allowed during the quiz rounds.",
      "The Quiz Master’s decision on questions, scoring, and point allocations is absolute and final.",
      "Prompting from audience or unauthorized collaboration leads to immediate team disqualification."
    ],
    generalRules: [
      "Every participant must carry and present a valid college/university ID card.",
      "Participants must report at the venue at the announced time. Late arrivals may be refused entry.",
      "All participants must follow the INNOVISION 2026 Code of Conduct."
    ],
    judgingCriteria: [
      { criteria: "Accuracy of Answers", weight: "60%", description: "Points accumulated through correct answers across preliminary and stage rounds." },
      { criteria: "Speed & Buzzer Timing", weight: "40%", description: "Fastest response time on buzzer rounds without incurring negative penalties." }
    ],
    eligibility: [
      "Open to students of ICFAI University, Sikkim across all departments (BCA, MCA, BBA, MBA, B.Com, Law, Hospitality/Tourism) and invited institutions.",
      "Must carry a valid college/university ID card at all times."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 30
  },
  {
    id: "event-type-race",
    slug: "type-race",
    aliases: ["typing", "speed-typing"],
    title: "Type Race",
    track: "A. Technical and Core IT Events",
    category: "all",
    categoryLabel: "Open to All Departments",
    genre: "Typing Speed & Accuracy",
    tagline: "A typing-speed, words-per-minute (WPM) and accuracy contest.",
    shortDesc: "A typing-speed, words-per-minute (WPM) and accuracy contest on standardized keyboard testing software.",
    fullDesc: "Type Race evaluates keyboard speed, muscle memory, and precision accuracy under pressure. Competitors type across complex passages and technical syntax to achieve the highest net Words Per Minute (WPM) with strict accuracy benchmarks.",
    icon: "keyboard",
    image: "/images/photos/typing.jpg",
    isITOnly: false,
    date: "Day 2 - November 2026",
    time: "11:00 AM - 01:00 PM [TBC]",
    venue: "Computer Lab 2, Faculty of Science & Technology",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Entry [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Preliminary Heat Benchmark",
        duration: "15 Minutes",
        description: "3 standardized 2-minute typing passages. Top typists with highest net WPM advance to the championship."
      },
      {
        roundNumber: 2,
        title: "Championship Heat",
        duration: "20 Minutes",
        description: "Finalists compete on complex alphanumeric and programming passages for the Gold and Silver medals."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "Fastest Typist of INNOVISION 2026 Title",
        "Podium Medal Ceremony on Grand Auditorium Stage"
      ]
    },
    coordinators: {
      faculty: "Mr. Subodh Adhikari",
      facultyPhone: "+91 7866094216",
      student: "Manish Kr. Baitha",
      studentPhone: "+91 8927436941"
    },
    rules: [
      "Individual speed typing competition conducted on standardized testing software.",
      "Scoring is determined by highest net words per minute (WPM) subject to a minimum 95% accuracy benchmark.",
      "Use of macros, external auto-type scripting, copy-paste tricks, or automated typing tools results in instant disqualification.",
      "Standard university keyboards provided; participants may bring personal keyboards subject to coordinator verification."
    ],
    generalRules: [
      "Participants must carry their valid college/university ID card at all times.",
      "Late reporting forfeits the participant's assigned heat slot.",
      "Decisions of event coordinators and test monitors are final."
    ],
    judgingCriteria: [
      { criteria: "Net Words Per Minute (WPM)", weight: "70%", description: "Official net typing speed calculated after deducting typing errors." },
      { criteria: "Keystroke Accuracy Percentage", weight: "30%", description: "Proportion of error-free characters typed during the round." }
    ],
    eligibility: [
      "Open to students of ICFAI University, Sikkim across all departments and invited institutions.",
      "Must carry a valid college/university ID card."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 30
  },

  // =========================================================================
  // TRACK B: ENTREPRENEURSHIP AND STRATEGY (EVENTS 5 - 6)
  // =========================================================================
  {
    id: "event-nextpreneur",
    slug: "nextpreneur",
    aliases: ["startup-pitch", "pitch"],
    title: "NextPreneur",
    track: "B. Entrepreneurship and Strategy",
    category: "all",
    categoryLabel: "Open to All Departments",
    genre: "Startup Pitch & Business Strategy",
    tagline: "Startup pitching, business-plan presentation & entrepreneurial innovation challenge.",
    shortDesc: "Startup pitching, business-plan presentation and entrepreneurial innovation challenge. Pitch original business ideas to a jury of founders and faculty.",
    fullDesc: "NextPreneur is the flagship entrepreneurship and business-pitching challenge of INNOVISION 2026, held in association with Institution's Innovation Council (Ministry of Education Initiative). Student founders present original business plans, market models, and prototype solutions to an expert panel.",
    icon: "compass",
    image: "/images/photos/mic-stage.jpg",
    isITOnly: false,
    date: "Day 1 - November 2026",
    time: "01:30 PM - 05:00 PM [TBC]",
    venue: "N.J. Yasaswya Auditorium Stage",
    teamSize: {
      min: 1,
      max: 4,
      label: "Individual or Team [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Executive Pitch Deck Submission",
        duration: "Advance",
        description: "Submission of slide deck covering problem statement, customer segment, revenue model, and feasibility."
      },
      {
        roundNumber: 2,
        title: "Live Grand Stage Pitch & Jury Q&A",
        duration: "7 Mins Pitch + 3 Mins Q&A",
        description: "Live pitch presentation in front of the judging panel and auditorium audience followed by defense."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "Incubation and mentorship pathway via Institution's Innovation Council (IIC)",
        "Grand Stage Medal Ceremony and Certificate of Innovation"
      ]
    },
    coordinators: {
      faculty: "Mr. Nishant Chaki",
      facultyPhone: "+91 9706225826",
      student: "Mishal Dhakal",
      studentPhone: "+91 9907187423"
    },
    rules: [
      "The idea and the presentation must be the team’s own original work.",
      "Pitch deck structure must cover problem, market, solution, revenue model, and execution roadmap.",
      "Teams must present on stage within the allotted time limit followed by jury Q&A.",
      "Plagiarized pitch decks or copying existing established business plans results in instant disqualification."
    ],
    generalRules: [
      "Each team must name one team leader as the point of contact.",
      "Participants must carry a valid college/university ID card at all times.",
      "Judges' decisions on evaluation criteria are final."
    ],
    judgingCriteria: [
      { criteria: "Originality & Value Proposition", weight: "30%", description: "Uniqueness of idea and real market problem being solved." },
      { criteria: "Business Model & Financial Viability", weight: "30%", description: "Clear monetization strategy, unit economics, and feasibility." },
      { criteria: "Presentation Delivery", weight: "20%", description: "Clarity, slide aesthetics, stage presence, and storytelling." },
      { criteria: "Jury Q&A Defense", weight: "20%", description: "Confidence and depth of responses to jury cross-examination." }
    ],
    eligibility: [
      "Open to students of ICFAI University, Sikkim across all departments (BCA, MCA, BBA, MBA, B.Com, Law, Hospitality/Tourism) and invited institutions.",
      "Valid student ID required."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 20
  },
  {
    id: "event-tech-hunt",
    slug: "tech-hunt",
    aliases: ["treasure-hunt", "cyber-treasure-hunt"],
    title: "Tech Hunt (Treasure Hunt)",
    track: "B. Entrepreneurship and Strategy",
    category: "all",
    categoryLabel: "Open to All Departments",
    genre: "Campus Clue-Solving & Strategy Quest",
    tagline: "A campus-wide clue-solving and team-strategy quest.",
    shortDesc: "A campus-wide clue-solving and team-strategy quest. Decode cryptic riddles, explore allowed campus zones, and uncover hidden tech tokens.",
    fullDesc: "Tech Hunt turns the ICFAI University Sikkim campus into a high-octane quest arena. Teams decipher multi-layered technical ciphers, QR-coded clue stations, and logic puzzles to navigate across permitted zones and retrieve the final artifact.",
    icon: "compass",
    image: "/images/photos/treasure-map.jpg",
    isITOnly: false,
    date: "Day 2 - November 2026",
    time: "01:30 PM - 04:30 PM [TBC]",
    venue: "Campus-Wide (Briefing at Auditorium)",
    teamSize: {
      min: 3,
      max: 4,
      label: "Team Event [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "The Decryption Cipher",
        duration: "30 Minutes",
        description: "Solve initial cryptic logic and cipher challenges to unlock the first campus waypoint coordinate."
      },
      {
        roundNumber: 2,
        title: "Campus Clue Navigation",
        duration: "90 Minutes",
        description: "Follow sequential stations across permitted campus zones without damaging or disturbing campus fixtures."
      },
      {
        roundNumber: 3,
        title: "Final Artifact Retrieval",
        duration: "30 Minutes",
        description: "Assemble decoded clue pieces to locate and present the final Tech Hunt treasure."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "Tech Hunt Champions Trophy",
        "Podium Medal Ceremony on Grand Auditorium Stage"
      ]
    },
    coordinators: {
      faculty: "Mr. Subodh Adhikari",
      facultyPhone: "+91 7866094216",
      student: "Sujal Kr. Shah",
      studentPhone: "+91 8116368690"
    },
    rules: [
      "Teams must stay strictly within the areas of the campus that the organisers allow, and must not damage or remove anything while following clues.",
      "Teams must not share clues with, or take clues from, other teams (leads to immediate disqualification of all involved teams).",
      "Running in restricted lab zones or disturbing ongoing university lectures is prohibited.",
      "All clue checkpoints must be validated by checkpoint volunteers in sequential order."
    ],
    generalRules: [
      "Each team must name one team leader as the point of contact.",
      "Damage to university property is the responsibility of the person or team who caused it.",
      "All participants must follow the INNOVISION 2026 Code of Conduct."
    ],
    judgingCriteria: [
      { criteria: "Time of Final Submission", weight: "70%", description: "Fastest team to present all verified clues and the final artifact." },
      { criteria: "Clue Integrity & Fair Play", weight: "30%", description: "Strict adherence to permitted zones and zero penalties/clue violations." }
    ],
    eligibility: [
      "Open to students of ICFAI University, Sikkim across all departments and invited institutions.",
      "Must carry a valid college/university ID card at all times."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 25
  },

  // =========================================================================
  // TRACK C: ESPORTS AND GAMING ARENA (EVENTS 7 - 9)
  // =========================================================================
  {
    id: "event-bgmi",
    slug: "bgmi",
    aliases: ["bgmi-tournament", "battlegrounds"],
    title: "BGMI Tournament",
    track: "C. Esports and Gaming Arena",
    category: "all",
    categoryLabel: "Esports Arena",
    genre: "Squad Battle Royale Esports",
    tagline: "A squad/team battle-royale tournament.",
    shortDesc: "A squad/team battle-royale tournament in Battlegrounds Mobile India featuring tactical rotations, gunplay, and survival points.",
    fullDesc: "The premier esports battle royale tournament of INNOVISION 2026. Squads drop onto Erangel and Miramar to compete under official tournament point matrices. Survival instincts, zone rotations, gunplay accuracy, and squad communication decide who takes the podium.",
    icon: "gamepad-2",
    image: "/images/games/bgmi.jpg",
    isITOnly: false,
    date: "Day 1 & Day 2 - November 2026",
    time: "11:00 AM - 05:00 PM [TBC]",
    venue: "Student Activity Center (SAC) Esports Arena",
    teamSize: {
      min: 4,
      max: 4,
      label: "Squad Event [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Group Stage Qualifiers",
        duration: "2 Matches",
        description: "Registered squads play seeded group lobbies. Top scoring squads advance based on placement and kill points."
      },
      {
        roundNumber: 2,
        title: "Semi-Finals Bracket",
        duration: "2 Matches",
        description: "Intense clashes across Erangel and Miramar to qualify for the 16-squad Grand Finals lobby."
      },
      {
        roundNumber: 3,
        title: "Grand Finals Spectator Lobby",
        duration: "3 Matches",
        description: "Live-projected finals in the auditorium with live shoutcasting to decide the Gold and Silver medals."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "BGMI Champions Trophy",
        "Podium Medal Ceremony on Grand Auditorium Stage"
      ]
    },
    coordinators: {
      faculty: "Mr. Rahul Shah",
      facultyPhone: "+91 9563213089",
      student: "Sumeet Rai",
      studentPhone: "+91 7001156203"
    },
    rules: [
      "Cheating, hacking, use of third-party tools, teaming up with opponents, and deliberate disconnection are not allowed and lead to disqualification.",
      "Players must be present at the time of their match. A team or player who is absent after the waiting time loses the match by walkover.",
      "Players must use their real registered names and their own accounts. Account sharing is not allowed.",
      "Mobile phones only. Emulators, iPads/tablets, triggers, and modified game files are strictly banned."
    ],
    generalRules: [
      "Every participant must carry and present a valid college/university ID card.",
      "Decisions of tournament referees and the organising committee are final.",
      "All participants must follow the INNOVISION 2026 Code of Conduct."
    ],
    judgingCriteria: [
      { criteria: "Official Tournament Placement Points", weight: "70%", description: "Points earned for squad finish rank per match." },
      { criteria: "Finish / Kill Points", weight: "30%", description: "1 point awarded per verified in-game elimination." }
    ],
    eligibility: [
      "Open to enrolled students of ICFAI University, Sikkim and invited external institutions.",
      "All 4 squad members must carry valid institutional ID cards."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 32
  },
  {
    id: "event-moba-legends",
    slug: "moba-legends",
    aliases: ["mobile-legends", "mlbb", "mlbb-mystic-clash", "moba-legends-5v5"],
    title: "MOBA Legends: 5v5",
    track: "C. Esports and Gaming Arena",
    category: "all",
    categoryLabel: "Esports Arena",
    genre: "5v5 MOBA Mobile Esports",
    tagline: "A 5v5 MOBA mobile esports competition.",
    shortDesc: "A 5v5 MOBA mobile esports competition. Each team has five players competing in official draft pick format.",
    fullDesc: "MOBA Legends: 5v5 brings fast-paced 5v5 MOBA strategy to INNOVISION 2026. Teams execute strategic hero bans and draft picks, coordinate lane pressure, and conquer objectives across the Land of Dawn to destroy the enemy base.",
    icon: "swords",
    image: "/images/games/moba-legends.jpg",
    isITOnly: false,
    date: "Day 1 - November 2026",
    time: "12:00 PM - 05:00 PM [TBC]",
    venue: "SAC Esports Zone",
    teamSize: {
      min: 5,
      max: 5,
      label: "Team of 5 Players [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Single-Elimination Knockouts",
        duration: "Best of 1",
        description: "Official tournament draft mode. Winning teams advance through the knockout bracket."
      },
      {
        roundNumber: 2,
        title: "Semi-Finals",
        duration: "Best of 3",
        description: "Best-of-3 draft series testing tactical flexibility and deep hero pools."
      },
      {
        roundNumber: 3,
        title: "Championship Final",
        duration: "Best of 3",
        description: "Grand Finals clash broadcast on live display for the championship title."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "MOBA Legends Champions Trophy",
        "Podium Medal Ceremony on Grand Auditorium Stage"
      ]
    },
    coordinators: {
      faculty: "Mr. Rahul Shah",
      facultyPhone: "+91 9563213089",
      student: "Sumeet Rai",
      studentPhone: "+91 7001156203"
    },
    rules: [
      "Each team has five players. Substitutes, match format and draft rules follow official tournament guidelines.",
      "Cheating, hacking, use of third-party tools, teaming up with opponents and deliberate disconnection are not allowed and lead to disqualification.",
      "Players must be present at the time of their match. A team or player who is absent after the waiting time loses the match by walkover.",
      "Players must use their real registered names and their own accounts. Account sharing is not allowed."
    ],
    generalRules: [
      "Valid college/university ID card mandatory for every player.",
      "Participants must bring their own smartphones and chargers.",
      "Referee decisions regarding match disconnections and remakes are final."
    ],
    judgingCriteria: [
      { criteria: "Match Victory (Base Destruction)", weight: "80%", description: "Official in-game victory condition through destroying the opposing core." },
      { criteria: "Tournament Bracket Advancement", weight: "20%", description: "Match progression through the official bracket system." }
    ],
    eligibility: [
      "Open to all students of ICFAI University, Sikkim and invited colleges.",
      "Valid student ID required for all 5 team members."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 16
  },
  {
    id: "event-e-football",
    slug: "e-football",
    aliases: ["pes", "fifa", "apex-kick"],
    title: "E-Football",
    track: "C. Esports and Gaming Arena",
    category: "all",
    categoryLabel: "Esports Arena",
    genre: "1v1 Football Gaming Showdown",
    tagline: "A 1v1 football gaming showdown on console or mobile.",
    shortDesc: "A 1v1 football gaming showdown on console or mobile. Tactical formations, dribbling skills, and clutch penalty shootouts.",
    fullDesc: "E-Football brings the drama of the football pitch to the digital arena. Competitors go head-to-head in 1v1 knockout matches where tactical formations, precision passing, defensive discipline, and penalty composure decide the champion.",
    icon: "trophy",
    image: "/images/games/efootball.jpg",
    isITOnly: false,
    date: "Day 2 - November 2026",
    time: "10:00 AM - 02:00 PM [TBC]",
    venue: "SAC Gaming Zone",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual (1v1) [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Knockout Bracket Heats",
        duration: "10 Mins Match",
        description: "1v1 single-elimination heats with standardized authentic club teams."
      },
      {
        roundNumber: 2,
        title: "Quarter & Semi-Finals",
        duration: "12 Mins Match",
        description: "Competitive bracket matches with extra time and penalty shootouts enabled."
      },
      {
        roundNumber: 3,
        title: "Grand Finals Showdown",
        duration: "15 Mins Match",
        description: "Auditorium-streamed final to determine the Gold and Silver medalists."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "E-Football Champion Trophy",
        "Podium Medal Ceremony on Grand Auditorium Stage"
      ]
    },
    coordinators: {
      faculty: "Mr. Subodh Adhikari",
      facultyPhone: "+91 7866094216",
      student: "Sumeet Rai",
      studentPhone: "+91 7001156203"
    },
    rules: [
      "1v1 virtual football competition in knockout format.",
      "Cheating, hacking, use of third-party tools, glitch exploitation, and deliberate disconnection are not allowed and lead to disqualification.",
      "Players must be present at the time of their match. Absence after the waiting time loses the match by walkover.",
      "Players must use their real registered names and their own accounts. Account sharing is not allowed."
    ],
    generalRules: [
      "Participants must carry a valid college/university ID card.",
      "Standard controller profiles permitted.",
      "Decisions of tournament referees are final."
    ],
    judgingCriteria: [
      { criteria: "Match Score", weight: "100%", description: "Final goals scored at full-time (or extra time / penalties in knockout)." }
    ],
    eligibility: [
      "Open to all students of ICFAI University, Sikkim and invited colleges.",
      "Valid student ID required."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 32
  },

  // =========================================================================
  // TRACK D: CREATIVE ARTS AND DIGITAL MEDIA (EVENTS 10 - 12)
  // =========================================================================
  {
    id: "event-frame-flick",
    slug: "frame-flick",
    aliases: ["reel-making", "reels", "video"],
    title: "Frame Flick (Reel Making Competition)",
    track: "D. Creative Arts and Digital Media",
    category: "all",
    categoryLabel: "Creative Arts Track",
    genre: "Short-Form Video Storytelling & Editing",
    tagline: "Short-form video storytelling, editing and cinematography around campus or event themes.",
    shortDesc: "Short-form video storytelling, editing and cinematography around campus or event themes. Creative visual pacing and engaging reel narrative.",
    fullDesc: "Frame Flick is the modern visual storytelling arena of INNOVISION 2026. Creators capture the vibrant energy, tech exhibits, and spirited moments across the campus, crafting compelling vertical short videos that highlight the festival theme.",
    icon: "video",
    image: "/images/photos/video-edit.jpg",
    isITOnly: false,
    date: "Day 1 & Day 2 - November 2026",
    time: "Fest Window Submission [TBC]",
    venue: "Campus-Wide (Submission to Media Desk)",
    teamSize: {
      min: 1,
      max: 2,
      label: "Individual or Team [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Theme Release & Campus Cinematography",
        duration: "Day 1 - Day 2",
        description: "Campus filming capturing the vibrant energy, events, and atmosphere of INNOVISION 2026."
      },
      {
        roundNumber: 2,
        title: "Post-Production, Color Grading & Submission",
        duration: "By Deadline",
        description: "Video editing, sound design, beat-syncing, and submission of the final vertical MP4 reel."
      },
      {
        roundNumber: 3,
        title: "Auditorium Premiere & Jury Evaluation",
        duration: "Closing Ceremony",
        description: "Top-selected reels premiered on the auditorium big screen before the awards announcement."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "Feature on Official University Social Media Channels",
        "Podium Medal Ceremony on Grand Auditorium Stage"
      ]
    },
    coordinators: {
      faculty: "Mrs. Diksha Giri",
      facultyPhone: "+91 9083924727",
      student: "Sarthak Sharma",
      studentPhone: "+91 9811241243"
    },
    rules: [
      "The video must be original work created by the participant or team.",
      "Music, footage or images used must be ones the participant has the legal right or license to use.",
      "Content that is offensive, hateful or inappropriate is strictly prohibited (see Code of Conduct).",
      "All primary footage must be shot on campus during the festival window.",
      "Submitted videos must adhere to standard vertical 9:16 aspect ratio."
    ],
    generalRules: [
      "Participants must carry a valid college/university ID card.",
      "Safe filming practices: dangerous stunts or disruption of campus classes is forbidden.",
      "Decisions of the creative jury panel are final."
    ],
    judgingCriteria: [
      { criteria: "Creativity & Storytelling", weight: "40%", description: "Narrative hook, creative pacing, and compelling portrayal of the festival." },
      { criteria: "Editing & Sound Design", weight: "35%", description: "Cut transitions, beat-matching, audio clarity, and color grading." },
      { criteria: "Cinematography & Framing", weight: "25%", description: "Composition, lighting quality, camera movement, and visual aesthetic." }
    ],
    eligibility: [
      "Open to all students of ICFAI University, Sikkim across all departments and invited institutions.",
      "Valid student ID required."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 25
  },
  {
    id: "event-photography",
    slug: "photography",
    aliases: ["shutterbug", "photo"],
    title: "Photography",
    track: "D. Creative Arts and Digital Media",
    category: "all",
    categoryLabel: "Creative Arts Track",
    genre: "Digital Photography Contest",
    tagline: "An on-the-spot or theme-based digital photography contest.",
    shortDesc: "An on-the-spot or theme-based digital photography contest. Capture candid moments, architectural beauty, and human emotion.",
    fullDesc: "Photography at INNOVISION 2026 invites visual artists to document the essence of innovation, culture, and human interaction. Capture unscripted, high-impact moments that tell a complete story through lighting, composition, and visual framing.",
    icon: "camera",
    image: "/images/photos/camera.jpg",
    isITOnly: false,
    date: "Day 1 & Day 2 - November 2026",
    time: "On-the-Spot Submission [TBC]",
    venue: "Campus-Wide (Exhibition at Foyer)",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Entry [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Theme Briefing & Campus Shoot",
        duration: "Day 1",
        description: "Official photography theme announced. Participants capture candid campus and fest moments."
      },
      {
        roundNumber: 2,
        title: "Curated Selection & Digital Submission",
        duration: "Day 2 Morning",
        description: "Submit uncompressed high-resolution digital entries with intact EXIF metadata."
      },
      {
        roundNumber: 3,
        title: "Gallery Exhibition & Jury Review",
        duration: "Day 2 Afternoon",
        description: "Curated entries displayed in the exhibition foyer and evaluated by professional jury."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "Foyer Gallery Exhibition of Winning Photograph",
        "Podium Medal Ceremony on Grand Auditorium Stage"
      ]
    },
    coordinators: {
      faculty: "Mrs. Diksha Giri",
      facultyPhone: "+91 9083924727",
      student: "Sarthak Sharma",
      studentPhone: "+91 9811241243"
    },
    rules: [
      "Photographs must be taken by the participant during the event.",
      "Photographs of people must be taken with their informed consent.",
      "Basic color correction and cropping allowed; generative AI tools, composites, or heavy manipulations are disallowed.",
      "Original EXIF metadata must be preserved in the submitted image file.",
      "Participants must bring their own camera or smartphone."
    ],
    generalRules: [
      "Every participant must carry a valid college/university ID card at all times.",
      "Respect privacy and follow university guidelines in all campus areas.",
      "Decisions of the photography jury are final."
    ],
    judgingCriteria: [
      { criteria: "Composition & Framing", weight: "35%", description: "Rule of thirds, balance, visual depth, and artistic perspective." },
      { criteria: "Storytelling & Thematic Resonance", weight: "35%", description: "Emotional depth and connection to fest theme." },
      { criteria: "Technical Quality & Lighting", weight: "30%", description: "Sharpness, exposure control, dynamic range, and focus." }
    ],
    eligibility: [
      "Open to all students of ICFAI University, Sikkim across all departments and invited institutions.",
      "Valid student ID required."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 30
  },
  {
    id: "event-painting",
    slug: "painting",
    aliases: ["painting-competition", "fine-arts", "art"],
    title: "Painting Competition",
    track: "D. Creative Arts and Digital Media",
    category: "all",
    categoryLabel: "Creative Arts Track",
    genre: "Visual Art Showcase",
    tagline: "A traditional or creative visual art showcase.",
    shortDesc: "A traditional or creative visual art showcase. Expressive original artwork created on the spot based on announced themes.",
    fullDesc: "The Painting Competition at INNOVISION 2026 brings together traditional and contemporary visual artists. Express your creative interpretation of innovation, ecology, and imagination on canvas or paper in an inspiring live studio setting.",
    icon: "palette",
    image: "/images/photos/painting.jpg",
    isITOnly: false,
    date: "Day 2 - November 2026",
    time: "10:30 AM - 01:30 PM [TBC]",
    venue: "FST Central Courtyard & Art Studio",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Entry [TBC]"
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Theme Release & On-the-Spot Painting",
        duration: "3 Hours",
        description: "Theme revealed at kickoff. Artists create their original masterpiece on the spot."
      },
      {
        roundNumber: 2,
        title: "Foyer Art Exhibition & Jury Review",
        duration: "1 Hour",
        description: "Completed artwork displayed for fest attendees and evaluated by fine arts faculty."
      }
    ],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: [
        "Foyer Art Exhibition of Winning Artwork",
        "Podium Medal Ceremony on Grand Auditorium Stage"
      ]
    },
    coordinators: {
      faculty: "Mrs. Diksha Giri",
      facultyPhone: "+91 9083924727",
      student: "Nuyi Apum",
      studentPhone: "+91 7085310218"
    },
    rules: [
      "The artwork must be done on the spot and be the participant’s own original work.",
      "Theme will be announced by the organisers at the commencement of the competition.",
      "Mediums allowed: watercolor, acrylic, poster color, charcoal, or mixed media on standard sheets.",
      "Pre-drawn outlines, stencils, or tracing sheets are strictly prohibited.",
      "Artwork must be completed within the stipulated duration."
    ],
    generalRules: [
      "Participants must carry a valid college/university ID card.",
      "Late arrivals will not receive extra time.",
      "Decisions of the fine arts jury are final."
    ],
    judgingCriteria: [
      { criteria: "Creativity & Original Interpretation", weight: "40%", description: "Uniqueness of vision and creative interpretation of the announced theme." },
      { criteria: "Artistic Technique & Medium Skill", weight: "35%", description: "Brushwork, color harmony, texture, and shading." },
      { criteria: "Overall Visual Impact & Finish", weight: "25%", description: "Aesthetic appeal, presentation quality, and completeness." }
    ],
    eligibility: [
      "Open to all students of ICFAI University, Sikkim across all departments and invited institutions.",
      "Valid student ID required."
    ],
    registrationFee: "Free",
    isRegistrationOpen: true,
    maxSlots: 25
  }
];

// Helper lookup functions supporting canonical slug, old aliases, and ID formats
export const getEventBySlug = (slug) => {
  if (!slug) return null;
  const clean = slug.trim().toLowerCase();
  return (
    EVENTS.find(
      (e) =>
        e.slug.toLowerCase() === clean ||
        e.id.toLowerCase() === clean ||
        e.id.toLowerCase() === `event-${clean}` ||
        clean === `event-${e.slug.toLowerCase()}` ||
        (Array.isArray(e.aliases) && e.aliases.map((a) => a.toLowerCase()).includes(clean))
    ) || null
  );
};

export const getRelatedEvents = (currentSlug, count = 3) => {
  const current = getEventBySlug(currentSlug);
  if (!current) return EVENTS.slice(0, count);
  return EVENTS
    .filter((e) => e.slug !== current.slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, count);
};
