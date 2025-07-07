/**
 * 19.3 放射人员管理
 * 
 * 功能包括：
 * - 人员信息管理
 * - 执业证书管理  
 * - 证书到期预警
 * - 放射人员工作证管理
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
  Upload,
  Modal,
  Space,
  Tag,
  Popconfirm,
  message,
  Row,
  Col,
  Typography,
  Badge,
  Alert,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface Personnel {
  id: string;
  name: string;
  position: string;
  exposureType: string;
  practiceCertificate: string;
  initialDate: string;
  validDate: string;
  warningTime: string;
  workCertificate?: any[];
  createdBy: string;
  createdAt: string;
}

interface PersonnelFilter {
  name?: string;
}

interface ModalState {
  visible: boolean;
  type: 'add' | 'edit' | 'view';
  record?: Personnel;
}

const PersonnelManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  
  const [data, setData] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({ visible: false, type: 'add' });
  const [filter, setFilter] = useState<PersonnelFilter>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 初始化数据
  useEffect(() => {
    fetchData();
  }, [filter, pagination.current, pagination.pageSize]);

  // 获取人员数据
  const fetchData = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData: Personnel[] = [
        {
          id: '1',
          name: '张三',
          position: '放射科医师',
          exposureType: '医用诊断X射线',
          practiceCertificate: 'FS-2020-001',
          initialDate: '2020-03-15',
          validDate: '2025-03-14',
          warningTime: '2025-02-14',
          createdBy: '人事部',
          createdAt: '2020-03-10 10:30:00',
          workCertificate: [
            { name: '放射人员工作证.pdf', url: '/files/certificate-1.pdf' }
          ],
        },
        {
          id: '2',
          name: '李四',
          position: '放射技师',
          exposureType: '医用CT检查',
          practiceCertificate: 'FS-2021-008',
          initialDate: '2021-06-20',
          validDate: '2026-06-19',
          warningTime: '2026-05-20',
          createdBy: '人事部',
          createdAt: '2021-06-15 14:20:00',
        },
        {
          id: '3',
          name: '王五',
          position: '核医学技师',
          exposureType: '核素治疗',
          practiceCertificate: 'FS-2019-012',
          initialDate: '2019-09-10',
          validDate: '2024-09-09',
          warningTime: '2024-08-10',
          createdBy: '人事部',
          createdAt: '2019-09-05 16:45:00',
        },
        {
          id: '4',
          name: '赵六',
          position: '介入医师',
          exposureType: '介入诊疗',
          practiceCertificate: 'FS-2022-005',
          initialDate: '2022-01-08',
          validDate: '2027-01-07',
          warningTime: '2026-12-08',
          createdBy: '人事部',
          createdAt: '2022-01-03 09:15:00',
        },
        {
          id: '5',
          name: '孙七',
          position: '放射防护员',
          exposureType: '放射防护检测',
          practiceCertificate: 'FS-2020-018',
          initialDate: '2020-11-25',
          validDate: '2025-11-24',
          warningTime: '2025-10-25',
          createdBy: '安全部',
          createdAt: '2020-11-20 11:40:00',
        },
      ];

      setData(mockData);
      setPagination(prev => ({ ...prev, total: mockData.length }));
    } catch (error) {
      message.error('获取人员数据失败');
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
  const openModal = (type: 'add' | 'edit' | 'view', record?: Personnel) => {
    setModal({ visible: true, type, record });
    if (type === 'edit' && record) {
      form.setFieldsValue({
        ...record,
        initialDate: dayjs(record.initialDate),
        validDate: dayjs(record.validDate),
        warningTime: dayjs(record.warningTime),
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

  // 保存人员记录
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log('保存人员记录:', values);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(modal.type === 'add' ? '添加成功' : '更新成功');
      closeModal();
      fetchData();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  // 删除人员记录
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

  // 检查证书是否即将过期
  const getCertificateStatus = (validDate: string, warningTime: string) => {
    const now = dayjs();
    const valid = dayjs(validDate);
    const warning = dayjs(warningTime);
    
    if (now.isAfter(valid)) {
      return { status: 'expired', color: 'red', text: '已过期' };
    } else if (now.isAfter(warning)) {
      return { status: 'warning', color: 'orange', text: '即将过期' };
    } else {
      return { status: 'valid', color: 'green', text: '有效' };
    }
  };

  // 文件上传配置
  const uploadProps = {
    beforeUpload: () => false,
    accept: '.pdf,.jpg,.jpeg,.png',
    maxCount: 1,
  };

  // 统计即将过期的证书数量
  const getExpiringCount = () => {
    const now = dayjs();
    return data.filter(item => {
      const warning = dayjs(item.warningTime);
      const valid = dayjs(item.validDate);
      return now.isAfter(warning) && now.isBefore(valid);
    }).length;
  };

  // 表格列定义
  const columns: ColumnsType<Personnel> = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, __, index) => 
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      render: (text, record) => {
        const status = getCertificateStatus(record.validDate, record.warningTime);
        return (
          <Space>
            <span>{text}</span>
            {status.status === 'warning' && (
              <Tooltip title="证书即将过期">
                <WarningOutlined style={{ color: '#faad14' }} />
              </Tooltip>
            )}
            {status.status === 'expired' && (
              <Tooltip title="证书已过期">
                <CloseCircleOutlined style={{ color: '#f5222d' }} />
              </Tooltip>
            )}
          </Space>
        );
      },
    },
    {
      title: '岗位',
      dataIndex: 'position',
      key: 'position',
      width: 120,
    },
    {
      title: '照射种类',
      dataIndex: 'exposureType',
      key: 'exposureType',
      width: 140,
    },
    {
      title: '执业证书',
      dataIndex: 'practiceCertificate',
      key: 'practiceCertificate',
      width: 120,
    },
    {
      title: '初始日期',
      dataIndex: 'initialDate',
      key: 'initialDate',
      width: 110,
      render: (text) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: '有效日期',
      dataIndex: 'validDate',
      key: 'validDate',
      width: 110,
      render: (text, record) => {
        const status = getCertificateStatus(record.validDate, record.warningTime);
        return (
          <div>
            <div>{dayjs(text).format('YYYY-MM-DD')}</div>
            <Tag color={status.color} size="small">
              {status.text}
            </Tag>
          </div>
        );
      },
    },
    {
      title: '预警时间',
      dataIndex: 'warningTime',
      key: 'warningTime',
      width: 110,
      render: (text) => dayjs(text).format('YYYY-MM-DD'),
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
            title="确定删除这条人员记录吗？"
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
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="position"
              label="岗位"
              rules={[{ required: true, message: '请输入岗位' }]}
            >
              <Input placeholder="请输入岗位" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="exposureType"
              label="照射种类"
              rules={[{ required: true, message: '请输入照射种类' }]}
            >
              <Input placeholder="请输入照射种类" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="practiceCertificate"
              label="执业证书"
              rules={[{ required: true, message: '请输入执业证书编号' }]}
            >
              <Input placeholder="请输入执业证书编号" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="initialDate"
              label="初始日期"
              rules={[{ required: true, message: '请选择初始日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择初始日期"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="validDate"
              label="有效日期"
              rules={[{ required: true, message: '请选择有效日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择有效日期"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="warningTime"
              label="预警时间"
              rules={[{ required: true, message: '请选择预警时间' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择预警时间"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="workCertificate"
          label="上传《放射人员工作证》"
          help="支持格式：PDF、JPG、PNG，文件大小不超过10MB"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form.Item>

        {isView && record?.workCertificate && record.workCertificate.length > 0 && (
          <Form.Item label="已上传文件">
            <div>
              {record.workCertificate.map((file, index) => (
                <Tag key={index} color="blue" style={{ margin: 4 }}>
                  {file.name}
                </Tag>
              ))}
            </div>
          </Form.Item>
        )}
      </Form>
    );
  };

  const expiringCount = getExpiringCount();

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>19.3 放射人员管理</Title>
      
      {/* 预警信息 */}
      {expiringCount > 0 && (
        <Alert
          message={`当前有 ${expiringCount} 人的工作证即将到期，请及时办理延续手续`}
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          action={
            <Button size="small" onClick={fetchData}>
              刷新
            </Button>
          }
        />
      )}
      
      {/* 筛选区域 */}
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
        >
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
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* 模态框 */}
      <Modal
        title={
          modal.type === 'add' ? '新增放射人员' : 
          modal.type === 'edit' ? '编辑放射人员' : '放射人员详情'
        }
        visible={modal.visible}
        onCancel={closeModal}
        width={700}
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

export default PersonnelManagement;