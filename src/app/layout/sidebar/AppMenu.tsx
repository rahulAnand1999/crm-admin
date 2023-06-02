import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';

const AppMenu = ({menuItems}) => {
    return (
            <ul className="layout-menu">
                {menuItems?.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label}  /> : <li className="menu-separator"></li>;
                  })}
           </ul>
    );
};

export default AppMenu;
