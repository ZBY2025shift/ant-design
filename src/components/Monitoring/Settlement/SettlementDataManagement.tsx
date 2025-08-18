'use client'

import React, { useState } from 'react'
import { 
  Card, 
  Table, 
  Button, 
  Select, 
  DatePicker, 
  Modal, 
  Form, 
  Input, 
  Checkbox, 
  Upload,
  Space,
  message,
  Pagination
} from 'antd'
import { 
  SearchOutlined, 
  ReloadOutlined, 
  PlusOutlined, 
  ExportOutlined,
  UploadOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import styles from './SettlementDataManagement.module.css'

const { Option } = Select
const { RangePicker } = DatePicker

interface SettlementRecord {
  key: string
  settlementCode: string
  baselineDate: string
  baselineLongitude: number
  baselineLatitude: number
  baselineElevation: number
  measureDate: string
  measureLongitude: number
  measureLatitude: number
  measureElevation: number
  horizontalDisplacement: number
  verticalDisplacement: number
}

const mockData: SettlementRecord[] = Array.from({ length: 50 }, (_, index) => ({
  key: (index + 1).toString(),
  settlementCode: `CJ${(index % 10 + 1).toString().padStart(3, '0')}`,
  baselineDate: '2024-01-01 09:00:00',
  baselineLongitude: 112.123 + Math.random() * 0.001,
  baselineLatitude: 31.045 + Math.random() * 0.001,
  baselineElevation: 50.123 + Math.random() * 0.1,
  measureDate: '2024-04-15 14:30:00',
  measureLongitude: 112.123 + Math.random() * 0.001,
  measureLatitude: 31.045 + Math.random() * 0.001,
  measureElevation: 50.123 + Math.random() * 0.1,
  horizontalDisplacement: Math.random() * 20 - 10,
  verticalDisplacement: Math.random() * 30 - 15,
}))

const SettlementDataManagement: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<SettlementRecord[]>(mockData.slice(0, 10))
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCode, setSelectedCode] = useState<string>('')
  const [dateRange, setDateRange] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [total] = useState(50)

  const columns: ColumnsType<SettlementRecord> = [
    {
      title: '沉降编号',
      dataIndex: 'settlementCode',
      key: 'settlementCode',
      width: 120,
      fixed: 'left',
    },
    {
      title: '基准值',
      key: 'baseline',
      children: [
        {
          title: '监测日期',
          dataIndex: 'baselineDate',
          key: 'baselineDate',
          width: 150,
        },
        {
          title: '经度',
          dataIndex: 'baselineLongitude',
          key: 'baselineLongitude',
          width: 100,
          render: (value: number) => value.toFixed(3),
        },
        {
          title: '纬度',
          dataIndex: 'baselineLatitude',
          key: 'baselineLatitude',
          width: 100,
          render: (value: number) => value.toFixed(3),
        },
        {
          title: '高程(m)',
          dataIndex: 'baselineElevation',
          key: 'baselineElevation',
          width: 100,
          render: (value: number) => value.toFixed(3),
        },
      ],
    },
    {
      title: '测量值',
      key: 'measure',
      children: [
        {
          title: '监测日期',
          dataIndex: 'measureDate',
          key: 'measureDate',
          width: 150,
        },
        {
          title: '经度',
          dataIndex: 'measureLongitude',
          key: 'measureLongitude',
          width: 100,
          render: (value: number) => value.toFixed(3),
        },
        {
          title: '纬度',
          dataIndex: 'measureLatitude',
          key: 'measureLatitude',
          width: 100,
          render: (value: number) => value.toFixed(3),
        },
        {
          title: '高程(m)',
          dataIndex: 'measureElevation',
          key: 'measureElevation',
          width: 100,
          render: (value: number) => value.toFixed(3),
        },
      ],
    },
    {
      title: '沉降值',
      key: 'settlement',
      children: [
        {
          title: '水平位移(mm)',
          dataIndex: 'horizontalDisplacement',
          key: 'horizontalDisplacement',
          width: 120,
          render: (value: number) => value.toFixed(2),
        },
        {
          title: '垂直位移(mm)',
          dataIndex: 'verticalDisplacement',
          key: 'verticalDisplacement',
          width: 120,
          render: (value: number) => value.toFixed(2),
        },
      ],
    },
  ]

  const handleSearch = () => {
    setLoading(true)
    // 模拟搜索
    setTimeout(() => {
      setLoading(false)
      message.success('查询完成')
    }, 1000)
  }

  const handleReset = () => {
    setSelectedCode('')
    setDateRange(null)
    setCurrentPage(1)
    message.success('筛选条件已重置')
  }

  const handleAdd = () => {
    setIsModalVisible(true)
  }

  const handleExport = () => {
    // 模拟导出
    message.success('数据导出中...')
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('新增数据:', values)
      setIsModalVisible(false)
      form.resetFields()
      message.success('数据添加成功')
    }).catch(info => {
      console.log('验证失败:', info)
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 模拟分页数据加载
    const start = (page - 1) * pageSize
    const end = start + pageSize
    setData(mockData.slice(start, end))
  }

  return (
    <div className={styles.dataManagement}>
      <Card className={styles.card}>
        {/* 筛选和操作区域 */}
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <Select
              value={selectedCode}
              onChange={setSelectedCode}
              placeholder="选择沉降编号"
              style={{ width: 200 }}
              allowClear
            >
              <Option value="CJ001">CJ001</Option>
              <Option value="CJ002">CJ002</Option>
              <Option value="CJ003">CJ003</Option>
            </Select>
            
            <DatePicker
              placeholder="选择监测日期"
              style={{ width: 200 }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
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
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增
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
          scroll={{ x: 1200 }}
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
      </Card>

      {/* 新增数据弹窗 */}
      <Modal
        title="新增沉降监测数据"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        className={styles.modal}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            dataTypes: ['measure'],
            monitorDate: dayjs(),
          }}
        >
          <Form.Item
            name="monitorDate"
            label="监测日期"
            rules={[{ required: true, message: '请选择监测日期' }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="dataTypes"
            label="数据类型"
            rules={[{ required: true, message: '请选择数据类型' }]}
          >
            <Checkbox.Group>
              <Checkbox value="measure">测量值</Checkbox>
              <Checkbox value="baseline">基准值</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <div className={styles.singleSettlement}>
            <h4>单个沉降点数据</h4>
            <Form.Item name="enabled" valuePropName="checked">
              <Checkbox>启用单个沉降点录入</Checkbox>
            </Form.Item>

            <Space wrap>
              <Form.Item name="settlementCode" label="沉降编号">
                <Select placeholder="选择编号" style={{ width: 120 }}>
                  <Option value="CJ001">CJ001</Option>
                  <Option value="CJ002">CJ002</Option>
                  <Option value="CJ003">CJ003</Option>
                </Select>
              </Form.Item>

              <Form.Item name="longitude" label="经度">
                <Input 
                  placeholder="保留3位小数" 
                  style={{ width: 120 }}
                  type="number"
                  step="0.001"
                />
              </Form.Item>

              <Form.Item name="latitude" label="纬度">
                <Input 
                  placeholder="保留3位小数" 
                  style={{ width: 120 }}
                  type="number"
                  step="0.001"
                />
              </Form.Item>

              <Form.Item name="elevation" label="高程(m)">
                <Input 
                  placeholder="保留3位小数" 
                  style={{ width: 120 }}
                  type="number"
                  step="0.001"
                />
              </Form.Item>
            </Space>
          </div>

          <div className={styles.batchImport}>
            <h4>批量导入</h4>
            <Form.Item name="excelFile" label="导入Excel文件">
              <Upload
                accept=".xlsx,.xls"
                beforeUpload={() => false}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>选择文件</Button>
              </Upload>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default SettlementDataManagement