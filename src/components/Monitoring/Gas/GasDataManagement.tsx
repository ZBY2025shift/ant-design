'use client'

import React, { useState } from 'react'
import { Card, Tabs, TabsProps } from 'antd'
import LandfillGasData from './LandfillGasData'
import AirStationData from './AirStationData'
import styles from './GasDataManagement.module.css'

const GasDataManagement: React.FC = () => {
  const [activeKey, setActiveKey] = useState('landfill')

  const items: TabsProps['items'] = [
    {
      key: 'landfill',
      label: '填埋气火炬监测',
      children: <LandfillGasData />,
    },
    {
      key: 'airstation',
      label: '空气微站监测',
      children: <AirStationData />,
    },
  ]

  return (
    <div className={styles.dataManagement}>
      <Card className={styles.card}>
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={items}
          className={styles.tabs}
        />
      </Card>
    </div>
  )
}

export default GasDataManagement