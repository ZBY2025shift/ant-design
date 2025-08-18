'use client'

import React, { useState } from 'react'
import { 
  Table, 
  Button, 
  DatePicker, 
  Select,
  Space,
  message,
  Pagination
} from 'antd'
import { 
  SearchOutlined, 
  ReloadOutlined, 
  ExportOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import styles from './AirStationData.module.css'

const { Option } = Select

interface AirStationRecord {
  key: string
  id: number
  date: string
  station: string
  coordinates: string
  so2: number
  no2: number
  co: number
  o3: number
  pm25: number
  pm10: number
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: string
  pressure: number
}

const mockData: AirStationRecord[] = Array.from({ length: 50 }, (_, index) => ({
  key: (index + 1).toString(),
  id: index + 1,
  date: dayjs().subtract(Math.floor(Math.random() * 30), 'day').format('YYYY-MM-DD'),
  station: `KQ${(index % 3 + 1).toString().padStart(2, '0')}`,
  coordinates: `${(112.123 + Math.random() * 0.001).toFixed(3)}, ${(31.045 + Math.random() * 0.001).toFixed(3)}`,
  so2: Math.random() * 5,
  no2: Math.random() * 80 + 20,
  co: Math.random() * 3,
  o3: Math.random() * 120 + 30,
  pm25: Math.random() * 400 + 50,
  pm10: Math.random() * 600 + 100,
  temperature: Math.random() * 20 + 15,
  humidity: Math.random() * 40 + 40,
  windSpeed: Math.random() * 8 + 1,
  windDirection: ['东', '南', '西', '北', '东北', '东南', '西北', '西南'][Math.floor(Math.random() * 8)],
  pressure: Math.random() * 50 + 1000,
}))

const AirStationData: React.FC = () => {
  const [data, setData] = useState<AirStationRecord[]>(mockData.slice(0, 10))
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const [selectedStation, setSelectedStation] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [total] = useState(50)

  const columns: ColumnsType<AirStationRecord> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '监测点',
      dataIndex: 'station',
      key: 'station',
      width: 100,
    },
    {
      title: '坐标值(xy)',
      dataIndex: 'coordinates',
      key: 'coordinates',
      width: 150,
    },
    {
      title: 'SO2(ppm)',
      dataIndex: 'so2',
      key: 'so2',
      width: 100,
      render: (value: number) => value.toFixed(1),
    },
    {
      title: 'NO2(ppb)',
      dataIndex: 'no2',
      key: 'no2',
      width: 100,
      render: (value: number) => value.toFixed(0),
    },
    {
      title: 'CO(ppm)',
      dataIndex: 'co',
      key: 'co',
      width: 100,
      render: (value: number) => value.toFixed(1),
    },
    {
      title: 'O3(ppb)',
      dataIndex: 'o3',
      key: 'o3',
      width: 100,
      render: (value: number) => value.toFixed(0),
    },
    {
      title: 'PM2.5(ug/m³)',
      dataIndex: 'pm25',
      key: 'pm25',
      width: 120,
      render: (value: number) => {
        const isExceeded = value > 150
        return (
          <span style={{ color: isExceeded ? '#E53935' : '#333333' }}>
            {value.toFixed(0)}
            {isExceeded && ' ⚠️'}
          </span>
        )
      },
    },
    {
      title: 'PM10(ug/m³)',
      dataIndex: 'pm10',
      key: 'pm10',
      width: 120,
      render: (value: number) => {
        const isExceeded = value > 300
        return (
          <span style={{ color: isExceeded ? '#E53935' : '#333333' }}>
            {value.toFixed(0)}
            {isExceeded && ' ⚠️'}
          </span>
        )
      },
    },
    {
      title: '温度(℃)',
      dataIndex: 'temperature',
      key: 'temperature',
      width: 100,
      render: (value: number) => value.toFixed(1),
    },
    {
      title: '湿度(%)',
      dataIndex: 'humidity',
      key: 'humidity',
      width: 100,
      render: (value: number) => value.toFixed(0),
    },
    {
      title: '风速(m/s)',
      dataIndex: 'windSpeed',
      key: 'windSpeed',
      width: 100,
      render: (value: number) => value.toFixed(1),
    },
    {
      title: '风向',
      dataIndex: 'windDirection',
      key: 'windDirection',
      width: 80,
    },
    {
      title: '气压(hPa)',
      dataIndex: 'pressure',
      key: 'pressure',
      width: 100,
      render: (value: number) => value.toFixed(1),
    },
  ]

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      message.success('查询完成')
    }, 1000)
  }

  const handleReset = () => {
    setSelectedDate(null)
    setSelectedStation('')
    setCurrentPage(1)
    message.success('筛选条件已重置')
  }

  const handleExport = () => {
    message.success('数据导出中...')
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const start = (page - 1) * pageSize
    const end = start + pageSize
    setData(mockData.slice(start, end))
  }

  return (
    <div className={styles.airStationData}>
      {/* 筛选和操作区域 */}
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="选择监测日期"
            style={{ width: 200 }}
          />
          
          <Select
            value={selectedStation}
            onChange={setSelectedStation}
            placeholder="选择监测点位"
            style={{ width: 200 }}
            allowClear
          >
            <Option value="KQ01">KQ01</Option>
            <Option value="KQ02">KQ02</Option>
            <Option value="KQ03">KQ03</Option>
          </Select>
        </div>
        
        <div className={styles.actions}>
          <Button 
            type="primary" 
            icon={<SearchOutlined />}
            onClick={handleSearch}
            loading={loading}
          >
            查询
          </Button>
          <Button 
            icon={<ReloadOutlined />}
            onClick={handleReset}
          >
            重置
          </Button>
          <Button 
            type="primary" 
            icon={<ExportOutlined />}
            onClick={handleExport}
          >
            导出
          </Button>
        </div>
      </div>

      {/* 数据表格 */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1800 }}
        pagination={false}
        size="middle"
        className={styles.table}
      />

      {/* 分页 */}
      <div className={styles.pagination}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total, range) => 
            `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
          }
        />
      </div>
    </div>
  )
}

export default AirStationData