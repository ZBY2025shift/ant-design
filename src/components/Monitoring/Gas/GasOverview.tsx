'use client'

import React, { useState } from 'react'
import { Card, Select, Row, Col, Alert } from 'antd'
import { 
  ExperimentOutlined, 
  DashboardOutlined, 
  FireOutlined,
  ThunderboltOutlined,
  CloudOutlined,
  EyeOutlined,
  WarningOutlined
} from '@ant-design/icons'
import styles from './GasOverview.module.css'

const { Option } = Select

// 空气微站监测数据
const airStationData = [
  { name: 'SO2', value: '2ppm', unit: 'ppm', icon: <CloudOutlined />, isExceeded: false },
  { name: 'NO2', value: '45ppb', unit: 'ppb', icon: <CloudOutlined />, isExceeded: false },
  { name: 'CO', value: '1.2ppm', unit: 'ppm', icon: <CloudOutlined />, isExceeded: false },
  { name: 'O3', value: '85ppb', unit: 'ppb', icon: <CloudOutlined />, isExceeded: false },
  { name: 'PM2.5', value: '300', unit: 'ug/m³', icon: <EyeOutlined />, isExceeded: true },
  { name: 'PM10', value: '500', unit: 'ug/m³', icon: <EyeOutlined />, isExceeded: true },
  { name: '温度', value: '25.3', unit: '℃', icon: <ThunderboltOutlined />, isExceeded: false },
  { name: '湿度', value: '68', unit: '%', icon: <ThunderboltOutlined />, isExceeded: false },
  { name: '风速', value: '3.2', unit: 'm/s', icon: <ThunderboltOutlined />, isExceeded: false },
  { name: '风向', value: '东北', unit: '', icon: <ThunderboltOutlined />, isExceeded: false },
  { name: '气压', value: '1013.2', unit: 'hPa', icon: <DashboardOutlined />, isExceeded: false },
]

const GasOverview: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState('KQ01')

  const renderDataCard = (title: string, data: any, icon: React.ReactNode) => (
    <Card className={styles.dataCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardIcon}>{icon}</div>
        <div className={styles.cardInfo}>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.cardData}>
            {typeof data === 'object' ? (
              Object.entries(data).map(([key, value]) => (
                <div key={key} className={styles.dataItem}>
                  <span className={styles.dataLabel}>{key}：</span>
                  <span className={styles.dataValue}>{value}</span>
                </div>
              ))
            ) : (
              <span className={styles.dataValue}>{data}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )

  const renderAirStationCard = (item: any, index: number) => (
    <div key={index} className={`${styles.airCard} ${item.isExceeded ? styles.exceededCard : ''}`}>
      <div className={styles.airCardIcon}>
        {item.icon}
        {item.isExceeded && <WarningOutlined className={styles.warningIcon} />}
      </div>
      <div className={styles.airCardContent}>
        <div className={styles.airCardTitle}>{item.name}</div>
        <div className={`${styles.airCardValue} ${item.isExceeded ? styles.exceededValue : ''}`}>
          {item.value}
          {item.unit && <span className={styles.unit}>{item.unit}</span>}
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.overview}>
      {/* 填埋气监测数据 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>填埋气监测数据</h3>
        <Row gutter={[16, 16]} className="responsive-cards">
          <Col xs={24} sm={12} lg={6}>
            {renderDataCard(
              '气体浓度',
              { '氧气浓度': '10% Vol', '甲烷浓度': '50% LEL' },
              <ExperimentOutlined />
            )}
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            {renderDataCard(
              '填埋气压力',
              '65MPa',
              <DashboardOutlined />
            )}
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            {renderDataCard(
              '填埋气流量',
              '20Nm³/h',
              <ThunderboltOutlined />
            )}
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            {renderDataCard(
              '火炬炉膛温度',
              { '火焰温度': '527℃', '管道温度': '358℃' },
              <FireOutlined />
            )}
          </Col>
        </Row>
      </div>

      {/* 空气微站监测数据 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>空气微站监测数据</h3>
          <Select
            value={selectedStation}
            onChange={setSelectedStation}
            style={{ width: 150 }}
            placeholder="选择监测点位"
          >
            <Option value="KQ01">KQ01</Option>
            <Option value="KQ02">KQ02</Option>
            <Option value="KQ03">KQ03</Option>
          </Select>
        </div>

        {/* 超标提醒 */}
        <Alert
          message="检测到污染物超标"
          description="PM2.5 超标：标准 150ug/m³，当前 300ug/m³；PM10 超标：标准 300ug/m³，当前 500ug/m³"
          type="warning"
          showIcon
          className={styles.alert}
        />

        <Card className={styles.airStationCard}>
          <div className={styles.airGrid}>
            {airStationData.map((item, index) => renderAirStationCard(item, index))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default GasOverview