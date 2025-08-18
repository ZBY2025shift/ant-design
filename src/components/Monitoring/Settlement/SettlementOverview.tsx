'use client'

import React, { useState } from 'react'
import { Card, Select, Row, Col } from 'antd'
import ReactECharts from 'echarts-for-react'
import styles from './SettlementOverview.module.css'

const { Option } = Select

const SettlementOverview: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState('CJ001')
  const [selectedMonth, setSelectedMonth] = useState('2024-04')

  // 生成4月份的数据
  const generateChartData = () => {
    const days = Array.from({ length: 30 }, (_, i) => i + 1)
    const dates = days.map(day => `2024-04-${day.toString().padStart(2, '0')}`)
    
    // 前10天：0-13mm，后20天：13-22mm
    const values = days.map(day => {
      if (day <= 10) {
        return Math.random() * 13
      } else {
        return 13 + Math.random() * 9
      }
    })

    return { dates, values }
  }

  const { dates, values } = generateChartData()

  const chartOption = {
    title: {
      text: '月度沉降监测趋势',
      textStyle: {
        fontSize: 16,
        fontWeight: 500,
        color: '#333333'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const data = params[0]
        return `${data.name}<br/>沉降值: ${data.value.toFixed(2)}mm`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: {
        formatter: (value: string) => {
          const date = new Date(value)
          return `${date.getMonth() + 1}/${date.getDate()}`
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '沉降值(mm)',
      nameTextStyle: {
        color: '#666666'
      }
    },
    series: [
      {
        name: '预警线',
        type: 'line',
        data: dates.map(() => 10),
        lineStyle: {
          type: 'dashed',
          color: '#FFC107',
          width: 2
        },
        symbol: 'none',
        itemStyle: {
          color: '#FFC107'
        }
      },
      {
        name: '沉降值',
        type: 'line',
        data: values,
        lineStyle: {
          color: '#0A2463',
          width: 3
        },
        itemStyle: {
          color: '#0A2463'
        },
        symbol: 'circle',
        symbolSize: 4,
        markPoint: {
          data: [
            {
              coord: [dates[7], values[7]], // 第8天的交点
              itemStyle: { color: '#E53935' },
              symbolSize: 6
            },
            {
              coord: [dates[15], values[15]], // 第16天的交点
              itemStyle: { color: '#E53935' },
              symbolSize: 6
            }
          ]
        }
      }
    ]
  }

  return (
    <div className={styles.overview}>
      <Row gutter={[16, 16]}>
        {/* 第一行：三个数据卡片 */}
        <Col xs={24} sm={8} lg={8}>
          <Card className={styles.dataCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>最大沉降值</div>
              <div className={`${styles.cardValue} ${styles.primaryValue}`}>413mm</div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={8} lg={8}>
          <Card className={styles.dataCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>平均沉降值</div>
              <div className={`${styles.cardValue} ${styles.primaryValue}`}>167mm</div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={8} lg={8}>
          <Card className={styles.dataCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>预警点位数</div>
              <div className={`${styles.cardValue} ${styles.warningValue}`}>21 个</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 第二行：折线图 */}
      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.filterGroup}>
                <Select
                  value={selectedCode}
                  onChange={setSelectedCode}
                  style={{ width: 150, marginRight: 16 }}
                  placeholder="选择沉降编号"
                >
                  <Option value="CJ001">CJ001</Option>
                  <Option value="CJ002">CJ002</Option>
                  <Option value="CJ003">CJ003</Option>
                </Select>
                
                <Select
                  value={selectedMonth}
                  onChange={setSelectedMonth}
                  style={{ width: 150 }}
                  placeholder="选择年月"
                >
                  <Option value="2024-04">2024年4月</Option>
                  <Option value="2024-03">2024年3月</Option>
                  <Option value="2024-02">2024年2月</Option>
                </Select>
              </div>
            </div>
            
            <div className={styles.chartContainer}>
              <ReactECharts 
                option={chartOption} 
                style={{ height: '300px' }}
                opts={{ renderer: 'canvas' }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SettlementOverview