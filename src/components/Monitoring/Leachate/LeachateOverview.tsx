'use client'

import React from 'react'
import { Card, Row, Col } from 'antd'
import ReactECharts from 'echarts-for-react'
import { 
  DropboxOutlined, 
  ExportOutlined,
  DashboardOutlined,
  ExperimentOutlined,
} from '@ant-design/icons'
import styles from './LeachateOverview.module.css'

const LeachateOverview: React.FC = () => {
  // 生成最近7天的数据
  const generateChartData = (baseValue: number, variance: number) => {
    const days = ['2024-04-09', '2024-04-10', '2024-04-11', '2024-04-12', '2024-04-13', '2024-04-14', '2024-04-15']
    return days.map(() => baseValue + (Math.random() - 0.5) * variance)
  }

  const codData = generateChartData(120, 40)
  const ammoniaData = generateChartData(25, 10)
  const phData = generateChartData(7.2, 1.6)

  const createChartOption = (title: string, data: number[], unit: string, color: string) => ({
    title: {
      text: title,
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: '#333333'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const data = params[0]
        return `${data.name}<br/>${title}: ${data.value.toFixed(2)}${unit}`
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['04-09', '04-10', '04-11', '04-12', '04-13', '04-14', '04-15'],
      axisLabel: {
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      name: unit,
      nameTextStyle: {
        fontSize: 10,
        color: '#666666'
      },
      axisLabel: {
        fontSize: 10
      }
    },
    series: [
      {
        data: data,
        type: 'line',
        lineStyle: {
          color: color,
          width: 2
        },
        itemStyle: {
          color: color
        },
        symbol: 'circle',
        symbolSize: 4,
        smooth: true
      }
    ]
  })

  const renderSmallCard = (title: string, value: string, icon: React.ReactNode) => (
    <div className={styles.smallCard}>
      <div className={styles.smallCardIcon}>{icon}</div>
      <div className={styles.smallCardContent}>
        <div className={styles.smallCardTitle}>{title}</div>
        <div className={styles.smallCardValue}>{value}</div>
      </div>
    </div>
  )

  return (
    <div className={styles.overview}>
      <Row gutter={[16, 16]}>
        {/* 第一行：进水监测和排放监测 */}
        <Col xs={24} lg={12}>
          <Card className={styles.monitoringCard} title="进水监测">
            <div className={styles.smallCardsGrid}>
              {renderSmallCard('进液总数', '176409', <DropboxOutlined />)}
              {renderSmallCard('进液累计量', '200 吨', <DropboxOutlined />)}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className={styles.monitoringCard} title="排放监测">
            <div className={styles.smallCardsGrid}>
              {renderSmallCard('废水流量', '45.2 m³/h', <ExportOutlined />)}
              {renderSmallCard('排放PH', '7.3', <DashboardOutlined />)}
              {renderSmallCard('排放COD', '85 mg/L', <ExperimentOutlined />)}
              {renderSmallCard('排放氨氮', '15 mg/L', <ExperimentOutlined />)}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 第二行：分析图表 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={8}>
          <Card className={styles.chartCard}>
            <ReactECharts 
              option={createChartOption('COD 分析', codData, 'mg/L', '#0A2463')} 
              style={{ height: '200px' }}
              opts={{ renderer: 'canvas' }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className={styles.chartCard}>
            <ReactECharts 
              option={createChartOption('氨氮分析', ammoniaData, 'mg/L', '#1890ff')} 
              style={{ height: '200px' }}
              opts={{ renderer: 'canvas' }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className={styles.chartCard}>
            <ReactECharts 
              option={createChartOption('PH 分析', phData, '', '#52c41a')} 
              style={{ height: '200px' }}
              opts={{ renderer: 'canvas' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LeachateOverview