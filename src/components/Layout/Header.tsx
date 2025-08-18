'use client'

import React, { useState } from 'react'
import { Dropdown, Avatar, MenuProps } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import styles from './Header.module.css'

const Header: React.FC = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false)

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'profile') {
      console.log('跳转到个人中心')
    } else if (key === 'logout') {
      console.log('退出登录')
    }
    setUserMenuVisible(false)
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人中心',
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.left}></div>
      
      <div className={styles.center}>
        <h1 className={styles.title}>荆门静脉产业园智慧管理系统</h1>
      </div>
      
      <div className={styles.right}>
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleMenuClick,
          }}
          trigger={['click']}
          open={userMenuVisible}
          onOpenChange={setUserMenuVisible}
          placement="bottomRight"
        >
          <div className={styles.userInfo}>
            <Avatar 
              size={40} 
              icon={<UserOutlined />} 
              className={styles.avatar}
            />
            <span className={styles.username}>张工程师</span>
          </div>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header