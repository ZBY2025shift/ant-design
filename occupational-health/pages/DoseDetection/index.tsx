/**
 * 19.4 个人剂量检测
 * 
 * 功能包括：
 * - 日常检测记录
 * - 累计剂量统计
 * - 健康预警系统
 * - 预警设置管理
 */

import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Modal,
  Space,
  Tag,
  Popconfirm,
  message,
  Row,
  Col,
  Typography,
  Tabs,
  Alert,
  Breadcrumb,
  Switch,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SettingOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type HealthWarningLevel = '健康安全' | '一级预警' | '二级预警';

interface DailyDetection {
  id: string;
  detectionTime: string;
  detectionPersonnel: string;
  position: string;
  personalDosimeterNumber: string;
  radiationDose: number;
  remark?: string;
  createdBy: string;
  createdAt: string;
}

interface CumulativeDetection {
  id: string;
  detectionTime: string;
  detectionPersonnel: string;
  position: string;
  firstQuarter: number;
  secondQuarter: number;
  thirdQuarter: number;
  fourthQuarter: number;
  annualTotal: number;
  healthWarning: HealthWarningLevel;
}

interface WarningSettings {
  firstLevelWarning: number;
  secondLevelWarning: number;
  smsNotification: boolean;
}

interface DetectionFilter {
  startTime?: string;
  endTime?: string;
  name?: string;
}

interface ModalState {
  visible: boolean;
  type: 'add' | 'edit' | 'view' | 'warning-settings';
  record?: any;
}

const DoseDetection: React.FC = () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [settingsForm] = Form.useForm();
  
  const [activeTab, setActiveTab] = useState('daily');
  const [dailyData, setDailyData] = useState<DailyDetection[]>([]);
  const [cumulativeData, setCumulativeData] = useState<CumulativeDetection[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({ visible: false, type: 'add' });
  const [filter, setFilter] = useState<DetectionFilter>({});
  const [warningSettings, setWarningSettings] = useState<WarningSettings>({
    firstLevelWarning: 20,
    secondLevelWarning: 50,
    smsNotification: true,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 初始化数据
  useEffect(() => {
    fetchData();
  }, [activeTab, filter, pagination.current, pagination.pageSize]);

  // 获取检测数据
  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (activeTab === 'daily') {
        const mockDailyData: DailyDetection[] = [
          {
            id: '1',
            detectionTime: '2024-12-20',
            detectionPersonnel: '张三',
            position: '放射科医师',
            personalDosimeterNumber: 'DM-001',
            radiationDose: 2.5,
            remark: '正常检测',
            createdBy: '检测员A',
            createdAt: '2024-12-20 10:30:00',
          },
          {
            id: '2',
            detectionTime: '2024-12-19',
            detectionPersonnel: '李四',
            position: '放射技师',
            personalDosimeterNumber: 'DM-002',
            radiationDose: 1.8,
            createdBy: '检测员B',
            createdAt: '2024-12-19 14:20:00',
          },
          {
            id: '3',
            detectionTime: '2024-12-18',
            detectionPersonnel: '王五',
            position: '核医学技师',
            personalDosimeterNumber: 'DM-003',
            radiationDose: 15.2,
            remark: '一级预警，需要关注',
            createdBy: '检测员A',
            createdAt: '2024-12-18 16:45:00',
          },
        ];
        setDailyData(mockDailyData);
        setPagination(prev => ({ ...prev, total: mockDailyData.length }));
      } else {
        const mockCumulativeData: CumulativeDetection[] = [
          {
            id: '1',
            detectionTime: '2024',
            detectionPersonnel: '张三',
            position: '放射科医师',
            firstQuarter: 8.5,
            secondQuarter: 9.2,
            thirdQuarter: 7.8,
            fourthQuarter: 6.5,
            annualTotal: 32.0,
            healthWarning: '健康安全',
          },
          {
            id: '2',
            detectionTime: '2024',
            detectionPersonnel: '李四',
            position: '放射技师',
            firstQuarter: 12.3,
            secondQuarter: 11.8,
            thirdQuarter: 13.5,
            fourthQuarter: 14.2,
            annualTotal: 51.8,
            healthWarning: '二级预警',
          },
          {
            id: '3',
            detectionTime: '2024',
            detectionPersonnel: '王五',
            position: '核医学技师',
            firstQuarter: 5.2,
            secondQuarter: 6.8,
            thirdQuarter: 4.5,
            fourthQuarter: 5.1,
            annualTotal: 21.6,
            healthWarning: '一级预警',
          },
        ];
        setCumulativeData(mockCumulativeData);
        setPagination(prev => ({ ...prev, total: mockCumulativeData.length }));
      }
    } catch (error) {
      message.error('获取检测数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取健康预警标签
  const getWarningTag = (level: HealthWarningLevel) => {
    switch (level) {
      case '健康安全':
        return <Tag color="green">健康安全</Tag>;
      case '一级预警':
        return <Tag color="orange">一级预警</Tag>;
      case '二级预警':
        return <Tag color="red">二级预警</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  // 判断剂量是否超过预警值
  const getDoseWarningLevel = (dose: number): HealthWarningLevel => {
    if (dose >= warningSettings.secondLevelWarning) {
      return '二级预警';
    } else if (dose >= warningSettings.firstLevelWarning) {
      return '一级预警';
    }
    return '健康安全';
  };

  // 搜索处理
  const handleSearch = () => {
    const values = searchForm.getFieldsValue();
    setFilter(values);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    setFilter({});
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // 打开模态框
  const openModal = (type: 'add' | 'edit' | 'view' | 'warning-settings', record?: any) => {
    setModal({ visible: true, type, record });
    if (type === 'edit' && record) {
      form.setFieldsValue({
        ...record,
        detectionTime: dayjs(record.detectionTime),
      });
    } else if (type === 'add') {
      form.resetFields();
    } else if (type === 'warning-settings') {
      settingsForm.setFieldsValue(warningSettings);
    }
  };

  // 关闭模态框
  const closeModal = () => {
    setModal({ visible: false, type: 'add' });
    form.resetFields();
    settingsForm.resetFields();
  };

  // 保存检测记录
  const handleSave = async () => {
    try {
      if (modal.type === 'warning-settings') {
        const values = await settingsForm.validateFields();
        setWarningSettings(values);
        message.success('预警设置保存成功');
      } else {
        const values = await form.validateFields();
        console.log('保存检测记录:', values);
        message.success(modal.type === 'add' ? '添加成功' : '更新成功');
        fetchData();
      }
      closeModal();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  // 删除检测记录
  const handleDelete = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      message.success('删除成功');
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 日常检测表格列
  const dailyColumns: ColumnsType<DailyDetection> = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, __, index) => 
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: '检测时间',
      dataIndex: 'detectionTime',
      key: 'detectionTime',
      width: 120,
      render: (text) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: '检测人员',
      dataIndex: 'detectionPersonnel',
      key: 'detectionPersonnel',
      width: 100,
    },
    {
      title: '岗位',
      dataIndex: 'position',
      key: 'position',
      width: 120,
    },
    {
      title: '个人剂量计编号',
      dataIndex: 'personalDosimeterNumber',
      key: 'personalDosimeterNumber',
      width: 140,
    },
    {
      title: '辐射剂量(mSv)',
      dataIndex: 'radiationDose',
      key: 'radiationDose',
      width: 120,
      render: (dose) => {
        const warningLevel = getDoseWarningLevel(dose);
        return (
          <Space>
            <span>{dose}</span>
            {warningLevel !== '健康安全' && getWarningTag(warningLevel)}
          </Space>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => openModal('view', record)}
          >
            详情
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => openModal('edit', record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除这条检测记录吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 累计检测表格列
  const cumulativeColumns: ColumnsType<CumulativeDetection> = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, __, index) => 
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: '检测时间',
      dataIndex: 'detectionTime',
      key: 'detectionTime',
      width: 100,
    },
    {
      title: '检测人员',
      dataIndex: 'detectionPersonnel',
      key: 'detectionPersonnel',
      width: 100,
    },
    {
      title: '岗位',
      dataIndex: 'position',
      key: 'position',
      width: 120,
    },
    {
      title: '第一季度',
      dataIndex: 'firstQuarter',
      key: 'firstQuarter',
      width: 100,
      render: (text) => `${text} mSv`,
    },
    {
      title: '第二季度',
      dataIndex: 'secondQuarter',
      key: 'secondQuarter',
      width: 100,
      render: (text) => `${text} mSv`,
    },
    {
      title: '第三季度',
      dataIndex: 'thirdQuarter',
      key: 'thirdQuarter',
      width: 100,
      render: (text) => `${text} mSv`,
    },
    {
      title: '第四季度',
      dataIndex: 'fourthQuarter',
      key: 'fourthQuarter',
      width: 100,
      render: (text) => `${text} mSv`,
    },
    {
      title: '年度累计',
      dataIndex: 'annualTotal',
      key: 'annualTotal',
      width: 100,
      render: (text) => `${text} mSv`,
    },
    {
      title: '健康预警',
      dataIndex: 'healthWarning',
      key: 'healthWarning',
      width: 100,
      render: (level) => getWarningTag(level),
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => openModal('view', record)}
        >
          详情
        </Button>
      ),
    },
  ];

  const renderModalContent = () => {
    const { type, record } = modal;
    const isView = type === 'view';
    const isSettings = type === 'warning-settings';
    
    if (isSettings) {
      return (
        <Form
          form={settingsForm}
          layout="vertical"
        >
          <Form.Item
            name="firstLevelWarning"
            label="一级预警（年累积辐射剂量 mSv）"
            rules={[{ required: true, message: '请输入一级预警值' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="请输入一级预警值"
              min={0}
              max={100}
            />
          </Form.Item>
          
          <Form.Item
            name="secondLevelWarning"
            label="二级预警（年累积辐射剂量 mSv）"
            rules={[{ required: true, message: '请输入二级预警值' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="请输入二级预警值"
              min={0}
              max={100}
            />
          </Form.Item>
          
          <Form.Item
            name="smsNotification"
            label="短信提示"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      );
    }

    return (
      <Form
        form={form}
        layout="vertical"
        disabled={isView}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="detectionTime"
              label="检测时间"
              rules={[{ required: true, message: '请选择检测时间' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择检测时间"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="detectionPersonnel"
              label="检测人员"
              rules={[{ required: true, message: '请输入检测人员' }]}
            >
              <Input placeholder="请输入检测人员" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="position"
              label="岗位"
              rules={[{ required: true, message: '请输入岗位' }]}
            >
              <Input placeholder="请输入岗位" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="personalDosimeterNumber"
              label="个人剂量计编号"
              rules={[{ required: true, message: '请输入个人剂量计编号' }]}
            >
              <Input placeholder="请输入个人剂量计编号" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="radiationDose"
          label="辐射剂量(mSv)"
          rules={[{ required: true, message: '请输入辐射剂量' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="请输入辐射剂量"
            min={0}
            precision={2}
          />
        </Form.Item>

        <Form.Item
          name="remark"
          label="备注"
        >
          <TextArea
            rows={3}
            placeholder="请输入备注信息"
            maxLength={200}
            showCount
          />
        </Form.Item>
      </Form>
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>职业健康管理</Breadcrumb.Item>
        <Breadcrumb.Item>个人剂量检测</Breadcrumb.Item>
        <Breadcrumb.Item>{activeTab === 'daily' ? '日常检测' : '累计检测'}</Breadcrumb.Item>
      </Breadcrumb>
      
      <Title level={2}>19.4 个人剂量检测</Title>
      
      {/* 筛选区域 */}
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item name="dateRange" label="时间范围">
            <RangePicker
              style={{ width: 240 }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          
          <Form.Item name="name" label="姓名">
            <Input
              placeholder="请输入姓名"
              style={{ width: 200 }}
              suffix={<SearchOutlined />}
            />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                查询
              </Button>
              <Button
                onClick={handleReset}
                icon={<ReloadOutlined />}
              >
                重置
              </Button>
              <Button
                onClick={() => openModal('warning-settings')}
                icon={<SettingOutlined />}
              >
                预警设置
              </Button>
              {activeTab === 'daily' && (
                <Button
                  type="primary"
                  onClick={() => openModal('add')}
                  icon={<PlusOutlined />}
                >
                  新增检测
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 数据表格 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="日常检测" key="daily">
            <Table
              columns={dailyColumns}
              dataSource={dailyData}
              rowKey="id"
              loading={loading}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
              }}
              onChange={(pag) => setPagination(pag as any)}
              scroll={{ x: 1000 }}
            />
          </TabPane>
          
          <TabPane tab="累计检测" key="cumulative">
            <Table
              columns={cumulativeColumns}
              dataSource={cumulativeData}
              rowKey="id"
              loading={loading}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
              }}
              onChange={(pag) => setPagination(pag as any)}
              scroll={{ x: 1200 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 模态框 */}
      <Modal
        title={
          modal.type === 'warning-settings' ? '预警设置' :
          modal.type === 'add' ? '新增检测记录' : 
          modal.type === 'edit' ? '编辑检测记录' : '检测记录详情'
        }
        visible={modal.visible}
        onCancel={closeModal}
        width={modal.type === 'warning-settings' ? 500 : 600}
        footer={
          modal.type === 'view' ? (
            <Button onClick={closeModal}>关闭</Button>
          ) : (
            <Space>
              <Button onClick={closeModal}>取消</Button>
              <Button type="primary" onClick={handleSave}>
                保存
              </Button>
            </Space>
          )
        }
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default DoseDetection;