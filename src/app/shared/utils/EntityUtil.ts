import { AppMenuItem } from "@/app/types/layout";
import { RouterPath } from "../constants/Router";

export class EntityUtil {
    static getEntityList(menus, res): AppMenuItem[] {
        let entityMenus = res ? res.map(e => {
            return {
                label: e.key,
                to: RouterPath.VIEW_ENTITY,
            }
        }) : [];

        let entityMenu = menus.find((q) => q.label == "Entity");
        if (entityMenu) {
            entityMenu.items = entityMenus;
        }
        return [...menus];
    }
}