/**
 * 19.7 健康资产管理
 * 
 * 功能包括：
 * - 设备设施管理
 * - 资产检查记录
 * - 设备状态跟踪
 * - 面包屑导航切换
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
  Tabs,
  Breadcrumb,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

type AssetType = '辐射防护服' | '个人剂量计';
type AssetStatus = '在用' | '闲置' | '报废';

interface EquipmentFacility {
  id: string;
  assetNumber: string;
  model: string;
  assetType: AssetType;
  initialProtectionLevel: string;
  supplier: string;
  productionDate: string;
  shelfLife: string;
  status: AssetStatus;
  image?: any[];
  manual?: any[];
  createdBy: string;
  createdAt: string;
}

interface AssetInspection {
  id: string;
  assetNumber: string;
  model: string;
  assetType: AssetType;
  inspectionTime: string;
  qualityIssues: string;
  remark?: string;
  createdBy: string;
  createdAt: string;
}

interface FilterState {
  assetNumber?: string;
}

interface ModalState {
  visible: boolean;
  type: 'add' | 'edit' | 'view';
  record?: any;
}

const AssetManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  
  const [activeTab, setActiveTab] = useState('equipment');
  const [equipmentData, setEquipmentData] = useState<EquipmentFacility[]>([]);
  const [inspectionData, setInspectionData] = useState<AssetInspection[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({ visible: false, type: 'add' });
  const [filter, setFilter] = useState<FilterState>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 初始化数据
  useEffect(() => {
    fetchData();
  }, [activeTab, filter, pagination.current, pagination.pageSize]);

  // 获取资产数据
  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (activeTab === 'equipment') {
        const mockEquipmentData: EquipmentFacility[] = [
          {
            id: '1',
            assetNumber: 'FS-001',
            model: 'LEAD-PRO-X1',
            assetType: '辐射防护服',
            initialProtectionLevel: '0.5mmPb',
            supplier: '防护设备有限公司',
            productionDate: '2023-06-15',
            shelfLife: '2028-06-14',
            status: '在用',
            createdBy: '设备管理员',
            createdAt: '2023-06-20 10:30:00',
          },
          {
            id: '2',
            assetNumber: 'DM-001',
            model: 'DOSIMETER-2024',
            assetType: '个人剂量计',
            initialProtectionLevel: '0.01mSv',
            supplier: '辐射检测科技公司',
            productionDate: '2024-01-10',
            shelfLife: '2029-01-09',
            status: '在用',
            createdBy: '设备管理员',
            createdAt: '2024-01-15 14:20:00',
          },
          {
            id: '3',
            assetNumber: 'FS-002',
            model: 'LEAD-PRO-Y2',
            assetType: '辐射防护服',
            initialProtectionLevel: '0.35mmPb',
            supplier: '防护设备有限公司',
            productionDate: '2022-08-20',
            shelfLife: '2027-08-19',
            status: '闲置',
            createdBy: '设备管理员',
            createdAt: '2022-08-25 16:45:00',
          },
        ];
        setEquipmentData(mockEquipmentData);
        setPagination(prev => ({ ...prev, total: mockEquipmentData.length }));
      } else {
        const mockInspectionData: AssetInspection[] = [
          {
            id: '1',
            assetNumber: 'FS-001',
            model: 'LEAD-PRO-X1',
            assetType: '辐射防护服',
            inspectionTime: '2024-12-15',
            qualityIssues: '外观完好，防护效果正常',
            remark: '定期检查，无异常',
            createdBy: '检查员A',
            createdAt: '2024-12-15 09:30:00',
          },
          {
            id: '2',
            assetNumber: 'DM-001',
            model: 'DOSIMETER-2024',
            assetType: '个人剂量计',
            inspectionTime: '2024-12-10',
            qualityIssues: '电池电量低，需要更换',
            remark: '已更换电池，功能正常',
            createdBy: '检查员B',
            createdAt: '2024-12-10 14:20:00',
          },
          {
            id: '3',
            assetNumber: 'FS-002',
            model: 'LEAD-PRO-Y2',
            assetType: '辐射防护服',
            inspectionTime: '2024-11-30',
            qualityIssues: '发现轻微磨损',
            remark: '建议加强保养',
            createdBy: '检查员A',
            createdAt: '2024-11-30 16:45:00',
          },
        ];
        setInspectionData(mockInspectionData);
        setPagination(prev => ({ ...prev, total: mockInspectionData.length }));
      }
    } catch (error) {
      message.error('获取资产数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取状态标签
  const getStatusTag = (status: AssetStatus) => {
    const statusConfig = {
      '在用': { color: 'green', text: '在用' },
      '闲置': { color: 'orange', text: '闲置' },
      '报废': { color: 'red', text: '报废' },
    };
    const config = statusConfig[status];
    return <Tag color={config.color}>{config.text}</Tag>;
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
  const openModal = (type: 'add' | 'edit' | 'view', record?: any) => {
    setModal({ visible: true, type, record });
    if (type === 'edit' && record) {
      if (activeTab === 'equipment') {
        form.setFieldsValue({
          ...record,
          productionDate: dayjs(record.productionDate),
          shelfLife: dayjs(record.shelfLife),
        });
      } else {
        form.setFieldsValue({
          ...record,
          inspectionTime: dayjs(record.inspectionTime),
        });
      }
    } else if (type === 'add') {
      form.resetFields();
    }
  };

  // 关闭模态框
  const closeModal = () => {
    setModal({ visible: false, type: 'add' });
    form.resetFields();
  };

  // 保存记录
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log('保存记录:', values);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(modal.type === 'add' ? '添加成功' : '更新成功');
      closeModal();
      fetchData();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  // 删除记录
  const handleDelete = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      message.success('删除成功');
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 设备设施表格列
  const equipmentColumns: ColumnsType<EquipmentFacility> = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, __, index) => 
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: '资产编号',
      dataIndex: 'assetNumber',
      key: 'assetNumber',
      width: 100,
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      width: 120,
    },
    {
      title: '资产类型',
      dataIndex: 'assetType',
      key: 'assetType',
      width: 100,
    },
    {
      title: '初始防护等级',
      dataIndex: 'initialProtectionLevel',
      key: 'initialProtectionLevel',
      width: 120,
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier',
      width: 140,
      ellipsis: true,
    },
    {
      title: '生产日期',
      dataIndex: 'productionDate',
      key: 'productionDate',
      width: 110,
      render: (text) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: '保质期',
      dataIndex: 'shelfLife',
      key: 'shelfLife',
      width: 110,
      render: (text) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => getStatusTag(status),
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
            title="确定删除这条设备记录吗？"
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

  // 资产检查表格列
  const inspectionColumns: ColumnsType<AssetInspection> = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, __, index) => 
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: '资产编号',
      dataIndex: 'assetNumber',
      key: 'assetNumber',
      width: 100,
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      width: 120,
    },
    {
      title: '资产类型',
      dataIndex: 'assetType',
      key: 'assetType',
      width: 100,
    },
    {
      title: '检查时间',
      dataIndex: 'inspectionTime',
      key: 'inspectionTime',
      width: 110,
      render: (text) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: '质量问题',
      dataIndex: 'qualityIssues',
      key: 'qualityIssues',
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
            title="确定删除这条检查记录吗？"
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
    const { type } = modal;
    const isView = type === 'view';
    const isEquipment = activeTab === 'equipment';
    
    if (isEquipment) {
      return (
        <Form form={form} layout="vertical" disabled={isView}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="assetNumber"
                label="资产编号"
                rules={[{ required: true, message: '请输入资产编号' }]}
              >
                <Input placeholder="请输入资产编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="model"
                label="型号"
                rules={[{ required: true, message: '请输入型号' }]}
              >
                <Input placeholder="请输入型号" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="assetType"
                label="资产类型"
                rules={[{ required: true, message: '请选择资产类型' }]}
              >
                <Select placeholder="请选择资产类型">
                  <Option value="辐射防护服">辐射防护服</Option>
                  <Option value="个人剂量计">个人剂量计</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="initialProtectionLevel"
                label="初始防护等级"
                rules={[{ required: true, message: '请输入初始防护等级' }]}
              >
                <Input placeholder="请输入初始防护等级" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="supplier"
            label="供应商"
            rules={[{ required: true, message: '请输入供应商' }]}
          >
            <Input placeholder="请输入供应商" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productionDate"
                label="生产日期"
                rules={[{ required: true, message: '请选择生产日期' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="请选择生产日期"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="shelfLife"
                label="保质期"
                rules={[{ required: true, message: '请选择保质期' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="请选择保质期"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="在用">在用</Option>
              <Option value="闲置">闲置</Option>
              <Option value="报废">报废</Option>
            </Select>
          </Form.Item>

          {!isView && (
            <>
              <Form.Item name="image" label="上传图片">
                <Upload beforeUpload={() => false} accept=".jpg,.jpeg,.png">
                  <Button icon={<UploadOutlined />}>点击上传</Button>
                </Upload>
              </Form.Item>

              <Form.Item name="manual" label="上传设备设施说明书">
                <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx">
                  <Button icon={<UploadOutlined />}>点击上传</Button>
                </Upload>
              </Form.Item>
            </>
          )}
        </Form>
      );
    } else {
      return (
        <Form form={form} layout="vertical" disabled={isView}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="assetNumber"
                label="资产编号"
                rules={[{ required: true, message: '请输入资产编号' }]}
              >
                <Input placeholder="请输入资产编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="model"
                label="型号"
                rules={[{ required: true, message: '请输入型号' }]}
              >
                <Input placeholder="请输入型号" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="assetType"
                label="资产类型"
                rules={[{ required: true, message: '请选择资产类型' }]}
              >
                <Select placeholder="请选择资产类型">
                  <Option value="辐射防护服">辐射防护服</Option>
                  <Option value="个人剂量计">个人剂量计</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="inspectionTime"
                label="检查时间"
                rules={[{ required: true, message: '请选择检查时间' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="请选择检查时间"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="qualityIssues"
            label="质量问题"
            rules={[{ required: true, message: '请输入质量问题' }]}
          >
            <TextArea
              rows={3}
              placeholder="请输入质量问题"
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item name="remark" label="备注">
            <TextArea
              rows={3}
              placeholder="请输入备注信息"
              maxLength={200}
              showCount
            />
          </Form.Item>
        </Form>
      );
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>职业健康管理</Breadcrumb.Item>
        <Breadcrumb.Item>健康资产管理</Breadcrumb.Item>
        <Breadcrumb.Item>{activeTab === 'equipment' ? '设备设施' : '资产检查'}</Breadcrumb.Item>
      </Breadcrumb>
      
      <Title level={2}>19.7 健康资产管理</Title>
      
      {/* 筛选区域 */}
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item name="assetNumber" label="资产编号">
            <Input
              placeholder="请输入资产编号"
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
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="设备设施" key="equipment">
            <Table
              columns={equipmentColumns}
              dataSource={equipmentData}
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
          
          <TabPane tab="资产检查" key="inspection">
            <Table
              columns={inspectionColumns}
              dataSource={inspectionData}
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
        </Tabs>
      </Card>

      {/* 模态框 */}
      <Modal
        title={
          modal.type === 'add' ? `新增${activeTab === 'equipment' ? '设备设施' : '检查记录'}` : 
          modal.type === 'edit' ? `编辑${activeTab === 'equipment' ? '设备设施' : '检查记录'}` : 
          `${activeTab === 'equipment' ? '设备设施' : '检查记录'}详情`
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

export default AssetManagement;