import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

import { MENU_ITEM } from '../../../utils/item';

function Nav() {
  const [current, setCurrent] = useState(MENU_ITEM[0].text);

  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu selectedKeys={[current]} onClick={handleClick} mode="horizontal">
        {MENU_ITEM.map(item => (
          <Menu.Item key={item.text}>
            <Link to={item.to} style={{ textDecoration: 'none' }}>
              {item.text}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default Nav;
