# 职业健康管理系统 (Occupational Health Management System)

基于 Ant Design 构建的职业健康管理系统，包含辐射安全管理的完整功能模块。

## 系统概览

该系统包含以下主要模块：

### 19.1 综合概览 (General Overview)
- 系统整体数据展示
- 关键指标监控

### 19.2 职业健康培训 (Occupational Health Training)
- 培训计划管理
- 培训记录追踪
- 培训材料管理
- 考核结果管理

### 19.3 放射人员管理 (Radiation Personnel Management)
- 人员信息管理
- 执业证书管理
- 证书到期预警

### 19.4 个人剂量检测 (Personal Dose Detection)
- 日常检测记录
- 累计剂量统计
- 健康预警系统

### 19.5 体检报告管理 (Physical Examination Report Management)
- 体检记录管理
- 报告文件管理

### 19.6 辐射安全应急 (Radiation Safety Emergency)
- 应急文件管理
- 安全防护措施

### 19.7 健康资产管理 (Health Asset Management)
- 设备设施管理
- 资产检查记录

## 技术特性

- 🚀 基于 React 18+ 和 TypeScript
- 🎨 使用 Ant Design 组件库
- 📱 响应式设计，支持移动端
- 🌐 国际化支持
- 🔒 权限管理
- 📊 数据可视化
- 🔔 消息通知和预警系统

## 业务规则

### 培训管理
- 每年至少组织一次辐射安全培训
- 每年可进行1-4次培训，包含岗前培训、年度培训等
- 培训内容包括：培训计划、签到表、过程记录、培训资料、考核合格证

### 人员管理
- 放射人员工作证有效期5年
- 期满30天内申请延续
- 到期前通过短信提醒延续

### 剂量检测
- 支持日常检测和累计检测
- 设置一级、二级预警阈值
- 超过预警值时发送短信提示

### 体检管理
- 每年1-2次职业健康体检
- 支持体检报告文件管理

### 资产管理
- 辐射防护服、个人剂量计等设备管理
- 定期检查记录
- 设备状态跟踪（在用、闲置、报废）

## 文件结构

```
occupational-health/
├── components/           # 公共组件
├── pages/               # 页面组件
│   ├── Overview/        # 综合概览
│   ├── Training/        # 职业健康培训
│   ├── Personnel/       # 放射人员管理
│   ├── DoseDetection/   # 个人剂量检测
│   ├── HealthReport/    # 体检报告管理
│   ├── Emergency/       # 辐射安全应急
│   └── AssetManagement/ # 健康资产管理
├── types/               # TypeScript 类型定义
├── utils/               # 工具函数
├── hooks/               # 自定义 Hooks
└── constants/           # 常量定义
```

## 开发规范

遵循 Ant Design 开发规范：
- 使用 TypeScript 严格类型检查
- 遵循 React Hooks 最佳实践
- 使用函数式组件
- 组件名使用 PascalCase
- 属性名使用 camelCase
- 合理使用 React.memo、useMemo 和 useCallback 优化性能