'use client'

import React, { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './MainLayout.module.css'

interface MainLayoutProps {
  children: React.ReactNode
  onMenuSelect?: (key: string) => void
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onMenuSelect }) => {
  const [selectedMenuKey, setSelectedMenuKey] = useState('settlement')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth <= 768) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const handleMenuSelect = (key: string) => {
    setSelectedMenuKey(key)
    onMenuSelect?.(key)
    // 在移动端选择菜单后自动收起侧边栏
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className={styles.layout}>
      <Header />
      
      <div className={styles.body}>
        <Sidebar
          selectedKey={selectedMenuKey}
          onMenuSelect={handleMenuSelect}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
        
        <main 
          className={`${styles.content} ${
            sidebarCollapsed ? styles.contentExpanded : ''
          }`}
        >
          <div className={styles.contentInner}>
            {children}
          </div>
        </main>
      </div>
      
      {/* 移动端遮罩层 */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className={styles.overlay} 
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  )
}

export default MainLayout