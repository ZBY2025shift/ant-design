import type { Metadata } from 'next'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './globals.css'

export const metadata: Metadata = {
  title: '荆门静脉产业园智慧管理系统',
  description: '荆门静脉产业园智慧管理系统',
}

// Ant Design 主题配置
const theme = {
  token: {
    colorPrimary: '#0A2463',
    colorBgContainer: '#ffffff',
    borderRadius: 8,
    fontSize: 14,
  },
  components: {
    Button: {
      borderRadius: 4,
    },
    Card: {
      borderRadius: 8,
    },
    Table: {
      headerBg: '#F5F5F5',
      rowHoverBg: '#F9FAFB',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ConfigProvider locale={zhCN} theme={theme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}