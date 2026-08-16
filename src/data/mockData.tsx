import { Play, Music, Palette, Shield, Cloud, Server, FileText, PenTool, Lock, CheckSquare, Video, Coffee, ShoppingBag, Car, Code, Box } from "lucide-react";
import React from "react";
import BrandLogo from "../components/ui/BrandLogo";
export interface Subscription {
  id: string;
  name: string;
  logo: React.ReactNode;
  color: string;
  plan: string;
  amount: number;
  billingCycle: "monthly" | "yearly" | "weekly";
  nextPayment: string;
  lastPayment: string;
  category: string;
  status: "healthy" | "review" | "zombie" | "trial" | "cancelled";
  zombieScore?: number;
  priceChange?: { from: number; to: number; date: string };
  trialEnds?: string;
  startDate: string;
  lifetimeSpend: number;
  account: string;
  usageLevel: "high" | "medium" | "low" | "none";
  duplicate?: string;
}

export interface Transaction {
  id: string;
  merchant: string;
  logo: React.ReactNode;
  category: string;
  date: string;
  account: string;
  amount: number;
  type: "recurring" | "normal" | "trial";
  subscriptionId?: string;
}

export interface Notification {
  id: string;
  type: "price_alert" | "upcoming_renewal" | "zombie_detected" | "savings" | "trial_ending";
  title: string;
  message: string;
  date: string;
  read: boolean;
  subscriptionId?: string;
}

export const subscriptions: Subscription[] = [
  {
    id: "netflix",
    name: "Netflix",
    logo: <BrandLogo id="netflix" />,
    color: "#E50914",
    plan: "Premium",
    amount: 15.99,
    billingCycle: "monthly",
    nextPayment: "Aug 22, 2025",
    lastPayment: "Jul 22, 2025",
    category: "Entertainment",
    status: "healthy",
    startDate: "Jan 14, 2025",
    lifetimeSpend: 321.67,
    account: "Visa •••• 4242",
    usageLevel: "high",
  },
  {
    id: "spotify",
    name: "Spotify",
    logo: <BrandLogo id="spotify" />,
    color: "#1DB954",
    plan: "Premium",
    amount: 10.99,
    billingCycle: "monthly",
    nextPayment: "Aug 17, 2025",
    lastPayment: "Jul 17, 2025",
    category: "Entertainment",
    status: "healthy",
    startDate: "Mar 5, 2024",
    lifetimeSpend: 176.84,
    account: "Mastercard •••• 8821",
    usageLevel: "high",
    duplicate: "apple-music",
  },
  {
    id: "canva",
    name: "Canva",
    logo: <BrandLogo id="canva" />,
    color: "#00C4CC",
    plan: "Pro",
    amount: 15.99,
    billingCycle: "monthly",
    nextPayment: "Aug 28, 2025",
    lastPayment: "Jul 28, 2025",
    category: "Software",
    status: "review",
    priceChange: { from: 12.99, to: 15.99, date: "Jul 1, 2025" },
    startDate: "Feb 20, 2024",
    lifetimeSpend: 205.44,
    account: "Visa •••• 4242",
    usageLevel: "medium",
  },
  {
    id: "nordvpn",
    name: "NordVPN",
    logo: <BrandLogo id="nordvpn" />,
    color: "#4687FF",
    plan: "Standard",
    amount: 12.99,
    billingCycle: "monthly",
    nextPayment: "Aug 30, 2025",
    lastPayment: "Jul 30, 2025",
    category: "Software",
    status: "zombie",
    zombieScore: 91,
    startDate: "Jun 15, 2023",
    lifetimeSpend: 337.74,
    account: "Visa •••• 4242",
    usageLevel: "none",
  },
  {
    id: "adobe",
    name: "Adobe",
    logo: <BrandLogo id="adobe" />,
    color: "#FF0000",
    plan: "Creative Cloud",
    amount: 54.99,
    billingCycle: "monthly",
    nextPayment: "Aug 27, 2025",
    lastPayment: "Jul 27, 2025",
    category: "Software",
    status: "trial",
    trialEnds: "Aug 17, 2025",
    startDate: "Jul 27, 2025",
    lifetimeSpend: 0,
    account: "Visa •••• 4242",
    usageLevel: "low",
  },
  {
    id: "icloud",
    name: "iCloud",
    logo: <BrandLogo id="icloud" />,
    color: "#147CE5",
    plan: "200GB",
    amount: 2.99,
    billingCycle: "monthly",
    nextPayment: "Aug 24, 2025",
    lastPayment: "Jul 24, 2025",
    category: "Cloud",
    status: "healthy",
    startDate: "Jan 1, 2023",
    lifetimeSpend: 95.68,
    account: "Visa •••• 4242",
    usageLevel: "high",
  },
  {
    id: "aws",
    name: "AWS",
    logo: <BrandLogo id="aws" />,
    color: "#FF9900",
    plan: "Pay-as-you-go",
    amount: 22.91,
    billingCycle: "monthly",
    nextPayment: "Sep 1, 2025",
    lastPayment: "Aug 1, 2025",
    category: "Cloud",
    status: "healthy",
    startDate: "Apr 10, 2024",
    lifetimeSpend: 388.47,
    account: "Visa •••• 4242",
    usageLevel: "high",
  },
  {
    id: "youtube-premium",
    name: "YouTube Premium",
    logo: <BrandLogo id="youtube-premium" />,
    color: "#FF0000",
    plan: "Individual",
    amount: 13.99,
    billingCycle: "monthly",
    nextPayment: "Aug 29, 2025",
    lastPayment: "Jul 29, 2025",
    category: "Entertainment",
    status: "review",
    zombieScore: 42,
    startDate: "Nov 8, 2023",
    lifetimeSpend: 265.81,
    account: "Mastercard •••• 8821",
    usageLevel: "low",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    logo: <BrandLogo id="dropbox" />,
    color: "#0061FF",
    plan: "Plus",
    amount: 11.99,
    billingCycle: "monthly",
    nextPayment: "Sep 3, 2025",
    lastPayment: "Aug 3, 2025",
    category: "Cloud",
    status: "review",
    zombieScore: 68,
    startDate: "May 20, 2023",
    lifetimeSpend: 407.66,
    account: "Visa •••• 4242",
    usageLevel: "low",
  },
  {
    id: "notion",
    name: "Notion",
    logo: <BrandLogo id="notion" />,
    color: "#FFFFFF",
    plan: "Plus",
    amount: 8.00,
    billingCycle: "monthly",
    nextPayment: "Aug 31, 2025",
    lastPayment: "Jul 31, 2025",
    category: "Software",
    status: "healthy",
    startDate: "Feb 1, 2024",
    lifetimeSpend: 120.00,
    account: "Mastercard •••• 8821",
    usageLevel: "high",
  },
  {
    id: "figma",
    name: "Figma",
    logo: <BrandLogo id="figma" />,
    color: "#F24E1E",
    plan: "Professional",
    amount: 15.00,
    billingCycle: "monthly",
    nextPayment: "Sep 5, 2025",
    lastPayment: "Aug 5, 2025",
    category: "Software",
    status: "healthy",
    startDate: "Jan 10, 2024",
    lifetimeSpend: 240.00,
    account: "Visa •••• 4242",
    usageLevel: "high",
  },
  {
    id: "github",
    name: "GitHub",
    logo: <BrandLogo id="github" />,
    color: "#F0F6FC",
    plan: "Pro",
    amount: 4.00,
    billingCycle: "monthly",
    nextPayment: "Sep 7, 2025",
    lastPayment: "Aug 7, 2025",
    category: "Software",
    status: "healthy",
    startDate: "Jan 1, 2023",
    lifetimeSpend: 128.00,
    account: "Visa •••• 4242",
    usageLevel: "high",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    logo: <BrandLogo id="apple-music" />,
    color: "#FA2D48",
    plan: "Individual",
    amount: 10.99,
    billingCycle: "monthly",
    nextPayment: "Aug 20, 2025",
    lastPayment: "Jul 20, 2025",
    category: "Entertainment",
    status: "review",
    zombieScore: 78,
    startDate: "Apr 15, 2024",
    lifetimeSpend: 175.84,
    account: "Visa •••• 4242",
    usageLevel: "low",
    duplicate: "spotify",
  },
  {
    id: "1password",
    name: "1Password",
    logo: <BrandLogo id="1password" />,
    color: "#1B66FF",
    plan: "Individual",
    amount: 2.99,
    billingCycle: "monthly",
    nextPayment: "Sep 2, 2025",
    lastPayment: "Aug 2, 2025",
    category: "Software",
    status: "healthy",
    startDate: "Mar 1, 2023",
    lifetimeSpend: 119.60,
    account: "Mastercard •••• 8821",
    usageLevel: "high",
  },
  {
    id: "todoist",
    name: "Todoist",
    logo: <BrandLogo id="todoist" />,
    color: "#DB4035",
    plan: "Pro",
    amount: 4.00,
    billingCycle: "monthly",
    nextPayment: "Aug 25, 2025",
    lastPayment: "Jul 25, 2025",
    category: "Software",
    status: "zombie",
    zombieScore: 72,
    startDate: "Sep 1, 2023",
    lifetimeSpend: 88.00,
    account: "Visa •••• 4242",
    usageLevel: "none",
  },
  {
    id: "zoom",
    name: "Zoom",
    logo: <BrandLogo id="zoom" />,
    color: "#2D8CFF",
    plan: "Pro",
    amount: 15.99,
    billingCycle: "monthly",
    nextPayment: "Sep 8, 2025",
    lastPayment: "Aug 8, 2025",
    category: "Software",
    status: "review",
    zombieScore: 55,
    startDate: "Jun 1, 2024",
    lifetimeSpend: 223.86,
    account: "Visa •••• 4242",
    usageLevel: "low",
  },
];

export const transactions: Transaction[] = [
  { id: "t1", merchant: "Netflix",
    logo: <BrandLogo id="netflix" />, category: "Entertainment", date: "Aug 12, 2025", account: "Visa •••• 4242", amount: 15.99, type: "recurring", subscriptionId: "netflix" },
  { id: "t2", merchant: "Starbucks", logo: <Coffee size={16} />, category: "Dining", date: "Aug 12, 2025", account: "Visa •••• 4242", amount: 6.50, type: "normal" },
  { id: "t3", merchant: "Spotify",
    logo: <BrandLogo id="spotify" />, category: "Entertainment", date: "Aug 11, 2025", account: "Mastercard •••• 8821", amount: 10.99, type: "recurring", subscriptionId: "spotify" },
  { id: "t4", merchant: "AWS", logo: <BrandLogo id="aws" />, category: "Cloud", date: "Aug 10, 2025", account: "Visa •••• 4242", amount: 22.91, type: "recurring", subscriptionId: "aws" },
  { id: "t5", merchant: "Figma", logo: <BrandLogo id="figma" />, category: "Software", date: "Aug 9, 2025", account: "Visa •••• 4242", amount: 15.00, type: "recurring", subscriptionId: "figma" },
  { id: "t6", merchant: "Amazon",
    logo: <ShoppingBag size={16} />, category: "Shopping", date: "Aug 9, 2025", account: "Visa •••• 4242", amount: 34.99, type: "normal" },
  { id: "t7", merchant: "Apple Music",
    logo: <BrandLogo id="apple-music" />, category: "Entertainment", date: "Aug 8, 2025", account: "Visa •••• 4242", amount: 10.99, type: "recurring", subscriptionId: "apple-music" },
  { id: "t8", merchant: "GitHub",
    logo: <BrandLogo id="github" />, category: "Software", date: "Aug 7, 2025", account: "Visa •••• 4242", amount: 4.00, type: "recurring", subscriptionId: "github" },
  { id: "t9", merchant: "Uber",
    logo: <Car size={16} />, category: "Transport", date: "Aug 7, 2025", account: "Mastercard •••• 8821", amount: 12.40, type: "normal" },
  { id: "t10", merchant: "1Password",
    logo: <BrandLogo id="1password" />, category: "Software", date: "Aug 6, 2025", account: "Mastercard •••• 8821", amount: 2.99, type: "recurring", subscriptionId: "1password" },
  { id: "t11", merchant: "NordVPN",
    logo: <BrandLogo id="nordvpn" />, category: "Software", date: "Aug 5, 2025", account: "Visa •••• 4242", amount: 12.99, type: "recurring", subscriptionId: "nordvpn" },
  { id: "t12", merchant: "Notion", logo: <BrandLogo id="notion" />, category: "Software", date: "Aug 4, 2025", account: "Mastercard •••• 8821", amount: 8.00, type: "recurring", subscriptionId: "notion" },
  { id: "t13", merchant: "Netflix",
    logo: <BrandLogo id="netflix" />, category: "Entertainment", date: "Jul 22, 2025", account: "Visa •••• 4242", amount: 15.99, type: "recurring", subscriptionId: "netflix" },
  { id: "t14", merchant: "iCloud", logo: <BrandLogo id="icloud" />, category: "Cloud", date: "Jul 22, 2025", account: "Visa •••• 4242", amount: 2.99, type: "recurring", subscriptionId: "icloud" },
  { id: "t15", merchant: "YouTube Premium", logo: <BrandLogo id="youtube-premium" />, category: "Entertainment", date: "Jul 21, 2025", account: "Mastercard •••• 8821", amount: 13.99, type: "recurring", subscriptionId: "youtube-premium" },
];

export const notifications: Notification[] = [
  { id: "n1", type: "price_alert", title: "Price Alert", message: "Canva increased to $15.99 — was $12.99. That's a 23% increase.", date: "Today, 9:41 AM", read: false, subscriptionId: "canva" },
  { id: "n2", type: "upcoming_renewal", title: "Upcoming Renewal", message: "Adobe Creative Cloud trial renews in 3 days at $54.99/month.", date: "Today, 8:00 AM", read: false, subscriptionId: "adobe" },
  { id: "n3", type: "zombie_detected", title: "Zombie Detected", message: "NordVPN Zombie Score reached 91. You haven't used this in 3 months.", date: "Yesterday, 3:22 PM", read: false, subscriptionId: "nordvpn" },
  { id: "n4", type: "savings", title: "Money Saved", message: "Cancelling Todoist saved you $48/year. Well done.", date: "Aug 10, 2025", read: true },
  { id: "n5", type: "upcoming_renewal", title: "Upcoming Renewal", message: "Netflix renews on Aug 22 — $15.99 will be charged to Visa •••• 4242.", date: "Aug 10, 2025", read: true, subscriptionId: "netflix" },
  { id: "n6", type: "trial_ending", title: "Trial Ending", message: "Adobe free trial ends in 3 days. Cancel now to avoid $54.99/month.", date: "Aug 9, 2025", read: true, subscriptionId: "adobe" },
  { id: "n7", type: "zombie_detected", title: "Zombie Detected", message: "Apple Music zombie score is 78. You also have Spotify active.", date: "Aug 8, 2025", read: true, subscriptionId: "apple-music" },
  { id: "n8", type: "price_alert", title: "Price Watch Alert", message: "NordVPN increased from $10.99 to $12.99 last month.", date: "Jul 30, 2025", read: true, subscriptionId: "nordvpn" },
];

export const spendingByMonth = [
  { month: "Feb", amount: 172 },
  { month: "Mar", amount: 181 },
  { month: "Apr", amount: 195 },
  { month: "May", amount: 202 },
  { month: "Jun", amount: 189 },
  { month: "Jul", amount: 184 },
  { month: "Aug", amount: 184 },
];

export const categoryBreakdown = [
  { name: "Entertainment", value: 32, amount: 59.08, color: "#A855F7" },
  { name: "Software", value: 28, amount: 51.72, color: "#7DF9FF" },
  { name: "Cloud", value: 16, amount: 29.55, color: "#38BDF8" },
  { name: "Gaming", value: 10, amount: 18.47, color: "#4ADE80" },
  { name: "Education", value: 8, amount: 14.78, color: "#FBBF24" },
  { name: "Other", value: 6, amount: 11.08, color: "#FB7185" },
];

export const savingsOpportunities = [
  { id: "nordvpn", name: "Cancel NordVPN", reason: "Zombie Score 91 — not used in 3+ months", monthly: 12.99, yearly: 155.88, action: "cancel", subscriptionId: "nordvpn", urgency: "high" },
  { id: "apple-music", name: "Remove Apple Music", reason: "Duplicate with Spotify — same category, both active", monthly: 10.99, yearly: 131.88, action: "cancel", subscriptionId: "apple-music", urgency: "high" },
  { id: "canva", name: "Downgrade Canva", reason: "Switch to free tier — low monthly usage detected", monthly: 8.00, yearly: 96.00, action: "downgrade", subscriptionId: "canva", urgency: "medium" },
  { id: "adobe", name: "Cancel Adobe Trial", reason: "Trial ends in 3 days — $54.99/month after", monthly: 21.00, yearly: 252.00, action: "cancel-trial", subscriptionId: "adobe", urgency: "critical" },
];

export const upcomingPayments = [
  { id: "u1", name: "Spotify", amount: 10.99, date: "Aug 17", daysUntil: 3, subscriptionId: "spotify", logo: <BrandLogo id="spotify" />, color: "#1DB954" },
  { id: "u2", name: "Apple Music", amount: 10.99, date: "Aug 20", daysUntil: 6, subscriptionId: "apple-music", logo: <BrandLogo id="apple-music" />, color: "#FA2D48" },
  { id: "u3", name: "Netflix", amount: 15.99, date: "Aug 22", daysUntil: 8, subscriptionId: "netflix", logo: <BrandLogo id="netflix" />, color: "#E50914" },
  { id: "u4", name: "iCloud", amount: 2.99, date: "Aug 24", daysUntil: 10, subscriptionId: "icloud", logo: <BrandLogo id="icloud" />, color: "#147CE5" },
  { id: "u5", name: "Todoist", amount: 4.00, date: "Aug 25", daysUntil: 11, subscriptionId: "todoist", logo: <BrandLogo id="todoist" />, color: "#DB4035" },
  { id: "u6", name: "Adobe", amount: 54.99, date: "Aug 27", daysUntil: 13, subscriptionId: "adobe", logo: <BrandLogo id="adobe" />, color: "#FF0000" },
  { id: "u7", name: "Canva", amount: 15.99, date: "Aug 28", daysUntil: 14, subscriptionId: "canva", logo: <BrandLogo id="canva" />, color: "#00C4CC" },
  { id: "u8", name: "YouTube Premium", amount: 13.99, date: "Aug 29", daysUntil: 15, subscriptionId: "youtube-premium", logo: <BrandLogo id="youtube-premium" />, color: "#FF0000" },
  { id: "u9", name: "NordVPN", amount: 12.99, date: "Aug 30", daysUntil: 16, subscriptionId: "nordvpn", logo: <BrandLogo id="nordvpn" />, color: "#4687FF" },
  { id: "u10", name: "Notion", amount: 8.00, date: "Aug 31", daysUntil: 17, subscriptionId: "notion", logo: <BrandLogo id="notion" />, color: "#FFFFFF" },
];

export const familyMembers = [
  { id: "m1", name: "Nakib Md Ashik", avatar: "N", subscriptions: 7, monthly: 81, color: "#A855F7" },
  { id: "m2", name: "Sarah Chen", avatar: "S", subscriptions: 4, monthly: 42, color: "#7DF9FF" },
  { id: "m3", name: "James Park", avatar: "J", subscriptions: 3, monthly: 36, color: "#4ADE80" },
];
