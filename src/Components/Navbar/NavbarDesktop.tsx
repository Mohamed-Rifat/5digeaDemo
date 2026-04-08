import React from "react";
import { NavLink, Link } from "react-router-dom";
import type { ReactElement } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Fade, Slide, useScrollTrigger } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import type { Page, Category } from "./navbar.types";

interface NavbarDesktopProps {
    pages: Page[];
    categories: Category;
    anchorElCategories: HTMLElement | null;
    language: "EN" | "عربي";
    onOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onCloseMenu: () => void;
    onCategorySelect: (path: string) => void;
    onToggleLanguage: () => void;
    onPageClick: (path: string) => void;
}

interface HideOnScrollProps {
    children: ReactElement;
}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
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
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "20ch",
            "&:focus": {
                width: "25ch",
            },
        },
    },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 12,
        minWidth: 280,
        maxWidth: "90vw",
        maxHeight: "80vh",
        marginTop: theme.spacing(1),
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    },
}));

const CategoryHeader = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "0.875rem",
    color: "#B8806A",
    padding: theme.spacing(1, 2),
    backgroundColor: alpha("#B8806A", 0.05),
    marginBottom: theme.spacing(0.5),
}));

const SubCategoryItem = styled(MenuItem)(({ theme }) => ({
    fontSize: "0.875rem",
    padding: theme.spacing(0.75, 2),
    marginLeft: theme.spacing(2),
    borderRadius: 8,
    "&:hover": {
        backgroundColor: alpha("#B8806A", 0.08),
        color: "#B8806A",
    },
}));

function HideOnScroll(props: HideOnScrollProps) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

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
};

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({
    pages,
    categories,
    anchorElCategories,
    language,
    onOpenMenu,
    onCloseMenu,
    onCategorySelect,
    onToggleLanguage
}) => {
    const isNestedCategory = (value: any): value is { [key: string]: string } => {
        return value && typeof value === 'object' && !Array.isArray(value);
    };

    // دالة لبناء رابط الفلترة الصحيح
    const getFilteredUrl = (categoryName: string): string => {
        const categoryId = categoryNameToId[categoryName];
        if (categoryId) {
            return `/our-partners?category=${categoryId}`;
        }
        // لو مش موجود في الـ mapping، استخدم الاسم محولاً
        return `/our-partners?category=${categoryName.toLowerCase().replace(/ /g, '-')}`;
    };

    return (
        <HideOnScroll>
            <AppBar
                position="sticky"
                color="inherit"
                elevation={1}
                sx={{
                    display: { xs: "none", lg: "block" }
                }}
            >
                <Toolbar disableGutters>
                    <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center" }}>

                        {/* LOGO */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Box
                                component={Link}
                                to="/"
                                sx={{ display: "block" }}
                            >
                                <Box
                                    component="img"
                                    src="/Logo.PNG"
                                    alt="Logo"
                                    sx={{
                                        height: 80,
                                        cursor: "pointer"
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* NAV LINKS */}
                        <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}>

                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={NavLink}
                                    to={page.path}
                                    color="inherit"
                                    sx={{
                                        fontWeight: 500,
                                        "&.active": {
                                            color: "#B8806A",
                                            fontWeight: "bold"
                                        }
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}

                            <Button
                                color="inherit"
                                onClick={onOpenMenu}
                                endIcon={<ExpandMoreIcon />}
                                sx={{
                                    "&:hover": {
                                        color: "#B8806A"
                                    }
                                }}
                            >
                                Wedding Services
                            </Button>

                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder="Search…" />
                            </Search>

                            <Fade in={true}>
                                <IconButton
                                    component={Link}
                                    to="/favorite"
                                    color="inherit"
                                >
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </Fade>

                            <Fade in={true}>
                                <IconButton
                                    component={Link}
                                    to="/profile"
                                    color="inherit"
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                            </Fade>

                            <Button
                                variant="outlined"
                                size="small"
                                onClick={onToggleLanguage}
                                sx={{
                                    borderColor: "#B8806A",
                                    color: "#B8806A",
                                    "&:hover": {
                                        borderColor: "#A06B55",
                                        backgroundColor: alpha("#B8806A", 0.05)
                                    }
                                }}
                            >
                                {language}
                            </Button>

                            <Fade in={true}>
                                <IconButton
                                    color="error"
                                    component={Link}
                                    to="/login"
                                >
                                    <LogoutIcon />
                                </IconButton>
                            </Fade>
                        </Box>

                        {/* CATEGORIES MENU */}
                        <StyledMenu
                            anchorEl={anchorElCategories}
                            open={Boolean(anchorElCategories)}
                            onClose={onCloseMenu}
                            TransitionComponent={Fade}
                            transitionDuration={200}
                        >
                            <Box sx={{ p: 3, minWidth: 900 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, px: 1 }}>
                                    Browse by Service Category
                                </Typography>
                                <Divider sx={{ mb: 2 }} />

                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        md: 'repeat(3, 1fr)',
                                        lg: 'repeat(4, 1fr)',
                                        xl: 'repeat(5, 1fr)'
                                    },
                                    gap: 2
                                }}>
                                    {Object.entries(categories).map(([mainCategory, subCategories]) => (
                                        <Box key={mainCategory}>
                                            <CategoryHeader variant="subtitle2">
                                                {mainCategory}
                                            </CategoryHeader>
                                            {isNestedCategory(subCategories) ? (
                                                Object.entries(subCategories).map(([subCat, path]) => (
                                                    <SubCategoryItem
                                                        key={subCat}
                                                        onClick={() => onCategorySelect(path as string)}
                                                    >
                                                        {subCat}
                                                    </SubCategoryItem>
                                                ))
                                            ) : (
                                                (subCategories as string[]).map((subCat) => (
                                                    <SubCategoryItem
                                                        key={subCat}
                                                        onClick={() => onCategorySelect(getFilteredUrl(subCat))}
                                                    >
                                                        {subCat}
                                                    </SubCategoryItem>
                                                ))
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </StyledMenu>

                    </Container>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
};

export default NavbarDesktop;