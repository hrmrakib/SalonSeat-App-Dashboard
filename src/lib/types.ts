// ========================
// SalonSeat Dashboard Types
// ========================

export interface SalonOwner {
  id: string;
  serialNumber: string;
  name: string;
  email: string;
  location: string;
  listings: number;
  joinedDate: string;
  subscription: string;
  avatar?: string;
}

export interface BeautyProfessional {
  id: string;
  serialNumber: string;
  name: string;
  email: string;
  location: string;
  joinedDate: string;
  avatar?: string;
}

export interface Listing {
  id: string;
  name: string;
  description: string;
  owner: string;
  ownerVerified: boolean;
  location: string;
  price: string;
  rentalType: string;
  availability: string;
  amenities: string[];
  status: "requested" | "approved";
  image: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "payment" | "registration" | "system";
  isHighlighted: boolean;
  read: boolean;
}

export interface EarningTransaction {
  id: string;
  transactionId: string;
  userName: string;
  subscription: string;
  amount: string;
  date: string;
}

export interface DashboardStats {
  beautyProfessionals: number;
  salonOwners: number;
  activeListings: number;
  pendingApprovals: number;
}

export interface Message {
  id: string;
  senderName: string;
  senderAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export type UserTab = "salon-owner" | "beauty-professional";
export type ListingTab = "requested" | "approved";
