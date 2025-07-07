/**
 * 19.2 职业健康培训管理
 * 
 * 功能包括：
 * - 培训计划管理
 * - 培训记录追踪
 * - 培训材料管理
 * - 考核结果管理
 * - 文件上传管理
 */

import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Upload,
  Modal,
  Space,
  Tag,
  Popconfirm,
  message,
  Row,
  Col,
  Typography,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

// 培训内容选项
const TRAINING_CONTENT_OPTIONS = [
  '2024年度企业职业健康辐射安全培训',
  '2025年度岗前辐射安全培训',
  '2025年度企业职业健康辐射安全培训',
];

// 培训地点选项
const TRAINING_LOCATION_OPTIONS = [
  '辐射安全管理中心',
];

// 安全培训内容类型
const SAFETY_TRAINING_CONTENT_TYPES = [
  '辐射安全防护培训计划',
  '辐射安全防护培训签到表',
  '辐射安全防护培训过程记录',
  '辐射安全防护培训资料',
  '辐射安全防护培训考核合格证',
];

interface Training {
  id: string;
  trainingTime: string;
  radiationTrainingContent: string;
  trainingLocation: string;
  participantCount: number;
  createdBy: string;
  createdAt: string;
  safetyTrainingContent: string;
  remark?: string;
  attachments?: any[];
}

interface TrainingFilter {
  year?: string;
  keyword?: string;
}

interface ModalState {
  visible: boolean;
  type: 'add' | 'edit' | 'view';
  record?: Training;
}

const TrainingManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  
  const [data, setData] = useState<Training[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({ visible: false, type: 'add' });
  const [filter, setFilter] = useState<TrainingFilter>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 初始化数据
  useEffect(() => {
    fetchData();
  }, [filter, pagination.current, pagination.pageSize]);

  // 获取培训数据
  const fetchData = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData: Training[] = [
        {
          id: '1',
          trainingTime: '2024-12-15 09:00:00',
          radiationTrainingContent: '2025年度岗前辐射安全培训',
          trainingLocation: '辐射安全管理中心',
          participantCount: 23,
          createdBy: '安全管理员',
          createdAt: '2024-12-10 14:30:00',
          safetyTrainingContent: '辐射安全防护培训计划',
          remark: '新员工岗前培训，重点讲解辐射防护基础知识',
          attachments: [
            { name: '培训计划.pdf', url: '/files/training-plan.pdf' },
            { name: '签到表.xlsx', url: '/files/sign-in.xlsx' },
          ],
        },
        {
          id: '2',
          trainingTime: '2024-11-20 14:00:00',
          radiationTrainingContent: '2024年度企业职业健康辐射安全培训',
          trainingLocation: '辐射安全管理中心',
          participantCount: 45,
          createdBy: '人事部',
          createdAt: '2024-11-15 10:20:00',
          safetyTrainingContent: '辐射安全防护培训资料',
          remark: '年度常规培训，包含新规定解读',
        },
        {
          id: '3',
          trainingTime: '2024-10-12 10:30:00',
          radiationTrainingContent: '2024年度企业职业健康辐射安全培训',
          trainingLocation: '辐射安全管理中心',
          participantCount: 38,
          createdBy: '安全管理员',
          createdAt: '2024-10-08 16:45:00',
          safetyTrainingContent: '辐射安全防护培训考核合格证',
          remark: '季度培训考核',
        },
      ];

      setData(mockData);
      setPagination(prev => ({ ...prev, total: mockData.length }));
    } catch (error) {
      message.error('获取培训数据失败');
    } finally {
      setLoading(false);
    }
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
  const openModal = (type: 'add' | 'edit' | 'view', record?: Training) => {
    setModal({ visible: true, type, record });
    if (type === 'edit' && record) {
      form.setFieldsValue({
        ...record,
        trainingTime: dayjs(record.trainingTime),
      });
    } else if (type === 'add') {
      form.resetFields();
    }
  };

  // 关闭模态框
  const closeModal = () => {
    setModal({ visible: false, type: 'add' });
    form.resetFields();
  };

  // 保存培训记录
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log('保存培训记录:', values);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(modal.type === 'add' ? '添加成功' : '更新成功');
      closeModal();
      fetchData();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  // 删除培训记录
  const handleDelete = async (id: string) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      message.success('删除成功');
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 文件上传配置
  const uploadProps = {
    beforeUpload: () => false, // 阻止自动上传
    multiple: true,
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png',
  };

  // 表格列定义
  const columns: ColumnsType<Training> = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, __, index) => 
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: '培训时间',
      dataIndex: 'trainingTime',
      key: 'trainingTime',
      width: 160,
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '放射培训内容',
      dataIndex: 'radiationTrainingContent',
      key: 'radiationTrainingContent',
      ellipsis: true,
    },
    {
      title: '培训地点',
      dataIndex: 'trainingLocation',
      key: 'trainingLocation',
      width: 140,
    },
    {
      title: '参加人数',
      dataIndex: 'participantCount',
      key: 'participantCount',
      width: 100,
      render: (text) => `${text}人`,
    },
    {
      title: '创建人员',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
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
            title="确定删除这条培训记录吗？"
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

  const renderModalContent = () => {
    const { type, record } = modal;
    const isView = type === 'view';
    
    return (
      <Form
        form={form}
        layout="vertical"
        disabled={isView}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="safetyTrainingContent"
              label="安全培训内容"
              rules={[{ required: true, message: '请选择安全培训内容' }]}
            >
              <Select placeholder="请选择">
                {SAFETY_TRAINING_CONTENT_TYPES.map(item => (
                  <Option key={item} value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trainingTime"
              label="培训时间"
              rules={[{ required: true, message: '请选择培训时间' }]}
            >
              <DatePicker
                showTime
                style={{ width: '100%' }}
                placeholder="请选择培训时间"
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="trainingLocation"
              label="培训地点"
              rules={[{ required: true, message: '请选择培训地点' }]}
            >
              <Select placeholder="请选择">
                {TRAINING_LOCATION_OPTIONS.map(item => (
                  <Option key={item} value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="participantCount"
              label="参加人数"
              rules={[{ required: true, message: '请输入参加人数' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入参加人数"
                min={1}
                max={1000}
              />
            </Form.Item>
          </Col>
        </Row>

        {!isView && (
          <>
            <Divider>培训材料上传</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="trainingPlan"
                  label="上传培训计划"
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>点击上传</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="signInSheet"
                  label="上传培训签到表"
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>点击上传</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="processRecord"
                  label="上传培训过程记录"
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>点击上传</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="trainingMaterials"
                  label="上传培训资料"
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>点击上传</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="certificateOfQualification"
              label="上传考核合格证"
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Form.Item>
          </>
        )}

        <Form.Item
          name="remark"
          label="备注"
        >
          <TextArea
            rows={3}
            placeholder="请输入备注信息"
            maxLength={500}
            showCount
          />
        </Form.Item>

        {isView && record?.attachments && record.attachments.length > 0 && (
          <>
            <Divider>附件列表</Divider>
            <div>
              {record.attachments.map((file, index) => (
                <Tag
                  key={index}
                  icon={<FileTextOutlined />}
                  color="blue"
                  style={{ margin: 4 }}
                >
                  {file.name}
                </Tag>
              ))}
            </div>
          </>
        )}
      </Form>
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>19.2 职业健康培训</Title>
      
      {/* 筛选区域 */}
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item name="year" label="日期（年）">
            <Select placeholder="请选择年份" style={{ width: 120 }} allowClear>
              <Option value="2024">2024</Option>
              <Option value="2025">2025</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="keyword" label="查询">
            <Input
              placeholder="请输入关键词"
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
                type="primary"
                onClick={() => openModal('add')}
                icon={<PlusOutlined />}
              >
                新增
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 数据表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={data}
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
      </Card>

      {/* 模态框 */}
      <Modal
        title={
          modal.type === 'add' ? '新增培训记录' : 
          modal.type === 'edit' ? '编辑培训记录' : '培训记录详情'
        }
        visible={modal.visible}
        onCancel={closeModal}
        width={800}
        footer={
          modal.type === 'view' ? (
            <Button onClick={closeModal}>关闭</Button>
          ) : (
            <Space>
              <Button onClick={closeModal}>取消</Button>
              <Button type="primary" onClick={handleSave}>
                {modal.type === 'add' ? '添加' : '保存'}
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

export default TrainingManagement;