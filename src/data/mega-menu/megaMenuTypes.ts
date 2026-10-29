export interface MegaCardItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  badge?: string;
  metric?: string;
}

export interface MegaMenuItem {
  id: string;
  name: string;
  tag?: string;
  href: string;
  categoryGroup: string;
  breadcrumb: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cards: MegaCardItem[];
}

export interface MegaMenuGroup {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuConfig {
  menuKey: "industries" | "solutions" | "case-studies" | "partners";
  title: string;
  badgeText: string;
  bottomLink: {
    label: string;
    href: string;
  };
  groups: MegaMenuGroup[];
}
