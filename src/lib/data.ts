import type {
  SalonOwner,
  BeautyProfessional,
  Listing,
  Notification,
  EarningTransaction,
  DashboardStats,
  Message,
  ChatMessage,
} from "./types";

// ========================
// Dashboard Statistics
// ========================
export const dashboardStats: DashboardStats = {
  beautyProfessionals: 689,
  salonOwners: 500,
  activeListings: 145,
  pendingApprovals: 20,
};

// ========================
// Salon Owners
// ========================
export const salonOwners: SalonOwner[] = [
  {
    id: "so-1",
    serialNumber: "#SL",
    name: "Luxe Beauty Suites",
    email: "owner@email.com",
    location: "Dallas",
    listings: 3,
    joinedDate: "Feb 2 2026",
    subscription: "$9.99/month",
  },
  {
    id: "so-2",
    serialNumber: "#SL",
    name: "Luxe Beauty Suites",
    email: "owner@email.com",
    location: "Dallas",
    listings: 3,
    joinedDate: "Feb 2 2026",
    subscription: "$9.99/month",
  },
  {
    id: "so-3",
    serialNumber: "#SL",
    name: "Luxe Beauty Suites",
    email: "owner@email.com",
    location: "Dallas",
    listings: 3,
    joinedDate: "Feb 2 2026",
    subscription: "$9.99/month",
  },
  {
    id: "so-4",
    serialNumber: "#SL",
    name: "Luxe Beauty Suites",
    email: "owner@email.com",
    location: "Dallas",
    listings: 3,
    joinedDate: "Feb 2 2026",
    subscription: "$9.99/month",
  },
  {
    id: "so-5",
    serialNumber: "#SL",
    name: "Luxe Beauty Suites",
    email: "owner@email.com",
    location: "Dallas",
    listings: 3,
    joinedDate: "Feb 2 2026",
    subscription: "$9.99/month",
  },
  {
    id: "so-6",
    serialNumber: "#SL",
    name: "Luxe Beauty Suites",
    email: "owner@email.com",
    location: "Dallas",
    listings: 3,
    joinedDate: "Feb 2 2026",
    subscription: "$9.99/month",
  },
  {
    id: "so-7",
    serialNumber: "#SL",
    name: "Luxe Beauty Suites",
    email: "owner@email.com",
    location: "Dallas",
    listings: 3,
    joinedDate: "Feb 2 2026",
    subscription: "$9.99/month",
  },
  {
    id: "so-8",
    serialNumber: "#SL",
    name: "Luxe Beauty Suites",
    email: "owner@email.com",
    location: "Dallas",
    listings: 3,
    joinedDate: "Feb 2 2026",
    subscription: "$9.99/month",
  },
];

// ========================
// Beauty Professionals
// ========================
export const beautyProfessionals: BeautyProfessional[] = [
  {
    id: "bp-1",
    serialNumber: "#SL",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    location: "Dallas",
    joinedDate: "Feb 2 2026",
  },
  {
    id: "bp-2",
    serialNumber: "#SL",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    location: "Dallas",
    joinedDate: "Feb 2 2026",
  },
  {
    id: "bp-3",
    serialNumber: "#SL",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    location: "Dallas",
    joinedDate: "Feb 2 2026",
  },
  {
    id: "bp-4",
    serialNumber: "#SL",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    location: "Dallas",
    joinedDate: "Feb 2 2026",
  },
  {
    id: "bp-5",
    serialNumber: "#SL",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    location: "Dallas",
    joinedDate: "Feb 2 2026",
  },
  {
    id: "bp-6",
    serialNumber: "#SL",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    location: "Dallas",
    joinedDate: "Feb 2 2026",
  },
  {
    id: "bp-7",
    serialNumber: "#SL",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    location: "Dallas",
    joinedDate: "Feb 2 2026",
  },
  {
    id: "bp-8",
    serialNumber: "#SL",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    location: "Dallas",
    joinedDate: "Feb 2 2026",
  },
];

// ========================
// Listings (Card-based)
// ========================
export const listings: Listing[] = [
  {
    id: "l-1",
    name: "Luxury Salon Station",
    description:
      "Spacious modern salon suite located in the heart of downtown. Perfect for hair stylists looking for flexible monthly leases. Includes access to all amenities and a professional environment.",
    owner: "Luxe Beauty Suites",
    ownerVerified: true,
    location: "Downtown, Los Angeles",
    price: "$500/month",
    rentalType: "Chair Rental",
    availability: "Immediate / Monthly Lease",
    amenities: [
      "Wi-Fi",
      "Parking",
      "Laundry",
      "Waiting Area",
      "Natural Light",
      "AC",
    ],
    status: "requested",
    image: "/images/salon-listing.png",
  },
  {
    id: "l-2",
    name: "Luxury Salon Station",
    description:
      "Spacious modern salon suite located in the heart of downtown. Perfect for hair stylists looking for flexible monthly leases. Includes access to all amenities and a professional environment.",
    owner: "Luxe Beauty Suites",
    ownerVerified: true,
    location: "Downtown, Los Angeles",
    price: "$500/month",
    rentalType: "Chair Rental",
    availability: "Immediate / Monthly Lease",
    amenities: [
      "Wi-Fi",
      "Parking",
      "Laundry",
      "Waiting Area",
      "Natural Light",
      "AC",
    ],
    status: "requested",
    image: "/images/salon-listing.png",
  },
  {
    id: "l-3",
    name: "Luxury Salon Station",
    description:
      "Spacious modern salon suite located in the heart of downtown. Perfect for hair stylists looking for flexible monthly leases. Includes access to all amenities and a professional environment.",
    owner: "Luxe Beauty Suites",
    ownerVerified: true,
    location: "Downtown, Los Angeles",
    price: "$500/month",
    rentalType: "Chair Rental",
    availability: "Immediate / Monthly Lease",
    amenities: [
      "Wi-Fi",
      "Parking",
      "Laundry",
      "Waiting Area",
      "Natural Light",
      "AC",
    ],
    status: "requested",
    image: "/images/salon-listing.png",
  },
  {
    id: "l-4",
    name: "Luxury Salon Station",
    description:
      "Spacious modern salon suite located in the heart of downtown. Perfect for hair stylists looking for flexible monthly leases. Includes access to all amenities and a professional environment.",
    owner: "Luxe Beauty Suites",
    ownerVerified: true,
    location: "Downtown, Los Angeles",
    price: "$500/month",
    rentalType: "Chair Rental",
    availability: "Immediate / Monthly Lease",
    amenities: [
      "Wi-Fi",
      "Parking",
      "Laundry",
      "Waiting Area",
      "Natural Light",
      "AC",
    ],
    status: "approved",
    image: "/images/salon-listing.png",
  },
  {
    id: "l-5",
    name: "Luxury Salon Station",
    description:
      "Spacious modern salon suite located in the heart of downtown. Perfect for hair stylists looking for flexible monthly leases. Includes access to all amenities and a professional environment.",
    owner: "Luxe Beauty Suites",
    ownerVerified: true,
    location: "Downtown, Los Angeles",
    price: "$500/month",
    rentalType: "Chair Rental",
    availability: "Immediate / Monthly Lease",
    amenities: [
      "Wi-Fi",
      "Parking",
      "Laundry",
      "Waiting Area",
      "Natural Light",
      "AC",
    ],
    status: "approved",
    image: "/images/salon-listing.png",
  },
  {
    id: "l-6",
    name: "Luxury Salon Station",
    description:
      "Spacious modern salon suite located in the heart of downtown. Perfect for hair stylists looking for flexible monthly leases. Includes access to all amenities and a professional environment.",
    owner: "Luxe Beauty Suites",
    ownerVerified: true,
    location: "Downtown, Los Angeles",
    price: "$500/month",
    rentalType: "Chair Rental",
    availability: "Immediate / Monthly Lease",
    amenities: [
      "Wi-Fi",
      "Parking",
      "Laundry",
      "Waiting Area",
      "Natural Light",
      "AC",
    ],
    status: "requested",
    image: "/images/salon-listing.png",
  },
];

// ========================
// Listings Pending Approval (for Dashboard table)
// ========================
export const pendingListings = [
  {
    id: "pl-1",
    name: "Luxe Beauty Suites",
    owner: "Sarah Smith",
    submittedOn: "03/13",
  },
  {
    id: "pl-2",
    name: "Luxe Beauty Suites",
    owner: "Sarah Smith",
    submittedOn: "03/13",
  },
  {
    id: "pl-3",
    name: "Luxe Beauty Suites",
    owner: "Sarah Smith",
    submittedOn: "03/13",
  },
  {
    id: "pl-4",
    name: "Luxe Beauty Suites",
    owner: "Sarah Smith",
    submittedOn: "03/13",
  },
  {
    id: "pl-5",
    name: "Luxe Beauty Suites",
    owner: "Sarah Smith",
    submittedOn: "03/13",
  },
  {
    id: "pl-6",
    name: "Luxe Beauty Suites",
    owner: "Sarah Smith",
    submittedOn: "03/13",
  },
  {
    id: "pl-7",
    name: "Luxe Beauty Suites",
    owner: "Sarah Smith",
    submittedOn: "03/13",
  },
  {
    id: "pl-8",
    name: "Luxe Beauty Suites",
    owner: "Sarah Smith",
    submittedOn: "03/13",
  },
];

// ========================
// Notifications
// ========================
export const notifications: Notification[] = [
  {
    id: "n-1",
    title: "You have received $500 from John Doe",
    description: "",
    timestamp: "Fri, 12:30pm",
    type: "payment",
    isHighlighted: true,
    read: false,
  },
  {
    id: "n-2",
    title: "New User registered.",
    description: "",
    timestamp: "Fri, 12:30pm",
    type: "registration",
    isHighlighted: false,
    read: true,
  },
  {
    id: "n-3",
    title: "New User registered.",
    description: "",
    timestamp: "Fri, 12:30pm",
    type: "registration",
    isHighlighted: false,
    read: true,
  },
  {
    id: "n-4",
    title: "New User registered.",
    description: "",
    timestamp: "Fri, 12:30pm",
    type: "registration",
    isHighlighted: false,
    read: true,
  },
];

// ========================
// Earnings
// ========================
export const earningTransactions: EarningTransaction[] = [
  {
    id: "e-1",
    transactionId: "#SL",
    userName: "Luxe Beauty Suites",
    subscription: "owner@email.com",
    amount: "$9.99/month",
    date: "07/11/2025",
  },
  {
    id: "e-2",
    transactionId: "#SL",
    userName: "Luxe Beauty Suites",
    subscription: "owner@email.com",
    amount: "$9.99/month",
    date: "07/11/2025",
  },
  {
    id: "e-3",
    transactionId: "#SL",
    userName: "Luxe Beauty Suites",
    subscription: "owner@email.com",
    amount: "$9.99/month",
    date: "07/11/2025",
  },
  {
    id: "e-4",
    transactionId: "#SL",
    userName: "Luxe Beauty Suites",
    subscription: "owner@email.com",
    amount: "$9.99/month",
    date: "07/11/2025",
  },
  {
    id: "e-5",
    transactionId: "#SL",
    userName: "Luxe Beauty Suites",
    subscription: "owner@email.com",
    amount: "$9.99/month",
    date: "07/11/2025",
  },
  {
    id: "e-6",
    transactionId: "#SL",
    userName: "Luxe Beauty Suites",
    subscription: "owner@email.com",
    amount: "$9.99/month",
    date: "07/11/2025",
  },
  {
    id: "e-7",
    transactionId: "#SL",
    userName: "Luxe Beauty Suites",
    subscription: "owner@email.com",
    amount: "$9.99/month",
    date: "07/11/2025",
  },
  {
    id: "e-8",
    transactionId: "#SL",
    userName: "Luxe Beauty Suites",
    subscription: "owner@email.com",
    amount: "$9.99/month",
    date: "07/11/2025",
  },
];

// ========================
// Messages / Inbox
// ========================
export const messages: Message[] = [
  {
    id: "m-1",
    senderName: "Jennifer Markus",
    lastMessage:
      "Hey! Did you finish the Hi-Fi wireframes for floro app design?",
    timestamp: "Today | 05:00 PM",
    unread: true,
  },
  {
    id: "m-2",
    senderName: "Iva Ryan",
    lastMessage:
      "Hey! Did you finish the Hi-Fi wireframes for floro app design?",
    timestamp: "Today | 05:30 PM",
    unread: false,
  },
  {
    id: "m-3",
    senderName: "Jerry Helfer",
    lastMessage:
      "Hey! Did you finish the Hi-Fi wireframes for floro app design?",
    timestamp: "Today | 05:00 PM",
    unread: false,
  },
  {
    id: "m-4",
    senderName: "David Elson",
    lastMessage:
      "Hey! Did you finish the Hi-Fi wireframes for floro app design?",
    timestamp: "Today | 05:00 PM",
    unread: false,
  },
  {
    id: "m-5",
    senderName: "Mary Freund",
    lastMessage:
      "Hey! Did you finish the Hi-Fi wireframes for floro app design?",
    timestamp: "Today | 05:00 PM",
    unread: false,
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "c-1",
    senderId: "m-1",
    content:
      "Oh, hello! All perfectly.\nI will check it and get back to you soon",
    timestamp: "04:45 PM",
    isOwn: false,
  },
  {
    id: "c-2",
    senderId: "admin",
    content:
      "Oh, hello! All perfectly.\nI will check it and get back to you soon",
    timestamp: "04:45 PM",
    isOwn: true,
  },
  {
    id: "c-3",
    senderId: "m-1",
    content:
      "Oh, hello! All perfectly.\nI will check it and get back to you soon",
    timestamp: "04:45 PM",
    isOwn: false,
  },
  {
    id: "c-4",
    senderId: "admin",
    content:
      "Oh, hello! All perfectly.\nI will check it and get back to you soon",
    timestamp: "04:45 PM",
    isOwn: true,
  },
];
