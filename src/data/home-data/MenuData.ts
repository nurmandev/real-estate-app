interface MenuItem {
  id: number;
  title: string;
  class_name?: string;
  link: string;
  has_dropdown: boolean;
  sub_menus?: {
    link: string;
    title: string;
  }[];
  menu_column?: {
    id: number;
    mega_title: string;
    mega_menus: {
      link: string;
      title: string;
    }[];
  }[];
}
[];

const menu_data: MenuItem[] = [
  {
    id: 1,
    has_dropdown: false,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    has_dropdown: false,
    title: "About Us",
    link: "/about_us_02",
  },
  {
    id: 3,
    has_dropdown: true,
    title: "Properties",
    link: "/listing",
    sub_menus: [
      { link: "/listing", title: "All Properties" },
      { link: "/listing?status=off-plan", title: "Off-Plan Properties" },
      { link: "/listing?status=secondary", title: "Secondary / Resale" },
      { link: "/listing?status=rent", title: "Rentals" },
    ],
  },
  {
    id: 4,
    has_dropdown: false,
    title: "Blog",
    link: "/blog_03",
  },
  {
    id: 5,
    has_dropdown: false,
    title: "Contact Us",
    link: "/contact",
  },
];
export default menu_data;
