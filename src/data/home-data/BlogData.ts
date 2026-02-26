interface DataType {
  id: number;
  page: string;
  class_name: string;
  date: string;
  info_name: string;
  info_time: number;
  title: string;
  data_delay_time?: string;
}

const blog_data: DataType[] = [
  {
    id: 1,
    page: "home_2",
    class_name: "blog-item-1",
    date: "24 FEB",
    info_name: "OMNIS Team",
    info_time: 5,
    title: "Top 10 High-Yield Investment Areas in Dubai for 2026.",
  },
  {
    id: 2,
    page: "home_2",
    class_name: "blog-item-2",
    date: "15 JAN",
    info_name: "Expert Insights",
    info_time: 8,
    title:
      "Understanding Golden Visa Requirements for Property Investors in UAE.",
    data_delay_time: "0.1s",
  },

  // home_4

  {
    id: 1,
    page: "home_4",
    class_name: "blog-item-1",
    date: "08 JAN",
    info_name: "Mark Quins . ",
    info_time: 8,
    title: "Print, publishing qui visual ux layout mockups.",
  },
  {
    id: 2,
    page: "home_4",
    class_name: "blog-item-2",
    date: "17 AUG",
    info_name: "Rashed Kabir . ",
    info_time: 7,
    title: "Designer’s Checklist for Every UX/UI Project.",
  },
  {
    id: 3,
    page: "home_4",
    class_name: "blog-item-3",
    date: "21 SEP",
    info_name: "Rashed Kabir . ",
    info_time: 8,
    title: "Spending Habits, 13 Tips for grow Your Money.",
  },
];

export default blog_data;
