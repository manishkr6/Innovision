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
  shortVenue: "N.J. Yasaswy Auditorium",
  city: "Gangtok, Sikkim",
  dateString: "November 2026",
  // 20 Nov is proposed, not official. Set true once confirmed to drop the "proposed" wording.
  dateConfirmed: false,
  // Live countdown timer target timestamp (ISO format)
  countdownTarget: "2026-11-20T09:00:00+05:30",
  stats: [
    { label: "Official Events", value: 12, suffix: "" },
    { label: "Fest Tracks", value: 4, suffix: " (Tech, Strategy, Esports, Arts)" },
    { label: "Grand Stage", value: 1, suffix: " Auditorium" },
    { label: "Podium Medals", value: 24, suffix: " (Gold & Silver)" }
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
    email: "ajitkarki@iusikkim.edu.in",
    avatarColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "fc-2",
    name: "Mr. Rahul Shah",
    role: "Technical Coordinator",
    department: "Faculty of Science & Technology",
    phone: "+91 9563213089",
    cleanPhone: "919563213089",
    email: "rahulshah@iusikkim.edu.in",
    avatarColor: "from-purple-500 to-indigo-600"
  },
  {
    id: "fc-3",
    name: "Mr. Subodh Adhikari",
    role: "Operations Coordinator",
    department: "Faculty of Science & Technology",
    phone: "+91 7866094216",
    cleanPhone: "917866094216",
    email: "",
    avatarColor: "from-blue-500 to-cyan-600"
  },
  {
    id: "fc-4",
    name: "Mrs. Diksha Giri",
    role: "Cultural & Creative Coordinator",
    department: "Faculty of Science & Technology",
    phone: "+91 9083924727",
    cleanPhone: "919083924727",
    email: "dikshagiri@iusikkim.edu.in",
    avatarColor: "from-pink-500 to-purple-600"
  },
  {
    id: "fc-5",
    name: "Mr. Nishant Chaki",
    role: "IIC & Innovation Coordinator",
    department: "Institution's Innovation Council",
    phone: "+91 9706225826",
    cleanPhone: "919706225826",
    email: "",
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
    fullDesc: "INNOVISION 2026 is open to enrolled students of The ICFAI University, Sikkim across all departments (BCA, MCA, BBA, MBA, B.Com, Law, Hospitality/Tourism) and to students of every college and university across Sikkim who register for an event. Every participant must be a currently enrolled student and must carry their valid college/university identity card at all times, presenting it on request."
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
    shortDesc: "An algorithmic problem-solving and programming-logic challenge. One hour, your own code, and the ranking comes down to problems solved, time taken and penalties.",
    fullDesc: "Code Clash is the coding competition of INNOVISION 2026. You compete alone for one hour on algorithmic and programming-logic problems, in C/C++, Java or Python.",
    icon: "code",
    image: "/images/photos/coding.jpg",
    isITOnly: true,
    time: "10:30 AM - 01:30 PM",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: { start: "10:30", end: "13:30" },
    venue: "To be updated",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Entry"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mr. Rahul Shah",
      facultyPhone: "+91 9563213089",
      student: "Prem Kr. Yadav",
      studentPhone: "+91 8159846675"
    },
    rules: [
      "Individual event. Duration: 1 hour.",
      "Participants must write their own solutions. Sharing code, or using the internet, AI tools or pre-written solutions, is not allowed unless the organisers say so before the event.",
      "Languages allowed: C/C++ (GCC) with VS Code or Dev C++, Java (Oracle JDK 21) with VS Code or Sublime Text, and Python 3 with VS Code or Jupyter Notebook."
    ],
    generalRules: [
      "Every participant must be a currently enrolled student and carry a valid college/university ID card at all times.",
      "Details given at registration must be accurate. False information can lead to disqualification.",
      "All participants must follow the INNOVISION 2026 Code of Conduct.",
      "Protests must be made in writing by the participant/team leader within the announced timeframe; judges' marking decisions are final."
    ],
    judgingCriteria: [{"criteria": "Problems solved"}, {"criteria": "Time taken"}, {"criteria": "Penalties"}],
    eligibility: [
      "Open to IT students (IT, Computer Science, BCA, MCA, B.Tech) of The ICFAI University, Sikkim and of every college and university across Sikkim, on registration.",
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
    shortDesc: "A team event in which teams of two solve real-world problems over a full day, run as a small hackathon, then demonstrate what they built.",
    fullDesc: "The Web Hackathon is a full-day team event run as a small hackathon. Teams of two get the problem statement at the start, do all their work during the event, and present or demonstrate it at the end.",
    icon: "globe",
    image: "/images/photos/team-laptop.jpg",
    isITOnly: true,
    time: "09:00 AM - 05:30 PM",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: { start: "09:00", end: "17:30" },
    venue: "To be updated",
    teamSize: {
      min: 2,
      max: 2,
      label: "Team of 2"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mr. Ajit Karki",
      facultyPhone: "+91 8250835009",
      student: "Om Jee Chauhan",
      studentPhone: "+91 7478288736"
    },
    rules: [
      "Teams are given the problem statement at the start of the event.",
      "Work must be done during the event.",
      "Teams present or demonstrate their work at the end.",
      "Each team must name one team leader as the point of contact."
    ],
    generalRules: [
      "Plagiarism, copying, or using unfair means leads to immediate disqualification.",
      "Participants must carry their valid college/university ID card at all times.",
      "Team members cannot be changed after the registration deadline unless the organisers approve it.",
      "Damage to university property or equipment is the responsibility of the team who caused it."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to IT students (IT, Computer Science, BCA, MCA, B.Tech) of The ICFAI University, Sikkim and of every college and university across Sikkim, on registration.",
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
    tagline: "Tech trivia, general aptitude, and rapid-fire rounds.",
    shortDesc: "Tech trivia, general aptitude, and rapid-fire rounds. Bring a partner and find out who knows the most.",
    fullDesc: "Brain Spark is the IT and fun quiz of INNOVISION 2026, played in teams of two across tech trivia, general aptitude and rapid-fire rounds.",
    icon: "lightbulb",
    image: "/images/photos/quiz.jpg",
    isITOnly: false,
    time: "02:00 PM - 04:30 PM",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: { start: "14:00", end: "16:30" },
    venue: "To be updated",
    teamSize: {
      min: 2,
      max: 2,
      label: "Team of 2"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mr. Rahul Shah",
      facultyPhone: "+91 9563213089",
      student: "Prem Kr. Yadav",
      studentPhone: "+91 8159846675"
    },
    rules: [
      "No mobile phones or other aids are allowed during the quiz.",
      "The quiz master’s decision on an answer is final."
    ],
    generalRules: [
      "Every participant must carry and present a valid college/university ID card.",
      "Participants must report at the venue at the announced time. Late arrivals may be refused entry.",
      "All participants must follow the INNOVISION 2026 Code of Conduct."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
    tagline: "A typing accuracy and word-per-minute (WPM) contest.",
    shortDesc: "A typing accuracy and word-per-minute (WPM) contest. No team, no excuses: just you and the keyboard.",
    fullDesc: "Type Race tests how fast and how accurately you can type. It is an individual event scored on accuracy and words per minute.",
    icon: "keyboard",
    image: "/images/photos/typing.jpg",
    isITOnly: false,
    time: "11:00 AM - 01:00 PM",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: { start: "11:00", end: "13:00" },
    venue: "To be updated",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Entry"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mr. Subodh Adhikari",
      facultyPhone: "+91 7866094216",
      student: "Manish Kr. Baitha",
      studentPhone: "+91 8927436941"
    },
    rules: [
      "Individual event.",
      "Participants must type on the system or keyboard provided, if the organisers provide one."
    ],
    generalRules: [
      "Every participant must carry a valid college/university ID card at all times.",
      "Participants must report at the announced time. Late arrivals may be refused entry.",
      "All participants must follow the INNOVISION 2026 Code of Conduct.",
      "The judges’ decisions are final."
    ],
    judgingCriteria: [{"criteria": "Typing accuracy"}, {"criteria": "Words per minute (WPM)"}],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
    shortDesc: "Startup pitching, business-plan presentation and entrepreneurial innovation challenge. Enter alone or as a team of two.",
    fullDesc: "NextPreneur is the entrepreneurship challenge of INNOVISION 2026, covering startup pitching and business-plan presentation. Bring your own idea and enter alone or as a team of two.",
    icon: "compass",
    image: "/images/photos/mic-stage.jpg",
    isITOnly: false,
    time: "01:30 PM - 05:00 PM",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: { start: "13:30", end: "17:00" },
    venue: "To be updated",
    teamSize: {
      min: 1,
      max: 2,
      label: "Individual or Team of 2"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mr. Nishant Chaki",
      facultyPhone: "+91 9706225826",
      student: "Mishal Dhakal",
      studentPhone: "+91 9907187423"
    },
    rules: [
      "The idea and the presentation must be the participant’s or team’s own work."
    ],
    generalRules: [
      "Each team must name one team leader as the point of contact.",
      "Participants must carry a valid college/university ID card at all times.",
      "Judges' decisions on evaluation criteria are final."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
    shortDesc: "A campus-wide clue-solving and team-strategy quest. Five players, one campus, and every clue leads to the next.",
    fullDesc: "Tech Hunt is the treasure hunt of INNOVISION 2026: a campus-wide clue-solving and team-strategy quest for teams of five.",
    icon: "compass",
    image: "/images/photos/treasure-map.jpg",
    isITOnly: false,
    time: "01:30 PM - 04:30 PM",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: { start: "13:30", end: "16:30" },
    venue: "Campus-Wide",
    teamSize: {
      min: 5,
      max: 5,
      label: "Team of 5"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mr. Subodh Adhikari",
      facultyPhone: "+91 7866094216",
      student: "Sujal Kr. Shah",
      studentPhone: "+91 8116368690"
    },
    rules: [
      "Teams must stay within the areas of the campus that the organisers allow and must not damage or remove anything while following clues.",
      "Teams must not share clues with or take clues from other teams."
    ],
    generalRules: [
      "Each team must name one team leader as the point of contact.",
      "Damage to university property is the responsibility of the person or team who caused it.",
      "All participants must follow the INNOVISION 2026 Code of Conduct."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
    tagline: "A squad battle-royale tournament.",
    shortDesc: "A squad battle-royale tournament in Battlegrounds Mobile India. Four players, one squad, and a gold medal for each of you if you win.",
    fullDesc: "The BGMI Tournament is the squad battle-royale event of INNOVISION 2026, for squads of four. Number of matches, points system and device rules will be announced by the organisers.",
    icon: "gamepad-2",
    image: "/images/games/bgmi.jpg",
    isITOnly: false,
    time: "11:00 AM - 05:00 PM",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: { start: "11:00", end: "17:00" },
    venue: "To be updated",
    teamSize: {
      min: 4,
      max: 4,
      label: "Squad of 4"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
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
      "Players must use their real registered names and their own accounts. Account sharing is not allowed."
    ],
    generalRules: [
      "Every participant must carry a valid college/university ID card at all times.",
      "Participants must report at the announced time. Late arrivals may be refused entry.",
      "All participants must follow the INNOVISION 2026 Code of Conduct.",
      "The judges’ decisions are final."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
    shortDesc: "A 5v5 MOBA mobile esports competition. Each team has five players.",
    fullDesc: "MOBA Legends: 5v5 is the 5v5 mobile esports competition of INNOVISION 2026. Each team has five players. Substitutes, match format and draft rules will be announced by the organisers.",
    icon: "swords",
    image: "/images/games/moba-legends.jpg",
    isITOnly: false,
    time: "12:00 PM - 05:00 PM",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: { start: "12:00", end: "17:00" },
    venue: "To be updated",
    teamSize: {
      min: 5,
      max: 5,
      label: "Team of 5 Players"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mr. Rahul Shah",
      facultyPhone: "+91 9563213089",
      student: "Sumeet Rai",
      studentPhone: "+91 7001156203"
    },
    rules: [
      "Each team has five players.",
      "Cheating, hacking, use of third-party tools, teaming up with opponents, and deliberate disconnection are not allowed and lead to disqualification.",
      "Players must be present at the time of their match. A team or player who is absent after the waiting time loses the match by walkover.",
      "Players must use their real registered names and their own accounts. Account sharing is not allowed."
    ],
    generalRules: [
      "Every participant must carry a valid college/university ID card at all times.",
      "Participants must report at the announced time. Late arrivals may be refused entry.",
      "All participants must follow the INNOVISION 2026 Code of Conduct.",
      "The judges’ decisions are final."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
    shortDesc: "A 1v1 football gaming showdown on console or mobile. Just you, your opponent and the scoreline.",
    fullDesc: "E-Football is the 1v1 football gaming showdown of INNOVISION 2026, on console or mobile. Platform, match length and format will be announced with the event guidelines.",
    icon: "trophy",
    image: "/images/games/efootball.jpg",
    isITOnly: false,
    time: "To be announced",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: null,
    venue: "To be updated",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual (1v1)"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mr. Subodh Adhikari",
      facultyPhone: "+91 7866094216",
      student: "Sumeet Rai",
      studentPhone: "+91 7001156203"
    },
    rules: [
      "Cheating, hacking, use of third-party tools, teaming up with opponents, and deliberate disconnection are not allowed and lead to disqualification.",
      "Players must be present at the time of their match. A team or player who is absent after the waiting time loses the match by walkover.",
      "Players must use their real registered names and their own accounts. Account sharing is not allowed."
    ],
    generalRules: [
      "Every participant must carry a valid college/university ID card at all times.",
      "Participants must report at the announced time. Late arrivals may be refused entry.",
      "All participants must follow the INNOVISION 2026 Code of Conduct.",
      "The judges’ decisions are final."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
    shortDesc: "Short-form video storytelling, editing and cinematography around campus or event themes.",
    fullDesc: "Frame Flick is the reel-making competition of INNOVISION 2026: short-form video storytelling, editing and cinematography around campus or event themes. Theme, video length and format will be announced by the organisers.",
    icon: "video",
    image: "/images/photos/video-edit.jpg",
    isITOnly: false,
    time: "To be announced",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: null,
    venue: "To be updated",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Entry"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mrs. Diksha Giri",
      facultyPhone: "+91 9083924727",
      student: "Sarthak Sharma",
      studentPhone: "+91 9811241243"
    },
    rules: [
      "The video must be original. Music, footage or images used must be ones the participant has the right to use.",
      "Content that is offensive, hateful or inappropriate is not allowed (see Code of Conduct).",
      "Participants are required to bring their own clothing and accessories."
    ],
    generalRules: [
      "Every participant must carry a valid college/university ID card at all times.",
      "Participants must report at the announced time. Late arrivals may be refused entry.",
      "All participants must follow the INNOVISION 2026 Code of Conduct.",
      "The judges’ decisions are final."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
    shortDesc: "An on-the-spot or theme-based digital photography contest. One frame could take the gold.",
    fullDesc: "Photography is the digital photography contest of INNOVISION 2026. Format, number of entries, equipment and editing rules will be announced by the organisers.",
    icon: "camera",
    image: "/images/photos/camera.jpg",
    isITOnly: false,
    time: "To be announced",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: null,
    venue: "To be updated",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Entry"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mrs. Diksha Giri",
      facultyPhone: "+91 9083924727",
      student: "Sarthak Sharma",
      studentPhone: "+91 9811241243"
    },
    rules: [
      "Photographs must be taken by the participants.",
      "Photographs of people must be taken with their consent."
    ],
    generalRules: [
      "Every participant must carry a valid college/university ID card at all times.",
      "Participants must report at the announced time. Late arrivals may be refused entry.",
      "All participants must follow the INNOVISION 2026 Code of Conduct.",
      "The judges’ decisions are final."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
    shortDesc: "A traditional or creative visual art showcase, painted on the spot and judged on your own work.",
    fullDesc: "The Painting Competition is the visual art showcase of INNOVISION 2026, open to traditional and creative work. Theme, medium, sheet size and materials will be announced by the organisers.",
    icon: "palette",
    image: "/images/photos/painting.jpg",
    isITOnly: false,
    time: "10:30 AM - 01:30 PM",
    // Provisional website timetable, used for clash checks. Keep in step with EVENTS in apps-script/Code.gs.
    slot: { start: "10:30", end: "13:30" },
    venue: "To be updated",
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Entry"
    },
    rounds: [],
    prizes: {
      first: "Gold Medal and Winner’s Certificate",
      second: "Silver Medal and Runner-Up Certificate",
      all: "Official Certificate of Participation",
      perks: []
    },
    coordinators: {
      faculty: "Mrs. Diksha Giri",
      facultyPhone: "+91 9083924727",
      student: "Nuyi Apum",
      studentPhone: "+91 7085310218"
    },
    rules: [
      "The artwork must be done on the spot and be the participant’s own work."
    ],
    generalRules: [
      "Every participant must carry a valid college/university ID card at all times.",
      "Participants must report at the announced time. Late arrivals may be refused entry.",
      "All participants must follow the INNOVISION 2026 Code of Conduct.",
      "The judges’ decisions are final."
    ],
    judgingCriteria: [],
    eligibility: [
      "Open to students of The ICFAI University, Sikkim (all departments) and of every college and university across Sikkim, on registration.",
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
