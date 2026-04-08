import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography, Divider } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import type { Page, Category } from "./navbar.types";

interface NavbarMobileProps {
    pages: Page[];
    categories: Category;
    mobileOpen: boolean;
    searchOpen: boolean;
    openCategories: boolean;
    language: "EN" | "عربي";
    onToggleMobile: (open: boolean) => void;
    onToggleSearch: (open: boolean) => void;
    onToggleCategories: (open: boolean) => void;
    onToggleLanguage: () => void;
    onPageClick: (path: string) => void;
}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}));

// تعريف mapping بين أسماء الأقسام في الـ navbar والـ category IDs في صفحة الشركاء
const categoryNameToId: Record<string, string> = {
    // Bridal Fashion
    "Men's Suits": "mens-suits",
    "Bridal Dresses": "bridal-dresses",
    "Wedding Veils": "bridal-veils",
    "Bridal Accessories": "bridal-accessories",
    "Bridal Shoes": "bridal-shoes",
    "Groom Tuxedos": "groom-tuxedos",
    "Dress Shirts": "dress-shirts",
    "Men's Accessories": "mens-accessories",
    "Traditional Wear": "traditional-wear",
    // Photography
    "Wedding Photographers": "photography",
    "Videographers": "videography",
    "Drone Photography": "drone-photography",
    "Photo Booths": "photo-booths",
    // Beauty
    "Makeup Artists": "makeup-hair",
    "Hair Stylists": "hair-stylists",
    "Nail Artists": "nail-artists",
    "Spa Services": "spa-services",
    // Venues
    "Wedding Halls": "wedding-halls",
    "Outdoor Venues": "outdoor-venues",
    "Beach Weddings": "beach-weddings",
    "Hotels & Resorts": "hotels-resorts",
    // Catering
    "Wedding Cakes": "wedding-cakes",
    "Catering Services": "catering",
    "Beverages & Bars": "beverages",
    "Arabic Sweets": "arabic-sweets",
    // Decor
    "Event Decoration": "event-decoration",
    "Flower Arrangements": "flowers",
    "Lighting Design": "lighting",
    "Furniture Rental": "furniture-rental",
    // Entertainment
    "DJs & Bands": "music-entertainment",
    "Traditional Zaffa": "zaffa",
    "Dance Performers": "dance",
    "Event Hosts": "hosts",
    // Planning
    "Wedding Planners": "wedding-planners",
    "Event Coordinators": "coordinators",
    "Budget Planning": "budget-planning",
    // Transportation
    "Luxury Car Rental": "car-rentals",
    "Limousine Service": "limousine",
    "Party Buses": "party-buses",
    // Gifts
    "Wedding Invitations": "invitations",
    "Wedding Favors": "favors",
    "Gift Boxes": "gift-boxes",
    // Honeymoon
    "Honeymoon Packages": "honeymoon-packages",
    "Travel Agencies": "travel-agencies",
    "Hotel Booking": "hotel-booking",
    // Jewelry
    "Engagement Rings": "engagement-rings",
    "Wedding Bands": "wedding-bands",
};

const NavbarMobile: React.FC<NavbarMobileProps> = ({
    pages,
    categories,
    mobileOpen,
    searchOpen,
    openCategories,
    language,
    onToggleMobile,
    onToggleSearch,
    onToggleCategories,
    onToggleLanguage,
    onPageClick
}) => {

    const [expandedMainCategory, setExpandedMainCategory] = React.useState<string | null>(null);

    const isNestedObject = (obj: any): obj is { [key: string]: string } => {
        return typeof obj === "object" && !Array.isArray(obj);
    };

    // دالة لبناء رابط الفلترة الصحيح للـ partners
    const getPartnerFilteredUrl = (categoryName: string): string => {
        const categoryId = categoryNameToId[categoryName];
        if (categoryId) {
            return `/our-partners?category=${categoryId}`;
        }
        // لو مش موجود في الـ mapping، استخدم الاسم محولاً
        return `/our-partners?category=${categoryName.toLowerCase().replace(/ /g, '-')}`;
    };

    // دالة لإعادة تعيين جميع الحالات المفتوحة
    const resetAllExpandedStates = () => {
        setExpandedMainCategory(null);
    };

    // دالة معالجة إغلاق القائمة مع إعادة تعيين الحالات
    const handleCloseDrawer = () => {
        resetAllExpandedStates();
        onToggleCategories(false);
        onToggleMobile(false);
    };

    // دالة معالجة الضغط على أي رابط
    const handleLinkClick = (path: string) => {
        onPageClick(path);
        handleCloseDrawer();
    };

    const handleMainCategoryExpand = (category: string) => {
        setExpandedMainCategory(expandedMainCategory === category ? null : category);
    };

    const handleSubCategoryClick = (path: string) => {
        handleLinkClick(path);
    };

    return (
        <>
            {/* TOP BAR */}
            {/* TOP BAR */}
            <Box
                sx={{
                    display: { xs: "flex", lg: "none" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    px: 2,
                    py: 1.5,
                    backgroundColor: "white",
                    borderBottom: "1px solid #eee",
                    position: "sticky",
                    top: 0,
                    zIndex: 1100
                }}
            >
                <Box component={Link} to="/">
                    <Box
                        component="img"
                        src="/Logo.PNG"
                        alt="Logo"
                        sx={{
                            height: 45,
                            cursor: "pointer"
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: 40,
                            height: 40,
                            mx: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Collapse
                            in={searchOpen}
                            orientation="horizontal"
                            timeout={250}
                            sx={{
                                position: "absolute",
                                right: 0,
                                zIndex: 10
                            }}
                        >
                            <Search sx={{ width: 220, boxShadow: 2, borderRadius: 2 }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    autoFocus
                                    placeholder="Search partners..."
                                    onBlur={() => onToggleSearch(false)}
                                />
                            </Search>
                        </Collapse>

                        {!searchOpen && (
                            <IconButton size="small" onClick={() => onToggleSearch(true)}>
                                <SearchIcon />
                            </IconButton>
                        )}
                    </Box>

                    {/* Favorite Button */}
                    <IconButton component={Link} to="/favorite" color="inherit" size="small">
                        <FavoriteBorderIcon />
                    </IconButton>

                    {/* Profile Button - Added */}
                    <IconButton component={Link} to="/profile" color="inherit" size="small">
                        <AccountCircleIcon />
                    </IconButton>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={onToggleLanguage}
                        sx={{
                            minWidth: 60,
                            borderColor: "#B8806A",
                            color: "#B8806A"
                        }}
                    >
                        {language}
                    </Button>

                    <IconButton onClick={() => onToggleMobile(true)} size="small">
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* DRAWER */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleCloseDrawer}
                PaperProps={{
                    sx: {
                        width: 320,
                        maxWidth: "85vw"
                    }
                }}
            >
                <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    {/* HEADER */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 2,
                            borderBottom: "1px solid #ddd",
                            background: "linear-gradient(135deg, #B8806A 0%, #9B6B56 100%)",
                            color: "white"
                        }}
                    >
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                                <DiamondIcon sx={{ fontSize: 20 }} />
                                WeddingHub
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                Find your perfect vendor
                            </Typography>
                        </Box>

                        <IconButton onClick={handleCloseDrawer} sx={{ color: "white" }}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* LINKS */}
                    <List sx={{ flexGrow: 1, overflow: "auto", pt: 1 }}>
                        {pages.map((page) => (
                            <ListItemButton
                                key={page.name}
                                component={Link}
                                to={page.path}
                                onClick={() => handleLinkClick(page.path)}
                                sx={{
                                    borderRadius: 2,
                                    mx: 1,
                                    mb: 0.5,
                                    "&:hover": {
                                        backgroundColor: alpha("#B8806A", 0.08)
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={page.name}
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                />
                            </ListItemButton>
                        ))}

                        <Divider sx={{ my: 1 }} />

                        {/* Wedding Services */}
                        <ListItemButton
                            onClick={() => onToggleCategories(!openCategories)}
                            sx={{
                                borderRadius: 2,
                                mx: 1,
                                mb: 0.5,
                                backgroundColor: openCategories ? alpha("#B8806A", 0.08) : "transparent"
                            }}
                        >
                            <ListItemText
                                primary="Wedding Services"
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                    color: "#B8806A"
                                }}
                            />
                            {openCategories ? <ExpandLessIcon sx={{ color: "#B8806A" }} /> : <ExpandMoreIcon />}
                        </ListItemButton>

                        <Collapse in={openCategories} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {Object.entries(categories).map(([mainCategory, categoryData]) => {
                                    const isExpanded = expandedMainCategory === mainCategory;
                                    const hasNested = isNestedObject(categoryData);

                                    return (
                                        <Box key={mainCategory}>
                                            <ListItemButton
                                                sx={{
                                                    pl: 3,
                                                    py: 1,
                                                    borderRadius: 2,
                                                    mx: 1,
                                                    backgroundColor: isExpanded ? alpha("#B8806A", 0.05) : "transparent"
                                                }}
                                                onClick={() => {
                                                    if (hasNested) {
                                                        handleMainCategoryExpand(mainCategory);
                                                    } else if (Array.isArray(categoryData) && categoryData.length > 0) {
                                                        // استخدام mapping للفلترة الصحيحة
                                                        const firstItem = categoryData[0];
                                                        const categoryName = typeof firstItem === 'string' ? firstItem : (firstItem as any)?.name || firstItem;
                                                        const url = getPartnerFilteredUrl(categoryName);
                                                        handleSubCategoryClick(url);
                                                    }
                                                }}
                                            >
                                                <ListItemText
                                                    primary={mainCategory}
                                                    primaryTypographyProps={{
                                                        fontSize: "0.9rem",
                                                        fontWeight: isExpanded ? 600 : 400
                                                    }}
                                                />
                                                {hasNested && (isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />)}
                                            </ListItemButton>

                                            {hasNested && isExpanded && (
                                                <List component="div" disablePadding>
                                                    {Object.entries(categoryData as Record<string, string>).map(([subCategory, pathOrValue]) => {
                                                        // تحديد الرابط المناسب
                                                        let url: string;
                                                        if (typeof pathOrValue === 'string') {
                                                            // لو كان path مباشر (مثلاً /our-partners?category=xxx)
                                                            if (pathOrValue.startsWith('/')) {
                                                                url = pathOrValue;
                                                            } else {
                                                                url = getPartnerFilteredUrl(subCategory);
                                                            }
                                                        } else {
                                                            // استخدم mapping
                                                            url = getPartnerFilteredUrl(subCategory);
                                                        }

                                                        return (
                                                            <ListItemButton
                                                                key={subCategory}
                                                                sx={{
                                                                    pl: 5,
                                                                    py: 0.75,
                                                                    borderRadius: 2,
                                                                    mx: 1,
                                                                    "&:hover": {
                                                                        backgroundColor: alpha("#B8806A", 0.08)
                                                                    }
                                                                }}
                                                                onClick={() => handleSubCategoryClick(url)}
                                                            >
                                                                <ListItemText
                                                                    primary={subCategory}
                                                                    primaryTypographyProps={{
                                                                        fontSize: "0.85rem",
                                                                        color: "text.secondary"
                                                                    }}
                                                                />
                                                            </ListItemButton>
                                                        );
                                                    })}
                                                </List>
                                            )}
                                        </Box>
                                    );
                                })}
                            </List>
                        </Collapse>
                    </List>

                    {/* FOOTER */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 2,
                            borderTop: "1px solid #eee",
                            backgroundColor: "#fafafa"
                        }}
                    >
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 0.5 }}>
                                <AccountCircleIcon sx={{ fontSize: 18, color: "#B8806A" }} />
                                Guest User
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Sign in for personalized experience
                            </Typography>
                        </Box>

                        <IconButton
                            color="error"
                            onClick={() => handleLinkClick("/login")}
                            size="small"
                            sx={{
                                backgroundColor: alpha("#f44336", 0.1),
                                "&:hover": {
                                    backgroundColor: alpha("#f44336", 0.2)
                                }
                            }}
                        >
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default NavbarMobile;