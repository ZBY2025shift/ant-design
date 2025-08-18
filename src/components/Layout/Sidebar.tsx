'use client'

import React, { useState } from 'react'
import { Menu } from 'antd'
import {
  FallOutlined,
  ExperimentOutlined,
  DropboxOutlined,
  LoginOutlined,
  VideoCameraOutlined,
  BuildOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import styles from './Sidebar.module.css'

interface SidebarProps {
  selectedKey: string
  onMenuSelect: (key: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const menuItems = [
  {
    key: 'settlement',
    label: '沉降监测',
    icon: <FallOutlined />,
  },
  {
    key: 'gas',
    label: '气体监测',
    icon: <ExperimentOutlined />,
  },
  {
    key: 'leachate',
    label: '渗滤液监测',
    icon: <DropboxOutlined />,
  },
  {
    key: 'access',
    label: '出入管理',
    icon: <LoginOutlined />,
  },
  {
    key: 'video',
    label: '视频监控',
    icon: <VideoCameraOutlined />,
  },
  {
    key: 'phase1',
    label: '静脉产业园一期',
    icon: <BuildOutlined />,
  },
  {
    key: 'phase2',
    label: '静脉产业园二期',
    icon: <BuildOutlined />,
  },
  {
    key: 'carbon',
    label: '碳汇碳排放',
    icon: <EnvironmentOutlined />,
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: <SettingOutlined />,
  },
  {
    key: 'dashboard',
    label: '领导驾驶舱',
    icon: <DashboardOutlined />,
  },
]

const Sidebar: React.FC<SidebarProps> = ({
  selectedKey,
  onMenuSelect,
  collapsed,
  onToggleCollapse,
}) => {
  const handleMenuClick = ({ key }: { key: string }) => {
    onMenuSelect(key)
  }

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.toggleButton} onClick={onToggleCollapse}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        className={styles.menu}
        inlineCollapsed={collapsed}
        items={menuItems}
      />
    </aside>
  )
}

export default Sidebar