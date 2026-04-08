import React from "react";
import {Box, Container, Typography, Link, IconButton, Divider, useTheme, useMediaQuery, Stack} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn} from "@mui/icons-material";

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "/services/web-dev" },
        { label: "UI/UX Design", href: "/services/design" },
        { label: "SEO Optimization", href: "/services/seo" },
        { label: "Consulting", href: "/services/consulting" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Documentation", href: "/docs" },
        { label: "Support", href: "/support" },
        { label: "API Status", href: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "GDPR", href: "/gdpr" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 18 }} />,
      text: "hello@company.com",
      href: "mailto:hello@company.com",
    },
    {
      icon: <Phone sx={{ fontSize: 18 }} />,
      text: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <LocationOn sx={{ fontSize: 18 }} />,
      text: "123 Business Ave, Suite 100\nNew York, NY 10001",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: "#", label: "Facebook" },
    { icon: <Twitter />, href: "#", label: "Twitter" },
    { icon: <Instagram />, href: "#", label: "Instagram" },
    { icon: <LinkedIn />, href: "#", label: "LinkedIn" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          <Box sx={{ flex: "1 1 280px", minWidth: 250 }}>
            <Box sx={{ mb: 4 }}>
              <Box
                component="img"
                src="/Logo.PNG"
                alt="Company Logo"
                sx={{
                  height: 50,
                  mb: 3,
                  filter: "brightness(0.9)",
                }}
              />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 3,
                  lineHeight: 1.7,
                  fontSize: "0.95rem",
                }}
              >
                Creating exceptional digital experiences that drive innovation
                and growth for forward-thinking businesses worldwide.
              </Typography>
            </Box>

            <Stack spacing={2}>
              {contactInfo.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    color: "text.secondary",
                  }}
                >
                  <Box sx={{ mr: 2, mt: 0.2, color: "primary.main" }}>
                    {item.icon}
                  </Box>
                  <Link
                    href={item.href}
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: "none",
                      "&:hover": {
                        color: "primary.main",
                      },
                      whiteSpace: "pre-line",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </Link>
                </Box>
              ))}
            </Stack>

            <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    color: "text.secondary",
                    backgroundColor: "action.hover",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              flex: "2 1 500px",
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              justifyContent: "space-between",
            }}
          >
            {footerSections.map((section, index) => (
              <Box key={index} sx={{ minWidth: 120 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    mb: 3,
                    color: "text.primary",
                  }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={1.5}>
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: "primary.main",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <Divider />

      <Container maxWidth="xl">
        <Box
          sx={{
            py: 4,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 3 : 0,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: isMobile ? "center" : "left",
              width: isMobile ? "100%" : "auto",
            }}
          >
            © {new Date().getFullYear()} 5DIGEA . All rights reserved.
          </Typography>

          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? 1 : 3}
            alignItems={isMobile ? "center" : "flex-end"}
            sx={{ width: isMobile ? "100%" : "auto" }}
          >
            <Link
              href="/privacy"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
                transition: "color 0.2s ease",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
                transition: "color 0.2s ease",
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
                transition: "color 0.2s ease",
              }}
            >
              Sitemap
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
