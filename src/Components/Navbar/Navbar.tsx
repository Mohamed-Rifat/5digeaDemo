import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import type { Page, Category } from "./navbar.types";

const pages: Page[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Partners", path: "/our-partners" },
];

// Partner Categories Structure
const partnerCategories: Category = {
  "Bridal Fashion": {
    "Bridal Dresses": "/our-partners?category=bridal-dresses",
    "Wedding Veils": "/our-partners?category=bridal-veils",
    "Bridal Accessories": "/our-partners?category=bridal-accessories",
    "Bridal Shoes": "/our-partners?category=bridal-shoes",
  },
  "Men's Formal Wear": {
    "Men's Suits": "/our-partners?category=mens-suits",
    "Groom Tuxedos": "/our-partners?category=groom-tuxedos",
    "Dress Shirts": "/our-partners?category=dress-shirts",
    "Men's Accessories": "/our-partners?category=mens-accessories",
    "Traditional Wear": "/our-partners?category=traditional-wear",
  },
  "Photography & Video": {
    "Wedding Photographers": "/our-partners?category=photography",
    "Videographers": "/our-partners?category=videography",
    "Drone Photography": "/our-partners?category=drone-photography",
    "Photo Booths": "/our-partners?category=photo-booths",
  },
  "Beauty & Styling": {
    "Makeup Artists": "/our-partners?category=makeup-hair",
    "Hair Stylists": "/our-partners?category=hair-stylists",
    "Nail Artists": "/our-partners?category=nail-artists",
    "Spa Services": "/our-partners?category=spa-services",
  },
  "Venues & Locations": {
    "Wedding Halls": "/our-partners?category=wedding-halls",
    "Outdoor Venues": "/our-partners?category=outdoor-venues",
    "Beach Weddings": "/our-partners?category=beach-weddings",
    "Hotels & Resorts": "/our-partners?category=hotels-resorts",
  },
  "Catering & Food": {
    "Wedding Cakes": "/our-partners?category=wedding-cakes",
    "Catering Services": "/our-partners?category=catering",
    "Beverages & Bars": "/our-partners?category=beverages",
    "Arabic Sweets": "/our-partners?category=arabic-sweets",
  },
  "Decor & Design": {
    "Event Decoration": "/our-partners?category=event-decoration",
    "Flower Arrangements": "/our-partners?category=flowers",
    "Lighting Design": "/our-partners?category=lighting",
    "Furniture Rental": "/our-partners?category=furniture-rental",
  },
  "Entertainment": {
    "DJs & Bands": "/our-partners?category=music-entertainment",
    "Traditional Zaffa": "/our-partners?category=zaffa",
    "Dance Performers": "/our-partners?category=dance",
    "Event Hosts": "/our-partners?category=hosts",
  },
  "Planning & Coordination": {
    "Wedding Planners": "/our-partners?category=wedding-planners",
    "Event Coordinators": "/our-partners?category=coordinators",
    "Budget Planning": "/our-partners?category=budget-planning",
  },
  "Transportation": {
    "Luxury Car Rental": "/our-partners?category=car-rentals",
    "Limousine Service": "/our-partners?category=limousine",
    "Party Buses": "/our-partners?category=party-buses",
  },
  "Gifts & Favors": {
    "Wedding Invitations": "/our-partners?category=invitations",
    "Wedding Favors": "/our-partners?category=favors",
    "Gift Boxes": "/our-partners?category=gift-boxes",
  },
  "Honeymoon & Travel": {
    "Honeymoon Packages": "/our-partners?category=honeymoon-packages",
    "Travel Agencies": "/our-partners?category=travel-agencies",
    "Hotel Booking": "/our-partners?category=hotel-booking",
  },
};

export default function Navbar() {
  const navigate = useNavigate();

  const [anchorElCategories, setAnchorElCategories] =
    useState<HTMLElement | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [language, setLanguage] = useState<"EN" | "عربي">("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "عربي" : "EN"));
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElCategories(null);
  };

  const handlePageClick = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleCategorySelect = (path: string) => {
    navigate(path);
    setMobileOpen(false);
    handleCloseMenu();
  };

  return (
    <>
      <NavbarDesktop
        pages={pages}
        categories={partnerCategories}
        anchorElCategories={anchorElCategories}
        language={language}
        onOpenMenu={handleOpenMenu}
        onCloseMenu={handleCloseMenu}
        onCategorySelect={handleCategorySelect}
        onToggleLanguage={toggleLanguage}
        onPageClick={handlePageClick}
      />

      <NavbarMobile
        pages={pages}
        categories={partnerCategories}
        mobileOpen={mobileOpen}
        searchOpen={searchOpen}
        openCategories={openCategories}
        language={language}
        onToggleMobile={setMobileOpen}
        onToggleSearch={setSearchOpen}
        onToggleCategories={setOpenCategories}
        onToggleLanguage={toggleLanguage}
        onPageClick={handlePageClick}
      />
    </>
  );
}