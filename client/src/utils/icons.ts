import React from 'react';
import { 
  FaHome, FaBuilding, FaSearch, FaMapMarkerAlt, FaPhone, FaEnvelope, 
  FaUser, FaKey, FaCalculator, FaChartLine, FaShieldAlt, FaStar, 
  FaHeart, FaEye, FaHandshake, FaDollarSign, FaClipboardList, 
  FaTools, FaCog, FaLightbulb, FaRocket, FaAward, FaCheckCircle,
  FaInfoCircle, FaQuestionCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { 
  MdApartment, MdBusiness, MdLocationOn, MdEmail, MdPhone, 
  MdHome, MdSearch, MdPerson, MdSettings, MdHelp, MdInfo
} from 'react-icons/md';
import { 
  IoBusiness, IoHome, IoSearch, IoLocation, IoMail, IoCall,
  IoPerson, IoKey, IoCalculator, IoStatsChart, IoShield,
  IoStar, IoHeart, IoEye
} from 'react-icons/io5';
import { 
  GiHouse, GiModernCity, GiMagnifyingGlass, GiPhone,
  GiKey, GiCalculator, GiChart, GiShield, GiHearts,
  GiMoneyStack, GiToolbox, GiGears, GiLightBulb, GiRocket, GiTrophy, GiCheckMark,
  GiInfo
} from 'react-icons/gi';

// Enum of available icons - easily extendable
export enum IconName {
  // Font Awesome Icons
  FA_HOME = 'FaHome',
  FA_BUILDING = 'FaBuilding',
  FA_SEARCH = 'FaSearch',
  FA_MAP_MARKER = 'FaMapMarkerAlt',
  FA_PHONE = 'FaPhone',
  FA_ENVELOPE = 'FaEnvelope',
  FA_USER = 'FaUser',
  FA_KEY = 'FaKey',
  FA_CALCULATOR = 'FaCalculator',
  FA_CHART_LINE = 'FaChartLine',
  FA_SHIELD = 'FaShieldAlt',
  FA_STAR = 'FaStar',
  FA_HEART = 'FaHeart',
  FA_EYE = 'FaEye',
  FA_HANDSHAKE = 'FaHandshake',
  FA_DOLLAR = 'FaDollarSign',
  FA_CLIPBOARD = 'FaClipboardList',
  FA_TOOLS = 'FaTools',
  FA_COG = 'FaCog',
  FA_LIGHTBULB = 'FaLightbulb',
  FA_ROCKET = 'FaRocket',
  FA_AWARD = 'FaAward',
  FA_CHECK = 'FaCheckCircle',
  FA_INFO = 'FaInfoCircle',
  FA_QUESTION = 'FaQuestionCircle',
  FA_WARNING = 'FaExclamationTriangle',

  // Material Design Icons
  MD_APARTMENT = 'MdApartment',
  MD_BUSINESS = 'MdBusiness',
  MD_LOCATION = 'MdLocationOn',
  MD_EMAIL = 'MdEmail',
  MD_PHONE = 'MdPhone',
  MD_HOME = 'MdHome',
  MD_SEARCH = 'MdSearch',
  MD_PERSON = 'MdPerson',
  MD_SETTINGS = 'MdSettings',
  MD_HELP = 'MdHelp',
  MD_INFO = 'MdInfo',

  // Ionicons
  IO_BUSINESS = 'IoBusiness',
  IO_HOME = 'IoHome',
  IO_SEARCH = 'IoSearch',
  IO_LOCATION = 'IoLocation',
  IO_MAIL = 'IoMail',
  IO_CALL = 'IoCall',
  IO_PERSON = 'IoPerson',
  IO_KEY = 'IoKey',
  IO_CALCULATOR = 'IoCalculator',
  IO_STATS = 'IoStatsChart',
  IO_SHIELD = 'IoShield',
  IO_STAR = 'IoStar',
  IO_HEART = 'IoHeart',
  IO_EYE = 'IoEye',

  // Game Icons
  GI_HOUSE = 'GiHouse',
  GI_CITY = 'GiModernCity',
  GI_MAGNIFYING_GLASS = 'GiMagnifyingGlass',
  GI_PHONE = 'GiPhone',
  GI_KEY = 'GiKey',
  GI_CALCULATOR = 'GiCalculator',
  GI_CHART = 'GiChart',
  GI_SHIELD = 'GiShield',
  GI_HEART = 'GiHearts',
  GI_MONEY = 'GiMoneyStack',
  GI_TOOLBOX = 'GiToolbox',
  GI_GEAR = 'GiGears',
  GI_LIGHTBULB = 'GiLightBulb',
  GI_ROCKET = 'GiRocket',
  GI_TROPHY = 'GiTrophy',
  GI_CHECK = 'GiCheckMark',
  GI_INFO = 'GiInfo',
}

// Icon component mapping
const iconComponents: Record<IconName, React.ComponentType<any>> = {
  // Font Awesome
  [IconName.FA_HOME]: FaHome,
  [IconName.FA_BUILDING]: FaBuilding,
  [IconName.FA_SEARCH]: FaSearch,
  [IconName.FA_MAP_MARKER]: FaMapMarkerAlt,
  [IconName.FA_PHONE]: FaPhone,
  [IconName.FA_ENVELOPE]: FaEnvelope,
  [IconName.FA_USER]: FaUser,
  [IconName.FA_KEY]: FaKey,
  [IconName.FA_CALCULATOR]: FaCalculator,
  [IconName.FA_CHART_LINE]: FaChartLine,
  [IconName.FA_SHIELD]: FaShieldAlt,
  [IconName.FA_STAR]: FaStar,
  [IconName.FA_HEART]: FaHeart,
  [IconName.FA_EYE]: FaEye,
  [IconName.FA_HANDSHAKE]: FaHandshake,
  [IconName.FA_DOLLAR]: FaDollarSign,
  [IconName.FA_CLIPBOARD]: FaClipboardList,
  [IconName.FA_TOOLS]: FaTools,
  [IconName.FA_COG]: FaCog,
  [IconName.FA_LIGHTBULB]: FaLightbulb,
  [IconName.FA_ROCKET]: FaRocket,
  [IconName.FA_AWARD]: FaAward,
  [IconName.FA_CHECK]: FaCheckCircle,
  [IconName.FA_INFO]: FaInfoCircle,
  [IconName.FA_QUESTION]: FaQuestionCircle,
  [IconName.FA_WARNING]: FaExclamationTriangle,

  // Material Design
  [IconName.MD_APARTMENT]: MdApartment,
  [IconName.MD_BUSINESS]: MdBusiness,
  [IconName.MD_LOCATION]: MdLocationOn,
  [IconName.MD_EMAIL]: MdEmail,
  [IconName.MD_PHONE]: MdPhone,
  [IconName.MD_HOME]: MdHome,
  [IconName.MD_SEARCH]: MdSearch,
  [IconName.MD_PERSON]: MdPerson,
  [IconName.MD_SETTINGS]: MdSettings,
  [IconName.MD_HELP]: MdHelp,
  [IconName.MD_INFO]: MdInfo,

  // Ionicons
  [IconName.IO_BUSINESS]: IoBusiness,
  [IconName.IO_HOME]: IoHome,
  [IconName.IO_SEARCH]: IoSearch,
  [IconName.IO_LOCATION]: IoLocation,
  [IconName.IO_MAIL]: IoMail,
  [IconName.IO_CALL]: IoCall,
  [IconName.IO_PERSON]: IoPerson,
  [IconName.IO_KEY]: IoKey,
  [IconName.IO_CALCULATOR]: IoCalculator,
  [IconName.IO_STATS]: IoStatsChart,
  [IconName.IO_SHIELD]: IoShield,
  [IconName.IO_STAR]: IoStar,
  [IconName.IO_HEART]: IoHeart,
  [IconName.IO_EYE]: IoEye,

  // Game Icons
  [IconName.GI_HOUSE]: GiHouse,
  [IconName.GI_CITY]: GiModernCity,
  [IconName.GI_MAGNIFYING_GLASS]: GiMagnifyingGlass,
  [IconName.GI_PHONE]: GiPhone,
  [IconName.GI_KEY]: GiKey,
  [IconName.GI_CALCULATOR]: GiCalculator,
  [IconName.GI_CHART]: GiChart,
  [IconName.GI_SHIELD]: GiShield,
  [IconName.GI_HEART]: GiHearts,
  [IconName.GI_MONEY]: GiMoneyStack,
  [IconName.GI_TOOLBOX]: GiToolbox,
  [IconName.GI_GEAR]: GiGears,
  [IconName.GI_LIGHTBULB]: GiLightBulb,
  [IconName.GI_ROCKET]: GiRocket,
  [IconName.GI_TROPHY]: GiTrophy,
  [IconName.GI_CHECK]: GiCheckMark,
  [IconName.GI_INFO]: GiInfo,
};

// Interface for icon props
export interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  className?: string;
}

// Main icon component
export function Icon({ name, color = '#000000', size = 24, className = '' }: IconProps) {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon mapping`);
    return React.createElement('div', {
      className: `icon-fallback ${className}`,
      style: { 
        width: size, 
        height: size, 
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.6,
        color: '#999'
      },
      title: `Icon "${name}" not found`
    }, '?');
  }

  return React.createElement(IconComponent, {
    size: size,
    color: color,
    className: className
  });
}

// Helper function to get all available icon names
export function getAvailableIcons(): IconName[] {
  return Object.values(IconName);
}

// Helper function to get icon names as strings (for Strapi)
export function getIconNamesAsStrings(): string[] {
  return Object.values(IconName);
}

// Helper function to validate if an icon name exists
export function isValidIconName(name: string): name is IconName {
  return Object.values(IconName).includes(name as IconName);
} 