"use client";
import { LinkProps, LogoProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { StrapiImage } from "../StrapiImage";

interface HeaderProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
    cta: LinkProps;
  };
}

export function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerLight = pathname === "/experience";

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

  if (!data) return null;

  const { logo, navigation, cta } = data;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${headerLight ? "header--light" : ""}`}>
      <Link href="/" onClick={closeMenu}>
        <StrapiImage
          src={logo.image.url}
          alt={logo.image.alternativeText || "No alternative text provided"}
          className={`header__logo header__logo--${
            headerLight ? "white" : "black"
          }`}
          width={120}
          height={120}
        />
      </Link>
      
      {/* Desktop Navigation */}
      <ul className="header__nav header__nav--desktop">
        {navigation.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              target={item.isExternal ? "_blank" : "_self"}
            >
              <h5>{item.text}</h5>
            </Link>
          </li>
        ))}
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
          <HiX className="header__nav-toggle__icon" />
        ) : (
          <HiMenu className="header__nav-toggle__icon" />
        )}
      </button>

      {/* Mobile Navigation Overlay */}
      <div className={`header__mobile-overlay ${isMenuOpen ? "header__mobile-overlay--open" : ""}`}>
        <nav className="header__mobile-nav">
          <ul className="header__mobile-nav__list">
            {navigation.map((item) => (
              <li key={item.id} className="header__mobile-nav__item">
                <Link
                  href={item.href}
                  target={item.isExternal ? "_blank" : "_self"}
                  onClick={closeMenu}
                >
                  <h4>{item.text}</h4>
                </Link>
              </li>
            ))}
          </ul>
          <div className="header__mobile-nav__cta">
            <Link href={cta.href} target={cta.isExternal ? "_blank" : "_self"} onClick={closeMenu}>
              <button className="btn btn--black btn--medium">{cta.text}</button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}