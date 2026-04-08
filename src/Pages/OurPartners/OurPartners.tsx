import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Store, Phone, MapPin, Clock, Eye, Star, X,
  Award, Search, Navigation, Sparkles, Crown, Gem,
  Camera, Cake, Flower2, Music, Heart, ChevronDown, ChevronUp
} from 'lucide-react'

interface Partner {
  id: number
  name: string
  category: string
  subCategory: string
  image: string
  logo: string
  phone: string
  address: string
  openingHours: string
  rating: number
  reviews: number
  description: string
  featured: boolean
  verified: boolean
  amenities: string[]
  productsCount: number
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Elite Groom Tailoring",
    category: "mens-suits",
    subCategory: "Bridal Fashion",
    image: "https://images.unsplash.com/photo-1594938374223-9a140e0fe329?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1594938374223-9a140e0fe329?w=200&q=80",
    phone: "+20 123 456 789",
    address: "Downtown Mall, Cairo",
    openingHours: "10:00 AM - 10:00 PM",
    rating: 4.8,
    reviews: 234,
    description: "Premium men's suits and formal wear for the modern groom.",
    featured: true,
    verified: true,
    amenities: ["Free Parking", "VIP Room", "Alterations"],
    productsCount: 45
  },
  {
    id: 2,
    name: "Royal Suits",
    category: "mens-suits",
    subCategory: "Bridal Fashion",
    image: "https://images.unsplash.com/photo-1593032465178-9072e4e8e70e?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1593032465178-9072e4e8e70e?w=200&q=80",
    phone: "+20 234 567 890",
    address: "City Stars, Cairo",
    openingHours: "11:00 AM - 11:00 PM",
    rating: 4.6,
    reviews: 178,
    description: "Luxury suits and tuxedos for the discerning gentleman.",
    featured: false,
    verified: true,
    amenities: ["Free Parking", "Tailoring Service"],
    productsCount: 32
  },
  {
    id: 3,
    name: "Bridal Dreams",
    category: "bridal-dresses",
    subCategory: "Bridal Fashion",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&q=80",
    phone: "+20 345 678 901",
    address: "Zamalek, Cairo",
    openingHours: "10:00 AM - 9:00 PM",
    rating: 4.9,
    reviews: 456,
    description: "Exquisite wedding gowns from international designers.",
    featured: true,
    verified: true,
    amenities: ["Private Fitting", "International Brands", "Custom Design"],
    productsCount: 78
  },
  {
    id: 4,
    name: "Princess Bridal",
    category: "bridal-dresses",
    subCategory: "Bridal Fashion",
    image: "https://images.unsplash.com/photo-1532712932043-03e3fc7f2546?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1532712932043-03e3fc7f2546?w=200&q=80",
    phone: "+20 456 789 012",
    address: "5th Settlement, Cairo",
    openingHours: "11:00 AM - 10:00 PM",
    rating: 4.7,
    reviews: 312,
    description: "Affordable luxury bridal wear for every bride.",
    featured: false,
    verified: true,
    amenities: ["Free Consultation", "Payment Plans"],
    productsCount: 56
  },
  // Photographers
  {
    id: 5,
    name: "Capture The Moment",
    category: "photography",
    subCategory: "Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80",
    phone: "+20 567 890 123",
    address: "Maadi, Cairo",
    openingHours: "9:00 AM - 8:00 PM",
    rating: 4.9,
    reviews: 567,
    description: "Award-winning wedding photography and videography.",
    featured: true,
    verified: true,
    amenities: ["Drone Shots", "Same Day Edits", "Album Design"],
    productsCount: 120
  },
  {
    id: 6,
    name: "Elegant Frames",
    category: "photography",
    subCategory: "Photography",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80",
    phone: "+20 678 901 234",
    address: "Heliopolis, Cairo",
    openingHours: "10:00 AM - 9:00 PM",
    rating: 4.7,
    reviews: 389,
    description: "Artistic photography that tells your love story.",
    featured: false,
    verified: true,
    amenities: ["Pre-Wedding Shoot", "Cinematic Video"],
    productsCount: 89
  },
  // Makeup Artists
  {
    id: 7,
    name: "Glamour Studio",
    category: "makeup-hair",
    subCategory: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
    phone: "+20 789 012 345",
    address: "New Cairo",
    openingHours: "10:00 AM - 8:00 PM",
    rating: 4.8,
    reviews: 423,
    description: "Professional makeup and hair styling for brides.",
    featured: true,
    verified: true,
    amenities: ["Trial Session", "Bridal Party", "Airbrush Makeup"],
    productsCount: 34
  },
  // Wedding Cakes
  {
    id: 8,
    name: "Sweet Elegance Cakes",
    category: "wedding-cakes",
    subCategory: "Catering",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&q=80",
    phone: "+20 890 123 456",
    address: "Dokki, Cairo",
    openingHours: "9:00 AM - 7:00 PM",
    rating: 4.9,
    reviews: 298,
    description: "Custom-designed wedding cakes that taste as good as they look.",
    featured: false,
    verified: true,
    amenities: ["Custom Design", "Tasting Session", "Delivery"],
    productsCount: 45
  },
  // Decorations
  {
    id: 9,
    name: "Enchanted Decor",
    category: "event-decoration",
    subCategory: "Decor",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&q=80",
    phone: "+20 901 234 567",
    address: "Nasr City, Cairo",
    openingHours: "10:00 AM - 10:00 PM",
    rating: 4.8,
    reviews: 345,
    description: "Transform your venue into a fairytale setting.",
    featured: true,
    verified: true,
    amenities: ["Floral Design", "Lighting", "Furniture Rental"],
    productsCount: 67
  },
  // Venues
  {
    id: 10,
    name: "Grand Palace Hall",
    category: "wedding-halls",
    subCategory: "Venues",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&q=80",
    phone: "+20 012 345 678",
    address: "Downtown, Cairo",
    openingHours: "9:00 AM - 10:00 PM",
    rating: 4.9,
    reviews: 156,
    description: "Luxurious wedding hall with capacity up to 1000 guests.",
    featured: true,
    verified: true,
    amenities: ["Valet Parking", "Bridal Suite", "Catering"],
    productsCount: 3
  },
  {
    id: 11,
    name: "Garden Paradise",
    category: "outdoor-venues",
    subCategory: "Venues",
    image: "https://images.unsplash.com/photo-1464366400600-7168b7af5103?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1464366400600-7168b7af5103?w=200&q=80",
    phone: "+20 023 456 789",
    address: "New Cairo",
    openingHours: "8:00 AM - 8:00 PM",
    rating: 4.7,
    reviews: 98,
    description: "Beautiful garden venue for outdoor weddings.",
    featured: false,
    verified: true,
    amenities: ["Garden View", "Tents Available", "Parking"],
    productsCount: 2
  },
  // Invitations
  {
    id: 12,
    name: "Elegant Invitations",
    category: "invitations",
    subCategory: "Stationery",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80",
    phone: "+20 034 567 890",
    address: "Zamalek, Cairo",
    openingHours: "10:00 AM - 7:00 PM",
    rating: 4.8,
    reviews: 67,
    description: "Custom wedding invitations and stationery design.",
    featured: true,
    verified: true,
    amenities: ["Custom Design", "Fast Printing", "Delivery"],
    productsCount: 50
  },
  // Transportation
  {
    id: 13,
    name: "Royal Limousine",
    category: "luxury-cars",
    subCategory: "Transportation",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=80",
    phone: "+20 045 678 901",
    address: "Heliopolis, Cairo",
    openingHours: "24/7",
    rating: 4.9,
    reviews: 123,
    description: "Luxury car rental for weddings and special events.",
    featured: false,
    verified: true,
    amenities: ["Professional Chauffeur", "Decorated Cars", "On Time"],
    productsCount: 15
  },
  {
    id: 14,
    name: "Comfort Bus",
    category: "buses",
    subCategory: "Transportation",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&q=80",
    phone: "+20 056 789 012",
    address: "Maadi, Cairo",
    openingHours: "24/7",
    rating: 4.6,
    reviews: 45,
    description: "Comfortable bus transportation for wedding guests.",
    featured: false,
    verified: true,
    amenities: ["AC", "WiFi", "Punctual"],
    productsCount: 8
  },
  // Jewelry
  {
    id: 15,
    name: "Diamond Dreams",
    category: "engagement-rings",
    subCategory: "Jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80",
    phone: "+20 067 890 123",
    address: "City Stars, Cairo",
    openingHours: "11:00 AM - 10:00 PM",
    rating: 4.9,
    reviews: 234,
    description: "Exquisite engagement rings and diamond jewelry.",
    featured: true,
    verified: true,
    amenities: ["Certified Diamonds", "Custom Design", "Lifetime Warranty"],
    productsCount: 120
  },
  {
    id: 16,
    name: "Golden Bands",
    category: "wedding-bands",
    subCategory: "Jewelry",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80",
    phone: "+20 078 901 234",
    address: "5th Settlement, Cairo",
    openingHours: "10:00 AM - 9:00 PM",
    rating: 4.8,
    reviews: 178,
    description: "Beautiful wedding bands for him and her.",
    featured: false,
    verified: true,
    amenities: ["Gold & Platinum", "Engraving", "Sizing"],
    productsCount: 85
  },
  // ========== الأقسام الجديدة المضافة ==========

  // Bridal Veils
  {
    id: 17,
    name: "Veil Elegance",
    category: "bridal-veils",
    subCategory: "Bridal Fashion",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200&q=80",
    phone: "+20 111 222 333",
    address: "Zamalek, Cairo",
    openingHours: "10:00 AM - 8:00 PM",
    rating: 4.7,
    reviews: 89,
    description: "Handcrafted wedding veils and headpieces.",
    featured: false,
    verified: true,
    amenities: ["Custom Made", "Lace Work", "Express Delivery"],
    productsCount: 45
  },
  // Groom Tuxedos
  {
    id: 18,
    name: "Tuxedo Kingdom",
    category: "groom-tuxedos",
    subCategory: "Men's Formal Wear",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&q=80",
    phone: "+20 222 333 444",
    address: "Maadi, Cairo",
    openingHours: "11:00 AM - 9:00 PM",
    rating: 4.8,
    reviews: 156,
    description: "Premium tuxedos for the modern groom.",
    featured: true,
    verified: true,
    amenities: ["Tailoring", "Accessories", "VIP Fitting"],
    productsCount: 60
  },
  // Videographers
  {
    id: 19,
    name: "Cinematic Love",
    category: "videography",
    subCategory: "Photography & Video",
    image: "https://images.unsplash.com/photo-1536240474400-90ddb6e19df5?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1536240474400-90ddb6e19df5?w=200&q=80",
    phone: "+20 333 444 555",
    address: "Heliopolis, Cairo",
    openingHours: "10:00 AM - 8:00 PM",
    rating: 4.9,
    reviews: 234,
    description: "Cinematic wedding videos that tell your story.",
    featured: true,
    verified: true,
    amenities: ["Highlight Reel", "Full Coverage", "Drone Shots"],
    productsCount: 35
  },
  // Hair Stylists
  {
    id: 20,
    name: "Bridal Hair Studio",
    category: "hair-stylists",
    subCategory: "Beauty & Styling",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&q=80",
    phone: "+20 444 555 666",
    address: "New Cairo",
    openingHours: "9:00 AM - 8:00 PM",
    rating: 4.8,
    reviews: 178,
    description: "Professional hair styling for brides and bridal party.",
    featured: false,
    verified: true,
    amenities: ["Trial Session", "Bridal Party", "On Location"],
    productsCount: 20
  },
  // Beach Weddings
  {
    id: 21,
    name: "Beachside Romance",
    category: "beach-weddings",
    subCategory: "Venues & Locations",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=200&q=80",
    phone: "+20 555 666 777",
    address: "North Coast, Egypt",
    openingHours: "24/7",
    rating: 4.9,
    reviews: 89,
    description: "Beautiful beach wedding venue with sunset views.",
    featured: true,
    verified: true,
    amenities: ["Beach Setup", "Catering", "Accommodation"],
    productsCount: 5
  },
  // Catering Services
  {
    id: 22,
    name: "Gourmet Catering",
    category: "catering",
    subCategory: "Catering & Food",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1555244162-803834f70033?w=200&q=80",
    phone: "+20 666 777 888",
    address: "Dokki, Cairo",
    openingHours: "9:00 AM - 7:00 PM",
    rating: 4.8,
    reviews: 267,
    description: "Fine dining catering for weddings and events.",
    featured: true,
    verified: true,
    amenities: ["Tasting Session", "Custom Menu", "Staff Included"],
    productsCount: 50
  },
  // Flowers
  {
    id: 23,
    name: "Floral Fantasy",
    category: "flowers",
    subCategory: "Decor & Design",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=200&q=80",
    phone: "+20 777 888 999",
    address: "Zamalek, Cairo",
    openingHours: "9:00 AM - 9:00 PM",
    rating: 4.9,
    reviews: 345,
    description: "Stunning flower arrangements for your special day.",
    featured: true,
    verified: true,
    amenities: ["Bridal Bouquet", "Centerpieces", "Delivery"],
    productsCount: 80
  },
  // Zaffa
  {
    id: 24,
    name: "Traditional Zaffa",
    category: "zaffa",
    subCategory: "Entertainment",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&q=80",
    phone: "+20 888 999 000",
    address: "Nasr City, Cairo",
    openingHours: "24/7",
    rating: 4.9,
    reviews: 123,
    description: "Traditional Egyptian Zaffa with drummers and dancers.",
    featured: true,
    verified: true,
    amenities: ["Drummers", "Dancers", "LED Signs"],
    productsCount: 4
  },
  // Wedding Planners
  {
    id: 25,
    name: "Perfect Day Planners",
    category: "wedding-planners",
    subCategory: "Planning & Coordination",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&q=80",
    phone: "+20 999 000 111",
    address: "5th Settlement, Cairo",
    openingHours: "10:00 AM - 7:00 PM",
    rating: 4.9,
    reviews: 456,
    description: "Full-service wedding planning and coordination.",
    featured: true,
    verified: true,
    amenities: ["Budget Management", "Vendor Selection", "Day-of Coordination"],
    productsCount: 10
  },
  // Limousine
  {
    id: 26,
    name: "Elite Limousine",
    category: "limousine",
    subCategory: "Transportation",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200&q=80",
    phone: "+20 101 010 101",
    address: "Heliopolis, Cairo",
    openingHours: "24/7",
    rating: 4.8,
    reviews: 67,
    description: "Luxury limousine service for weddings.",
    featured: false,
    verified: true,
    amenities: ["Champagne", "Decorated", "Professional Chauffeur"],
    productsCount: 8
  },
  // Wedding Favors
  {
    id: 27,
    name: "Favor Factory",
    category: "favors",
    subCategory: "Gifts & Favors",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80",
    phone: "+20 202 020 202",
    address: "Maadi, Cairo",
    openingHours: "10:00 AM - 6:00 PM",
    rating: 4.7,
    reviews: 89,
    description: "Custom wedding favors and gifts for guests.",
    featured: false,
    verified: true,
    amenities: ["Custom Design", "Bulk Order", "Gift Wrapping"],
    productsCount: 100
  },
  // Honeymoon Packages
  {
    id: 28,
    name: "Honeymoon Dreams",
    category: "honeymoon-packages",
    subCategory: "Honeymoon & Travel",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    logo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80",
    phone: "+20 303 030 303",
    address: "Downtown, Cairo",
    openingHours: "9:00 AM - 8:00 PM",
    rating: 4.9,
    reviews: 156,
    description: "Luxury honeymoon packages to dream destinations.",
    featured: true,
    verified: true,
    amenities: ["Flight Booking", "Hotel Reservation", "Activities"],
    productsCount: 25
  }
]

// ========== الأقسام الكاملة (جميع الـ 40+ فلتر) ==========
const categories = [
  { id: "all", name: "All Partners", icon: Store, color: "gray" },
  // Bridal Fashion
  { id: "bridal-dresses", name: "Bridal Dresses", icon: Gem, color: "pink" },
  { id: "bridal-veils", name: "Bridal Veils", icon: Gem, color: "pink" },
  { id: "bridal-accessories", name: "Bridal Accessories", icon: Gem, color: "pink" },
  { id: "bridal-shoes", name: "Bridal Shoes", icon: Gem, color: "pink" },
  // Men's Formal Wear
  { id: "mens-suits", name: "Men's Suits", icon: Crown, color: "blue" },
  { id: "groom-tuxedos", name: "Groom Tuxedos", icon: Crown, color: "blue" },
  { id: "dress-shirts", name: "Dress Shirts", icon: Crown, color: "blue" },
  { id: "mens-accessories", name: "Men's Accessories", icon: Crown, color: "blue" },
  { id: "traditional-wear", name: "Traditional Wear", icon: Crown, color: "blue" },
  // Photography & Video
  { id: "photography", name: "Photographers", icon: Camera, color: "purple" },
  { id: "videography", name: "Videographers", icon: Camera, color: "purple" },
  { id: "drone-photography", name: "Drone Photography", icon: Camera, color: "purple" },
  { id: "photo-booths", name: "Photo Booths", icon: Camera, color: "purple" },
  // Beauty & Styling
  { id: "makeup-hair", name: "Makeup Artists", icon: Sparkles, color: "orange" },
  { id: "hair-stylists", name: "Hair Stylists", icon: Sparkles, color: "orange" },
  { id: "nail-artists", name: "Nail Artists", icon: Sparkles, color: "orange" },
  { id: "spa-services", name: "Spa Services", icon: Sparkles, color: "orange" },
  // Venues & Locations
  { id: "wedding-halls", name: "Wedding Halls", icon: Store, color: "indigo" },
  { id: "outdoor-venues", name: "Outdoor Venues", icon: Store, color: "indigo" },
  { id: "beach-weddings", name: "Beach Weddings", icon: Store, color: "indigo" },
  { id: "hotels-resorts", name: "Hotels & Resorts", icon: Store, color: "indigo" },
  // Catering & Food
  { id: "wedding-cakes", name: "Wedding Cakes", icon: Cake, color: "amber" },
  { id: "catering", name: "Catering Services", icon: Cake, color: "amber" },
  { id: "beverages", name: "Beverages & Bars", icon: Cake, color: "amber" },
  { id: "arabic-sweets", name: "Arabic Sweets", icon: Cake, color: "amber" },
  // Decor & Design
  { id: "event-decoration", name: "Event Decoration", icon: Flower2, color: "green" },
  { id: "flowers", name: "Flower Arrangements", icon: Flower2, color: "green" },
  { id: "lighting", name: "Lighting Design", icon: Flower2, color: "green" },
  { id: "furniture-rental", name: "Furniture Rental", icon: Flower2, color: "green" },
  // Entertainment
  { id: "music-entertainment", name: "DJs & Bands", icon: Music, color: "red" },
  { id: "zaffa", name: "Traditional Zaffa", icon: Music, color: "red" },
  { id: "dance", name: "Dance Performers", icon: Music, color: "red" },
  { id: "hosts", name: "Event Hosts", icon: Music, color: "red" },
  // Planning & Coordination
  { id: "wedding-planners", name: "Wedding Planners", icon: Store, color: "teal" },
  { id: "coordinators", name: "Event Coordinators", icon: Store, color: "teal" },
  { id: "budget-planning", name: "Budget Planning", icon: Store, color: "teal" },
  // Transportation
  { id: "car-rentals", name: "Luxury Car Rental", icon: Store, color: "slate" },
  { id: "limousine", name: "Limousine Service", icon: Store, color: "slate" },
  { id: "party-buses", name: "Party Buses", icon: Store, color: "slate" },
  { id: "luxury-cars", name: "Luxury Cars", icon: Store, color: "slate" },
  { id: "buses", name: "Buses & Shuttles", icon: Store, color: "slate" },
  // Gifts & Favors
  { id: "invitations", name: "Wedding Invitations", icon: Store, color: "cyan" },
  { id: "favors", name: "Wedding Favors", icon: Store, color: "cyan" },
  { id: "gift-boxes", name: "Gift Boxes", icon: Store, color: "cyan" },
  // Honeymoon & Travel
  { id: "honeymoon-packages", name: "Honeymoon Packages", icon: Store, color: "rose" },
  { id: "travel-agencies", name: "Travel Agencies", icon: Store, color: "rose" },
  { id: "hotel-booking", name: "Hotel Booking", icon: Store, color: "rose" },
  // Jewelry
  { id: "engagement-rings", name: "Engagement Rings", icon: Gem, color: "fuchsia" },
  { id: "wedding-bands", name: "Wedding Bands", icon: Gem, color: "fuchsia" },
]
const VISIBLE_CATEGORIES_COUNT = 12
export default function OurPartners() {
  const [searchParams, setSearchParams] = useSearchParams()

  // قراءة الفلترة من الـ URL
  const categoryFromUrl = searchParams.get('category')
  const initialCategory = categoryFromUrl && categories.some(c => c.id === categoryFromUrl)
    ? categoryFromUrl
    : "all"

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "featured">("featured")
  const [showAllCategories, setShowAllCategories] = useState(false)

  // تحديث الـ URL لما تتغير الفلترة يدوياً من المستخدم
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    if (categoryId === "all") {
      setSearchParams({})
    } else {
      setSearchParams({ category: categoryId })
    }
  }

  // استماع للتغيرات في الـ URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl && categories.some(c => c.id === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl)
    } else if (!categoryFromUrl) {
      setSelectedCategory('all')
    }
  }, [searchParams])

  // ✅ الأقسام اللي تظهر: 12 عنصر مع rotate لو فيه فئة مختارة مش ضمنهم
  const getDisplayedCategories = () => {
    const baseCategories = categories.slice(0, VISIBLE_CATEGORIES_COUNT)
    const baseIds = baseCategories.map(c => c.id)

    // لو الفئة المختارة مش "all" ومش موجودة في الأساسية
    if (selectedCategory !== "all" && !baseIds.includes(selectedCategory)) {
      const selectedCategoryObj = categories.find(c => c.id === selectedCategory)
      if (selectedCategoryObj) {
        // نزيل آخر عنصر من الأساسية ونضيف الفئة المختارة مكانه
        const newCategories = [...baseCategories]
        newCategories.pop() // نشيل آخر واحد
        newCategories.push(selectedCategoryObj) // نضيف الجديد
        return newCategories
      }
    }

    return baseCategories
  }

  // استخدمها بدل displayedCategories
  const displayedCategories = getDisplayedCategories()

  // فلترة الشركاء
  const filteredPartners = partners
    .filter(p => selectedCategory === "all" || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviews - a.reviews
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    })

  const handlePartnerClick = (partner: Partner) => {
    setSelectedPartner(partner)
    setIsModalOpen(true)
  }


  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-amber-50/30 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-amber-100 to-rose-100 rounded-full px-5 py-2">
              <span className="text-amber-700 font-medium text-sm flex items-center gap-2">
                <Store className="w-4 h-4" />
                Trusted Wedding Partners
              </span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-800 via-rose-700 to-amber-800 bg-clip-text text-transparent">
            Our Premium Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with the finest wedding service providers in Egypt, carefully curated for your special day
          </p>
        </motion.div>

        <div className="mb-10">
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {displayedCategories.map((cat) => {
              const Icon = cat.icon
              const isActive = selectedCategory === cat.id
              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive
                      ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </motion.button>
              )
            })}
          </div>
          {/* أضف هذا القسم بعد زر "Show All Categories" مباشرة */}
          {showAllCategories && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap justify-center gap-3 mt-4 pt-4 border-t border-gray-200"
            >
              {categories.slice(VISIBLE_CATEGORIES_COUNT).map((cat) => {
                const Icon = cat.icon
                const isActive = selectedCategory === cat.id
                return (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive
                        ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </motion.button>
                )
              })}
            </motion.div>
          )}

          {categories.length > VISIBLE_CATEGORIES_COUNT && (
            <div className="flex justify-center mb-6 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="flex items-center gap-2 px-5 py-2 bg-white border border-amber-200 rounded-full text-amber-600 text-sm font-medium hover:bg-amber-50 transition-all shadow-sm"
              >
                {showAllCategories ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show All Categories ({categories.length})
                  </>
                )}
              </motion.button>
            </div>
          )}

          <div className="flex flex-wrap justify-between items-center mt-2">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-amber-600">{filteredPartners.length}</span> partners
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {partner.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Featured
                    </div>
                  )}

                  {partner.verified && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-white text-xs font-medium">{partner.rating}</span>
                    <span className="text-white/60 text-xs">({partner.reviews})</span>
                  </div>
                </div>

                <div className="p-5">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-700 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                      {partner.description}
                    </p>
                  </div>

                  <div className="space-y-2 mt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-amber-500" />
                      <span>{partner.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span className="truncate">{partner.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>{partner.openingHours}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {partner.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {amenity}
                      </span>
                    ))}
                    {partner.amenities.length > 3 && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        +{partner.amenities.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePartnerClick(partner)}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:shadow-md transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No partners found</h3>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPartner && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative h-64">
                  <img
                    src={selectedPartner.image}
                    alt={selectedPartner.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">{selectedPartner.name}</h2>
                    <p className="text-white/90">{selectedPartner.description}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-amber-500" />
                        Contact Information
                      </h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{selectedPartner.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedPartner.address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{selectedPartner.openingHours}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <Navigation className="w-4 h-4" />
                          <a href="#" className="text-amber-600 hover:underline">Get Directions</a>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        Ratings & Reviews
                      </h3>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-amber-600">{selectedPartner.rating}</div>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedPartner.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{selectedPartner.reviews} reviews</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Store className="w-5 h-5 text-amber-500" />
                        Products & Services ({selectedPartner.productsCount})
                      </h3>
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <p className="text-gray-600 text-sm">
                          Browse through our collection of {selectedPartner.productsCount}+ products
                          tailored for your special day.
                        </p>
                      </div>

                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        Amenities
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedPartner.amenities.map((amenity, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Contact Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 border-2 border-amber-500 text-amber-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-amber-50 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                      Browse Products
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}