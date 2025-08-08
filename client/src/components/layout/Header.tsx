"use client";
import { LinkProps, LogoProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { StrapiImage } from "../StrapiImage";

interface HeaderProps {
  data?: {
    logo: LogoProps;
    navigation: LinkProps[];
    cta: LinkProps;
  } | null;
}

export function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const headerLight = pathname === "/experience";

  const MOBILE_BREAKPOINT = 900;

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      // setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT); // This line is removed
      // Close menu when switching from mobile to desktop
      if (window.innerWidth > MOBILE_BREAKPOINT && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMenuOpen]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle active link detection for section links
  useEffect(() => {
    if (!data?.navigation) return;
    
    // Check for different possible section link formats
    const sectionLinks = data.navigation.filter(link => {
      const isHashLink = link.href.startsWith('#');
      const isSlashLink = link.href.startsWith('/') && link.href.includes('#');
      const isRelativeLink = !link.href.startsWith('http') && link.href.includes('#');
      
      return isHashLink || isSlashLink || isRelativeLink;
    });
    
    if (sectionLinks.length === 0) {
      return;
    }

    // Function to determine which section is most visible
    const getMostVisibleSection = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const viewportTop = scrollY;
      const viewportBottom = scrollY + viewportHeight;
      
      let mostVisibleSection = null;
      let maxVisibility = 0;
      
      sectionLinks.forEach((link) => {
        // Extract section ID from different link formats
        let sectionId = '';
        if (link.href.startsWith('#')) {
          sectionId = link.href.substring(1);
        } else if (link.href.includes('#')) {
          sectionId = link.href.split('#')[1];
        }
        
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementBottom = elementTop + rect.height;
            
            // Calculate how much of the section is visible in the viewport
            const visibleTop = Math.max(elementTop, viewportTop);
            const visibleBottom = Math.min(elementBottom, viewportBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            // Calculate visibility percentage
            const visibility = visibleHeight / Math.min(rect.height, viewportHeight);
            
            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              mostVisibleSection = link.href;
            }
          }
        }
      });
      
      return { section: mostVisibleSection, visibility: maxVisibility };
    };

    // Function to update active link
    const updateActiveLink = () => {
      const { section, visibility } = getMostVisibleSection();
      
      if (section && visibility > 0.3) { // Only activate if section is at least 30% visible
        if (activeLink !== section) {
          setActiveLink(section);
        }
      } else {
        // Remove active link if no section is sufficiently visible or barely in view
        if (activeLink !== '') {
          setActiveLink('');
        }
      }
    };

    // Initial check
    updateActiveLink();

    // Add scroll listener with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data?.navigation, activeLink]);

  if (!data) return null;

  const { logo, navigation, cta } = data;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const renderNavLink = (item: LinkProps, isMobile: boolean = false) => {
    const isActive = activeLink === item.href;
    const Tag = isMobile ? 'h4' : 'h5';
    
    return (
      <li key={item.id} className={isMobile ? "header__mobile-nav__item" : ""}>
        <Link
          href={item.href}
          target={item.isExternal ? "_blank" : "_self"}
          onClick={isMobile ? closeMenu : undefined}
          className={isActive ? "header__nav-link--active" : ""}
        >
          <Tag>{item.text}</Tag>
        </Link>
      </li>
    );
  };

  return (
    <header className={`header ${headerLight ? "header--light" : ""}`}>
      <div className="header__wrapper">
        <Link href="/" onClick={closeMenu}>
          <StrapiImage
            src={logo.image.url}
            alt={logo.image.alternativeText || "No alternative text provided"}
            className={`header__logo header__logo--${
              headerLight ? "white" : "black"
            }`}
            width={120}
            height={60}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="header__nav header__nav--desktop">
          {navigation.map((item) => renderNavLink(item))}
        </ul>

        {/* Desktop CTA */}
        <div className="header__cta header__cta--desktop">
          <Link href={cta.href} target={cta.isExternal ? "_blank" : "_self"}>
            <button className="btn btn--black btn--small">{cta.text}</button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="header__nav-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <HiX className="header__nav-toggle__icon header__nav-toggle__icon--white" />
          ) : (
            <HiMenu className="header__nav-toggle__icon" />
          )}
        </button>

        {/* Mobile Navigation Overlay */}
        <div className={`header__mobile-overlay ${isMenuOpen ? "header__mobile-overlay--open" : ""}`}>
          <nav className="header__mobile-nav">
            <ul className="header__mobile-nav__list">
              {navigation.map((item) => renderNavLink(item, true))}
            </ul>
            <div className="header__mobile-nav__cta">
              <Link href={cta.href} target={cta.isExternal ? "_blank" : "_self"} onClick={closeMenu}>
                <button className="btn btn--black btn--medium">{cta.text}</button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}