'use client'

import React, { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import SettlementOverview from '@/components/Monitoring/Settlement/SettlementOverview'
import SettlementDataManagement from '@/components/Monitoring/Settlement/SettlementDataManagement'
import GasOverview from '@/components/Monitoring/Gas/GasOverview'
import GasDataManagement from '@/components/Monitoring/Gas/GasDataManagement'
import LeachateOverview from '@/components/Monitoring/Leachate/LeachateOverview'
import { Tabs, TabsProps } from 'antd'

const HomePage: React.FC = () => {
  const [activeModule, setActiveModule] = useState('settlement')

  // 沉降监测模块
  const settlementItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: '监测总览',
      children: <SettlementOverview />,
    },
    {
      key: 'data',
      label: '数据管理',
      children: <SettlementDataManagement />,
    },
  ]

  // 气体监测模块
  const gasItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: '监测总览',
      children: <GasOverview />,
    },
    {
      key: 'data',
      label: '数据管理',
      children: <GasDataManagement />,
    },
  ]

  // 渗滤液监测模块
  const leachateItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: '监测总览',
      children: <LeachateOverview />,
    },
    {
      key: 'data',
      label: '数据管理',
      children: <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>渗滤液数据管理功能开发中...</div>,
    },
  ]

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'settlement':
        return <Tabs items={settlementItems} />
      case 'gas':
        return <Tabs items={gasItems} />
      case 'leachate':
        return <Tabs items={leachateItems} />
      case 'access':
        return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>出入管理功能开发中...</div>
      case 'video':
        return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>视频监控功能开发中...</div>
      case 'phase1':
        return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>静脉产业园一期功能开发中...</div>
      case 'phase2':
        return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>静脉产业园二期功能开发中...</div>
      case 'carbon':
        return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>碳汇碳排放功能开发中...</div>
      case 'settings':
        return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>系统设置功能开发中...</div>
      case 'dashboard':
        return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>领导驾驶舱功能开发中...</div>
      default:
        return <Tabs items={settlementItems} />
    }
  }

  return (
    <MainLayout onMenuSelect={setActiveModule}>
      <div style={{ minHeight: 'calc(100vh - 100px)' }}>
        {renderModuleContent()}
      </div>
    </MainLayout>
  )
}

export default HomePage