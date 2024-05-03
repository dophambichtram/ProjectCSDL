import { BiGridAlt } from "react-icons/bi";
import { AiOutlineShopping, AiOutlineSnippets } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";

import { ROUTE } from "../constants/route";

const SidebarLinks = [
  //   {
  //     text: "Dashboard",
  //     path: ROUTE.INDEX,
  //     icon: <BiGridAlt />,
  //   },
  {
    text: "Orders",
    path: ROUTE.ORDER,
    icon: <AiOutlineShopping />,
  },

  {
    text: "Products",
    path: ROUTE.PRODUCT,
    icon: <AiOutlineSnippets />,
  },
  {
    text: "Customers",
    path: ROUTE.CUSTOMER,
    icon: <LuUsers />,
  },
];

export { SidebarLinks };
