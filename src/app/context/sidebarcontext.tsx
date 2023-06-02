"use client";
import { AppMenuItem } from "../types/layout";
import React, {
  createContext,
  useState,
} from "react";
import { ChildContainerProps } from "../types/types";

const initialMenu: AppMenuItem[] = [
  {
    label: "Dashboard",
    items: [
      {
        label: "Administration",
        icon: "pi pi-fw pi-home",
        to: "/components/Administration",
      },
    ],
  },
  {
    label: "Entity",
    items: [],
  },
];

export interface MenuItemContextProps {
  menus: AppMenuItem[];
  setMenus: React.Dispatch<React.SetStateAction<AppMenuItem[]>>;
}
export const SidebarContext = createContext({} as MenuItemContextProps);

export const SidebarProvider = ({ children }: ChildContainerProps) => {
  const [menus, setMenus] = useState(initialMenu);
  const value = {
    menus,
    setMenus,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
