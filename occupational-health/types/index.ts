/**
 * 职业健康管理系统类型定义
 */

// 基础通用类型
type ReactNode = any;
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface PaginationParams {
  current: number;
  pageSize: number;
  total?: number;
}

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

export interface FileUpload {
  uid: string;
  name: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  response?: any;
}

// 19.2 职业健康培训相关类型
export interface TrainingContent {
  trainingPlan: string; // 辐射安全防护培训计划
  signInSheet: string; // 辐射安全防护培训签到表
  processRecord: string; // 辐射安全防护培训过程记录
  trainingMaterials: string; // 辐射安全防护培训资料
  certificateOfQualification: string; // 辐射安全防护培训考核合格证
}

export interface Training extends BaseEntity {
  trainingTime: string; // 培训时间
  radiationTrainingContent: string; // 放射培训内容
  trainingLocation: string; // 培训地点
  participantCount: number; // 参加人数
  safetyTrainingContent: TrainingContent; // 安全培训内容
  remark?: string; // 备注
  attachments?: FileUpload[]; // 附件
}

export interface TrainingFormData {
  safetyTrainingContent: string; // 安全培训内容
  trainingTime: string; // 培训时间
  trainingLocation: string; // 培训地点
  participantCount: number; // 参加人数
  trainingPlan?: FileUpload[]; // 上传培训计划
  signInSheet?: FileUpload[]; // 上传培训签到表
  processRecord?: FileUpload[]; // 上传培训过程记录
  trainingMaterials?: FileUpload[]; // 上传培训资料
  certificateOfQualification?: FileUpload[]; // 上传考核合格证
  remark?: string; // 备注
}

// 19.3 放射人员管理相关类型
export interface Personnel extends BaseEntity {
  name: string; // 姓名
  position: string; // 岗位
  exposureType: string; // 照射种类
  practiceCertificate: string; // 执业证书
  initialDate: string; // 初始日期
  validDate: string; // 有效日期
  warningTime: string; // 预警时间
  workCertificate?: FileUpload[]; // 放射人员工作证
}

export interface PersonnelFormData {
  name: string;
  position: string;
  exposureType: string;
  initialDate: string;
  validDate: string;
  warningTime: string;
  workCertificate?: FileUpload[];
}

// 19.4 个人剂量检测相关类型
export type HealthWarningLevel = '健康安全' | '一级预警' | '二级预警';

export interface DailyDetection extends BaseEntity {
  detectionTime: string; // 检测时间
  detectionPersonnel: string; // 检测人员
  position: string; // 岗位
  personalDosimeterNumber: string; // 个人剂量计编号
  radiationDose: number; // 辐射剂量
  remark?: string; // 备注
}

export interface CumulativeDetection extends BaseEntity {
  detectionTime: string; // 检测时间
  detectionPersonnel: string; // 检测人员
  position: string; // 岗位
  firstQuarter: number; // 第一季度（辐射剂量mSv）
  secondQuarter: number; // 第二季度（辐射剂量mSv）
  thirdQuarter: number; // 第三季度（辐射剂量mSv）
  fourthQuarter: number; // 第四季度（辐射剂量mSv）
  annualTotal: number; // 年度累计（辐射剂量mSv）
  healthWarning: HealthWarningLevel; // 健康预警
}

export interface WarningSettings {
  firstLevelWarning: number; // 一级预警（年累积辐射剂量 mSv）
  secondLevelWarning: number; // 二级预警（年累积辐射剂量 mSv）
  smsNotification: boolean; // 短信提示
}

export interface DoseDetectionFormData {
  detectionTime: string;
  detectionPersonnel: string;
  position: string;
  personalDosimeterNumber: string;
  radiationDose: number;
  remark?: string;
}

// 19.5 体检报告管理相关类型
export interface HealthReport extends BaseEntity {
  examTime: string; // 体检时间
  examPersonnel: string; // 体检人员
  reportName: string; // 报告名称
  reportFile?: FileUpload[]; // 职业健康体检报告
}

export interface HealthReportFormData {
  examTime: string;
  examPersonnel: string;
  reportName: string;
  reportFile?: FileUpload[];
}

// 19.6 辐射安全应急相关类型
export interface EmergencyDocument extends BaseEntity {
  fileTitle: string; // 文件标题
  fileContent?: FileUpload[]; // 文件内容
}

export interface EmergencyDocumentFormData {
  fileTitle: string;
  fileContent?: FileUpload[];
}

// 19.7 健康资产管理相关类型
export type AssetType = '辐射防护服' | '个人剂量计';
export type AssetStatus = '在用' | '闲置' | '报废';

export interface EquipmentFacility extends BaseEntity {
  assetNumber: string; // 资产编号
  model: string; // 型号
  assetType: AssetType; // 资产类型
  initialProtectionLevel: string; // 初始防护等级
  supplier: string; // 供应商
  productionDate: string; // 生产日期
  shelfLife: string; // 保质期
  status: AssetStatus; // 状态
  image?: FileUpload[]; // 上传图片
  manual?: FileUpload[]; // 上传设备设施说明书
}

export interface AssetInspection extends BaseEntity {
  assetNumber: string; // 资产编号
  model: string; // 型号
  assetType: AssetType; // 资产类型
  inspectionTime: string; // 检查时间
  qualityIssues: string; // 质量问题
  remark?: string; // 备注
}

export interface EquipmentFormData {
  assetNumber: string;
  model: string;
  assetType: AssetType;
  initialProtectionLevel: string;
  supplier: string;
  productionDate: string;
  shelfLife: string;
  status: AssetStatus;
  image?: FileUpload[];
  manual?: FileUpload[];
}

export interface InspectionFormData {
  assetNumber: string;
  model: string;
  assetType: AssetType;
  inspectionTime: string;
  qualityIssues: string;
  remark?: string;
}

// 筛选条件类型
export interface TrainingFilter {
  year?: string;
  keyword?: string;
}

export interface PersonnelFilter {
  name?: string;
}

export interface DoseDetectionFilter {
  startTime?: string;
  endTime?: string;
  name?: string;
}

export interface HealthReportFilter {
  startTime?: string;
  endTime?: string;
  name?: string;
}

export interface EmergencyFilter {
  keyword?: string;
}

export interface EquipmentFilter {
  assetNumber?: string;
}

export interface InspectionFilter {
  assetNumber?: string;
}

// 表格列类型
export interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  fixed?: 'left' | 'right';
  render?: (text: any, record: any, index: number) => React.ReactNode;
  sorter?: boolean;
  filters?: Array<{ text: string; value: string }>;
}

// 操作类型
export type ActionType = 'view' | 'edit' | 'delete' | 'add';

// 模态框状态
export interface ModalState {
  visible: boolean;
  type: ActionType;
  record?: any;
}

// 常量定义
export const TRAINING_CONTENT_OPTIONS = [
  '2024年度企业职业健康辐射安全培训',
  '2025年度岗前辐射安全培训',
  '2025年度企业职业健康辐射安全培训',
] as const;

export const TRAINING_LOCATION_OPTIONS = [
  '辐射安全管理中心',
] as const;

export const SAFETY_TRAINING_CONTENT_TYPES = [
  '辐射安全防护培训计划',
  '辐射安全防护培训签到表',
  '辐射安全防护培训过程记录',
  '辐射安全防护培训资料',
  '辐射安全防护培训考核合格证',
] as const;

export const EMERGENCY_DOCUMENT_TITLES = [
  '个人剂量检测方案',
  '辐射安全防护措施',
  '职业健康应急预案',
] as const;

export const ASSET_TYPE_OPTIONS: AssetType[] = [
  '辐射防护服',
  '个人剂量计',
] as const;

export const ASSET_STATUS_OPTIONS: AssetStatus[] = [
  '在用',
  '闲置',
  '报废',
] as const;

export const HEALTH_WARNING_LEVELS: HealthWarningLevel[] = [
  '健康安全',
  '一级预警',
  '二级预警',
] as const;