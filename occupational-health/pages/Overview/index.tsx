import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Progress,
  Alert,
  Space,
  Tag,
  Typography,
  Divider,
  Badge,
} from 'antd';
import {
  UserOutlined,
  SafetyCertificateOutlined,
  RadiusBottomleftOutlined,
  MedicineBoxOutlined,
  WarningOutlined,
  FileTextOutlined,
  ToolOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface OverviewStats {
  totalPersonnel: number;
  validCertificates: number;
  expiringCertificates: number;
  totalTrainings: number;
  thisYearTrainings: number;
  totalDetections: number;
  warningDetections: number;
  totalReports: number;
  totalAssets: number;
  activeAssets: number;
}

interface RecentActivity {
  id: string;
  type: 'training' | 'detection' | 'report' | 'certificate';
  title: string;
  description: string;
  time: string;
  status: 'normal' | 'warning' | 'critical';
}

interface AlertItem {
  id: string;
  type: 'certificate_expiring' | 'dose_warning' | 'asset_maintenance';
  message: string;
  level: 'warning' | 'error';
  count: number;
}

const Overview: React.FC = () => {
  const [stats, setStats] = useState<OverviewStats>({
    totalPersonnel: 0,
    validCertificates: 0,
    expiringCertificates: 0,
    totalTrainings: 0,
    thisYearTrainings: 0,
    totalDetections: 0,
    warningDetections: 0,
    totalReports: 0,
    totalAssets: 0,
    activeAssets: 0,
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据获取
    const fetchData = async () => {
      setLoading(true);
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalPersonnel: 156,
        validCertificates: 142,
        expiringCertificates: 8,
        totalTrainings: 45,
        thisYearTrainings: 12,
        totalDetections: 2840,
        warningDetections: 23,
        totalReports: 312,
        totalAssets: 89,
        activeAssets: 78,
      });

      setRecentActivities([
        {
          id: '1',
          type: 'training',
          title: '2025年度岗前辐射安全培训',
          description: '新员工岗前安全培训，参与人数23人',
          time: '2024-12-20 14:30',
          status: 'normal',
        },
        {
          id: '2',
          type: 'detection',
          title: '个人剂量检测异常',
          description: '员工张三第四季度累计剂量超过一级预警值',
          time: '2024-12-19 16:45',
          status: 'warning',
        },
        {
          id: '3',
          type: 'certificate',
          title: '执业证书即将到期',
          description: '5名员工的放射人员工作证将在30天内到期',
          time: '2024-12-18 09:15',
          status: 'warning',
        },
        {
          id: '4',
          type: 'report',
          title: '职业健康体检报告上传',
          description: '完成Q4季度体检报告归档，共48份',
          time: '2024-12-17 11:20',
          status: 'normal',
        },
      ]);

      setAlerts([
        {
          id: '1',
          type: 'certificate_expiring',
          message: '有 8 张放射人员工作证即将到期',
          level: 'warning',
          count: 8,
        },
        {
          id: '2',
          type: 'dose_warning',
          message: '有 23 人次个人剂量检测超过预警值',
          level: 'error',
          count: 23,
        },
        {
          id: '3',
          type: 'asset_maintenance',
          message: '有 11 台设备需要进行定期检查',
          level: 'warning',
          count: 11,
        },
      ]);

      setLoading(false);
    };

    fetchData();
  }, []);

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'training':
        return <SafetyCertificateOutlined style={{ color: '#52c41a' }} />;
      case 'detection':
        return <RadiusBottomleftOutlined style={{ color: '#faad14' }} />;
      case 'report':
        return <FileTextOutlined style={{ color: '#1890ff' }} />;
      case 'certificate':
        return <UserOutlined style={{ color: '#722ed1' }} />;
      default:
        return <FileTextOutlined />;
    }
  };

  const getStatusTag = (status: RecentActivity['status']) => {
    switch (status) {
      case 'normal':
        return <Tag color="green">正常</Tag>;
      case 'warning':
        return <Tag color="orange">预警</Tag>;
      case 'critical':
        return <Tag color="red">严重</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const recentActivityColumns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (type: RecentActivity['type']) => getActivityIcon(type),
    },
    {
      title: '活动内容',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: RecentActivity) => (
        <div>
          <div style={{ fontWeight: 500 }}>{title}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.description}
          </Text>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: RecentActivity['status']) => getStatusTag(status),
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 140,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>19.1 综合概览</Title>
      
      {/* 预警信息 */}
      {alerts.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {alerts.map(alert => (
              <Alert
                key={alert.id}
                message={alert.message}
                type={alert.level}
                showIcon
                icon={<WarningOutlined />}
                action={
                  <Badge count={alert.count} style={{ backgroundColor: '#f5222d' }} />
                }
              />
            ))}
          </Space>
        </div>
      )}

      {/* 核心指标统计 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="放射人员总数"
              value={stats.totalPersonnel}
              prefix={<UserOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="有效证书数量"
              value={stats.validCertificates}
              prefix={<SafetyCertificateOutlined />}
              suffix="张"
              valueStyle={{ color: '#3f8600' }}
            />
            <Progress
              percent={Math.round((stats.validCertificates / stats.totalPersonnel) * 100)}
              size="small"
              status="active"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="本年度培训次数"
              value={stats.thisYearTrainings}
              prefix={<MedicineBoxOutlined />}
              suffix="次"
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              总培训次数: {stats.totalTrainings}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃资产数量"
              value={stats.activeAssets}
              prefix={<ToolOutlined />}
              suffix="台"
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress
              percent={Math.round((stats.activeAssets / stats.totalAssets) * 100)}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* 详细统计和活动记录 */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card title="剂量检测统计" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="总检测次数"
                  value={stats.totalDetections}
                  prefix={<RadiusBottomleftOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="预警次数"
                  value={stats.warningDetections}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<WarningOutlined />}
                />
              </Col>
            </Row>
            <Divider />
            <div>
              <Text strong>预警率: </Text>
              <Text type="secondary">
                {((stats.warningDetections / stats.totalDetections) * 100).toFixed(2)}%
              </Text>
            </div>
          </Card>

          <Card title="证书状态分布">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="即将到期"
                  value={stats.expiringCertificates}
                  valueStyle={{ color: '#faad14' }}
                  prefix={<WarningOutlined />}
                  suffix="张"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="体检报告"
                  value={stats.totalReports}
                  prefix={<FileTextOutlined />}
                  suffix="份"
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="最近活动记录">
            <Table
              dataSource={recentActivities}
              columns={recentActivityColumns}
              pagination={false}
              size="small"
              loading={loading}
              rowKey="id"
              scroll={{ y: 300 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;