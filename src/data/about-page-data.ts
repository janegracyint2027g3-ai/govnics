import { Users, Shield, Trophy } from "lucide-react";

export interface Location {
  id: string;
  title: string;
  city: string;
  state: string;
  region: string;
  lat: number;
  lng: number;
  address: string[];
  phone?: string;
  email?: string;
}

export const aboutStats = [
  { label: "Years of Heritage", value: "40+" },
  { label: "Pan-India Offices", value: "11" },
  { label: "Security Professionals", value: "5000+" },
  { label: "Clients Served", value: "1000+" }
];

export const missionVisionValues = [
  { icon: Users, title: "Integrity First", desc: "Honesty and transparency are the bedrock of our operations." },
  { icon: Shield, title: "Unwavering Vigilance", desc: "24/7 proactive monitoring to preempt potential threats." },
  { icon: Trophy, title: "Excellence Driven", desc: "We don't settle for 'good enough'. We aim for perfection." }
];

export const timelineData = [
  { year: "1985", title: "The Foundation", desc: "Established in Chennai with a core team of elite ex-defense personnel.", align: "left" },
  { year: "2008", title: "National Expansion", desc: "Expanded operations to 10 major cities across India.", align: "right" },
  { year: "2015", title: "Tech Integration", desc: "Launched proprietary command center software for real-time monitoring.", align: "left" },
  { year: "2024", title: "Global Reach", desc: "Serving clients across Asia and Middle East with cutting-edge AI security.", align: "right" }
];

export const directorsData = [
  {
    name: "S. Vijayakumar",
    role: "Managing Director & Founder",
    img: "/leaders/Vijayakumar MD1.JPG",
    bio: "A highly decorated former Indian Air Force officer and Founder of ISI, widely respected as 'SIR' Vijayakumar. Recipient of the Marusthal Seva Medal for meritorious service in desert terrain. Holds qualifications in Business Management and Law. Founded Security & Intelligence Resources (SIR) in 1994, which later took over ISI, building a professionally managed organisation delivering integrated security, loss-prevention, facilities management, and manpower solutions. An acknowledged industry leader with extensive contributions to security operations, personnel training, SOP development, and disaster management."
  },
  {
    name: "Indiradevi",
    role: "Director",
    img: "/leaders/Indirani Director.jpeg",
    bio: "Director of ISI, playing an active role in financial oversight and strategic decision-making. Contributes valuable inputs to the finance function, supporting sound and sustainable business decisions. With a strong commitment to social service and employee welfare, she is an active member of the Inner Wheel Club. Instrumental in conceptualising and establishing ISI's Staff Welfare Corpus Fund, through which numerous employees have benefited, reflecting the organisation's people-centric values."
  },
  {
    name: "V. Vishalkumar",
    role: "Director",
    img: "/leaders/Vishal ED.JPG",
    bio: "Director at ISI, representing the next generation of leadership. Brings international corporate experience from Accenture (PMO professional) and Forest Coach Lines, Sydney (Transport Analyst). His multidisciplinary academic foundation includes Computer Engineering, Master's in Logistics & Transport Management (University of Sydney), Law, Human Resources Management, Fire & Industrial Safety, and NEBOSH certification. This unique blend enables him to design robust, compliant, and risk-aware operational frameworks."
  }
];

export const executiveManagementData = [
  {
    name: "V. Varshithkumar",
    role: "Executive Director",
    img: "/leaders/Varshithkumar ED.jpg",
    bio: "Executive Director leading initiatives focused on strengthening systems, compliance, and scalable growth. With global academic exposure and international experience, he brings a structured, technology-driven approach. Education: B.Sc. Mechanical Engineering (SUNY), M.Sc. Transport & Logistics (TUM Germany), Postgraduate Diploma in Fire & Industrial Safety, NEBOSH IGC, and LL.B (Government Law College, Madurai)."
  },
  {
    name: "Rajkumar Sankaran",
    role: "Executive Director",
    img: "/leaders/Rajkumar ED.jpeg",
    bio: "Executive Director since 2017, leading strategic growth across manpower solutions, security services, and facility management. Over 25 years of experience in operations, compliance, and global project delivery with clients including Barry-Wehmiller, Henry Schein, and BOC. Holds MBA (ICFAI) in Supply Chain Management & Operations, and Bachelor of Law (BL) focused on Company Law and Labour Legislation. Emphasizes operational excellence, data-driven decision-making, and employee welfare."
  },
  {
    name: "S. Yuvaraj",
    role: "CEO",
    img: "/leaders/Yuvaraj CEO.jpg",
    bio: "MBA, LLB, a seasoned leader with deep expertise in administration, governance, and statutory compliance. Drives strategic direction with a strong focus on operational integrity, risk management, and regulatory adherence. With prior service in the Indian Air Force and as Assistant Commissioner at EPFO, he brings proven experience in labour laws, audits, and enforcement, strengthening organizational governance and sustainable growth."
  }
];

// advisorsData removed — placeholder content not for production use.
// Add real advisor profiles here once confirmed by the business owner.

export const officeLocations: Location[] = [
  { id: "1", title: "Corporate Office", city: "Chennai", state: "Tamil Nadu", region: "South", lat: 13.0368, lng: 80.2116, address: ["No. 97/2, Sundaram Street, Chinmaya Nagar Stage 1", "Chennai – 600 092, Tamil Nadu, India"], phone: "+91 77088 87878", email: "info@isisecurity.in" },
  { id: "2", title: "Administrative Office", city: "Madurai", state: "Tamil Nadu", region: "South", lat: 9.9252, lng: 78.1198, address: ["12-9, Santhosh Raj Plaza, Gandhi Nagar", "Madurai – 625 020"], phone: "+91 98949 99955 / 95009 59004", email: "mdu@isisecurity.in" },
  { id: "3", title: "Tamil Nadu Office", city: "Coimbatore", state: "Tamil Nadu", region: "South", lat: 10.9984, lng: 77.0163, address: ["No: 5, Kakkan Nagar, Singanallur", "Coimbatore – 641005"], phone: "+91 99944 88855", email: "info@isisecurity.in" },
  { id: "4", title: "Andhra Pradesh Office", city: "Tirupathi", state: "Andhra Pradesh", region: "South", lat: 13.6288, lng: 79.4192, address: ["No 2 Akn Layout, Chennai–Tirupathi Bye Pass", "Nagari, Tirupathi – 517590"], phone: "+91 95919 08593", email: "info@isisecurity.in" },
  { id: "5", title: "Karnataka Office", city: "Bengaluru", state: "Karnataka", region: "South", lat: 12.9015, lng: 77.6225, address: ["No. 36, First Main Road, Kodichikkanahalli", "Bangalore – 560 076"], phone: "+91 73388 55588", email: "info@isisecurity.in" },
  { id: "6", title: "Telangana Office", city: "Hyderabad", state: "Telangana", region: "South", lat: 17.3392, lng: 78.5688, address: ["H.No. B-1228, NGO Colony, Vanasthalipuram", "Hyderabad – 500 070"], phone: "+91 95919 08593", email: "info@isisecurity.in" },
  { id: "7", title: "Kerala Office", city: "Kannur", state: "Kerala", region: "South", lat: 11.8745, lng: 75.3704, address: ["No.12/498, K.V. Building, Kannur Post", "Kannur – 670 005"], phone: "+91 78789 95500", email: "info@isisecurity.in" },
  { id: "8", title: "Delhi NCR Office", city: "Noida", state: "Uttar Pradesh", region: "North", lat: 28.5823, lng: 77.3871, address: ["B-702, Grand Ajnara Heritage, Sector-74", "Noida, New Delhi"], phone: "+91 96555 99988", email: "info@isisecurity.in" },
  { id: "10", title: "Odisha Office", city: "Bhubaneswar", state: "Odisha", region: "East", lat: 20.2961, lng: 85.8245, address: ["Plot no - 3761, URJA BHAWAN, GGP Enclave", "Rasulgarh, Bhubaneshwar - 751025"], phone: "+91 95919 08593", email: "info@isisecurity.in" },
  { id: "11", title: "Andaman Office", city: "Sri Vijaya Puram", state: "Andaman and Nicobar", region: "Islands", lat: 11.6234, lng: 92.7265, address: ["Survey no 1364, RNK water supply, Kamraj nagar", "Sri Vijaya puram - 744105"], phone: "+91 96555 99988", email: "info@isisecurity.in" },
  { id: "47", title: "Puducherry Office", city: "Karaikal", state: "Puducherry", region: "South", lat: 10.9254, lng: 79.8380, address: ["No. 43, Ambuthital Thirupattinam, Polagam, Karaikal,", "Puducherry – 609606"], phone: "+91 96555 99988", email: "info@isisecurity.in" },

  // --- COMING SOON ---
  { id: "9", title: "Kerala Office", city: "Kozhikode", state: "Kerala", region: "South", lat: 11.2588, lng: 75.7804, address: ["Coming Soon"], phone: "+91 96555 99988", email: "info@isisecurity.in" },
  { id: "12", title: "Mumbai Center", city: "Mumbai", state: "Maharashtra", region: "West", lat: 19.0760, lng: 72.8777, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "13", title: "Delhi Center", city: "Delhi", state: "Delhi", region: "North", lat: 28.6139, lng: 77.2090, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "14", title: "Kolkata Center", city: "Kolkata", state: "West Bengal", region: "East", lat: 22.5726, lng: 88.3639, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "15", title: "Amritsar Center", city: "Amritsar", state: "Punjab", region: "North", lat: 31.6340, lng: 74.8723, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "16", title: "Bhopal Center", city: "Bhopal", state: "Madhya Pradesh", region: "North", lat: 23.2599, lng: 77.4126, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "17", title: "Chandigarh Center", city: "Chandigarh", state: "Chandigarh", region: "North", lat: 30.7333, lng: 76.7794, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "18", title: "Faridabad Center", city: "Faridabad", state: "Haryana", region: "North", lat: 28.4089, lng: 77.3178, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "19", title: "Ghaziabad Center", city: "Ghaziabad", state: "Uttar Pradesh", region: "North", lat: 28.6692, lng: 77.4538, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "20", title: "Jamshedpur Center", city: "Jamshedpur", state: "Jharkhand", region: "East", lat: 22.8046, lng: 86.2029, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "21", title: "Jaipur Center", city: "Jaipur", state: "Rajasthan", region: "North", lat: 26.9124, lng: 75.7873, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "22", title: "Kochi Center", city: "Kochi", state: "Kerala", region: "South", lat: 9.9312, lng: 76.2673, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "23", title: "Lucknow Center", city: "Lucknow", state: "Uttar Pradesh", region: "North", lat: 26.8467, lng: 80.9462, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "24", title: "Nagpur Center", city: "Nagpur", state: "Maharashtra", region: "West", lat: 21.1458, lng: 79.0882, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "25", title: "Patna Center", city: "Patna", state: "Bihar", region: "East", lat: 25.5941, lng: 85.1376, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "26", title: "Raipur Center", city: "Raipur", state: "Chhattisgarh", region: "East", lat: 21.2514, lng: 81.6296, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "27", title: "Surat Center", city: "Surat", state: "Gujarat", region: "West", lat: 21.1702, lng: 72.8311, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "28", title: "Visakhapatnam Center", city: "Visakhapatnam", state: "Andhra Pradesh", region: "South", lat: 17.6868, lng: 83.2185, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "29", title: "Agra Center", city: "Agra", state: "Uttar Pradesh", region: "North", lat: 27.1767, lng: 78.0081, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "31", title: "Kanpur Center", city: "Kanpur", state: "Uttar Pradesh", region: "North", lat: 26.4499, lng: 80.3319, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "32", title: "Mysuru Center", city: "Mysuru", state: "Karnataka", region: "South", lat: 12.2958, lng: 76.6394, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "33", title: "Pune Center", city: "Pune", state: "Maharashtra", region: "West", lat: 18.5204, lng: 73.8567, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "34", title: "Ahmedabad Center", city: "Ahmedabad", state: "Gujarat", region: "West", lat: 23.0225, lng: 72.5714, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "35", title: "Trichy Center", city: "Trichy", state: "Tamil Nadu", region: "South", lat: 10.7905, lng: 78.7047, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "36", title: "Tirunelveli Center", city: "Tirunelveli", state: "Tamil Nadu", region: "South", lat: 8.7139, lng: 77.7567, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "37", title: "Tenkasi Center", city: "Tenkasi", state: "Tamil Nadu", region: "South", lat: 8.9591, lng: 77.3150, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "38", title: "Tiruppur Center", city: "Tiruppur", state: "Tamil Nadu", region: "South", lat: 11.1085, lng: 77.3411, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "40", title: "Hosur Center", city: "Hosur", state: "Tamil Nadu", region: "South", lat: 12.7409, lng: 77.8253, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "41", title: "Amarvati Center", city: "Amarvati", state: "Andhra Pradesh", region: "South", lat: 16.5062, lng: 80.5480, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "42", title: "Vijayawada Center", city: "Vijayawada", state: "Andhra Pradesh", region: "South", lat: 16.5062, lng: 80.6480, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "43", title: "Warangal Center", city: "Warangal", state: "Telangana", region: "South", lat: 17.9689, lng: 79.5941, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "44", title: "Anathapur Center", city: "Anathapur", state: "Andhra Pradesh", region: "South", lat: 14.6819, lng: 77.6006, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "45", title: "Mangalore Center", city: "Mangalore", state: "Karnataka", region: "South", lat: 12.9141, lng: 74.8560, address: ["Coming Soon"], email: "info@isisecurity.in" },
  { id: "46", title: "Hubbali Center", city: "Hubbali", state: "Karnataka", region: "South", lat: 15.3647, lng: 75.1240, address: ["Coming Soon"], email: "info@isisecurity.in" }
];
