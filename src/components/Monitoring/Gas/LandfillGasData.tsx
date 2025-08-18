'use client'

import React, { useState } from 'react'
import { 
  Table, 
  Button, 
  DatePicker, 
  Modal, 
  Form, 
  Input, 
  Space,
  message,
  Pagination,
  Popconfirm
} from 'antd'
import { 
  SearchOutlined, 
  ReloadOutlined, 
  PlusOutlined, 
  ExportOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import styles from './LandfillGasData.module.css'

const { RangePicker } = DatePicker

interface LandfillGasRecord {
  key: string
  id: number
  monitorDate: string
  gasFlow: number
  gasPressure: number
  methaneConcentration: number
  oxygenConcentration: number
  flameTemperature: number
  pipeTemperature: number
}

const mockData: LandfillGasRecord[] = Array.from({ length: 50 }, (_, index) => ({
  key: (index + 1).toString(),
  id: index + 1,
  monitorDate: dayjs().subtract(Math.floor(Math.random() * 30), 'day').format('YYYY-MM-DD HH:mm:ss'),
  gasFlow: Math.random() * 50 + 10,
  gasPressure: Math.random() * 100 + 30,
  methaneConcentration: Math.random() * 80 + 20,
  oxygenConcentration: Math.random() * 20 + 5,
  flameTemperature: Math.random() * 200 + 400,
  pipeTemperature: Math.random() * 100 + 300,
}))

const LandfillGasData: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<LandfillGasRecord[]>(mockData.slice(0, 10))
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dateRange, setDateRange] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [total] = useState(50)

  const columns: ColumnsType<LandfillGasRecord> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: '监测日期',
      dataIndex: 'monitorDate',
      key: 'monitorDate',
      width: 180,
    },
    {
      title: '填埋气流量(Nm³/h)',
      dataIndex: 'gasFlow',
      key: 'gasFlow',
      width: 150,
      render: (value: number) => value.toFixed(2),
    },
    {
      title: '填埋气压力(MPa)',
      dataIndex: 'gasPressure',
      key: 'gasPressure',
      width: 150,
      render: (value: number) => value.toFixed(2),
    },
    {
      title: '甲烷浓度(% LEL)',
      dataIndex: 'methaneConcentration',
      key: 'methaneConcentration',
      width: 150,
      render: (value: number) => value.toFixed(1),
    },
    {
      title: '氧气浓度(% Vol)',
      dataIndex: 'oxygenConcentration',
      key: 'oxygenConcentration',
      width: 150,
      render: (value: number) => value.toFixed(1),
    },
    {
      title: '火焰温度(℃)',
      dataIndex: 'flameTemperature',
      key: 'flameTemperature',
      width: 120,
      render: (value: number) => Math.round(value),
    },
    {
      title: '管道温度(℃)',
      dataIndex: 'pipeTemperature',
      key: 'pipeTemperature',
      width: 120,
      render: (value: number) => Math.round(value),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Popconfirm
          title="确认删除？"
          description="此操作不可恢复"
          onConfirm={() => handleDelete(record.key)}
          okText="确认"
          cancelText="取消"
        >
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            size="small"
          >
            删除
          </Button>
        </Popconfirm>
      ),
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
    setDateRange(null)
    setCurrentPage(1)
    message.success('筛选条件已重置')
  }

  const handleAdd = () => {
    setIsModalVisible(true)
  }

  const handleExport = () => {
    message.success('数据导出中...')
  }

  const handleDelete = (key: string) => {
    setData(prev => prev.filter(item => item.key !== key))
    message.success('删除成功')
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
    const start = (page - 1) * pageSize
    const end = start + pageSize
    setData(mockData.slice(start, end))
  }

  return (
    <div className={styles.landfillGasData}>
      {/* 筛选和操作区域 */}
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder={['开始日期', '结束日期']}
            style={{ width: 250 }}
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

      {/* 新增数据弹窗 */}
      <Modal
        title="新增填埋气火炬监测数据"
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

          <Space wrap style={{ width: '100%' }}>
            <Form.Item
              name="gasFlow"
              label="填埋气流量(Nm³/h)"
              rules={[{ required: true, message: '请输入填埋气流量' }]}
            >
              <Input 
                type="number" 
                step="0.01"
                style={{ width: 180 }}
              />
            </Form.Item>

            <Form.Item
              name="gasPressure"
              label="填埋气压力(MPa)"
              rules={[{ required: true, message: '请输入填埋气压力' }]}
            >
              <Input 
                type="number" 
                step="0.01"
                style={{ width: 180 }}
              />
            </Form.Item>

            <Form.Item
              name="methaneConcentration"
              label="甲烷浓度(% LEL)"
              rules={[{ required: true, message: '请输入甲烷浓度' }]}
            >
              <Input 
                type="number" 
                step="0.1"
                style={{ width: 180 }}
              />
            </Form.Item>

            <Form.Item
              name="oxygenConcentration"
              label="氧气浓度(% Vol)"
              rules={[{ required: true, message: '请输入氧气浓度' }]}
            >
              <Input 
                type="number" 
                step="0.1"
                style={{ width: 180 }}
              />
            </Form.Item>

            <Form.Item
              name="flameTemperature"
              label="火焰温度(℃)"
              rules={[{ required: true, message: '请输入火焰温度' }]}
            >
              <Input 
                type="number"
                style={{ width: 180 }}
              />
            </Form.Item>

            <Form.Item
              name="pipeTemperature"
              label="管道温度(℃)"
              rules={[{ required: true, message: '请输入管道温度' }]}
            >
              <Input 
                type="number"
                style={{ width: 180 }}
              />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </div>
  )
}

export default LandfillGasData