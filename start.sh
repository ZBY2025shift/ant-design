#!/bin/bash

echo "🚀 荆门静脉产业园智慧管理系统启动脚本"
echo "=================================="

# 检查 Node.js 版本
echo "📋 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 16.0.0 或更高版本"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ $NODE_VERSION -lt 16 ]; then
    echo "❌ Node.js 版本过低，当前版本：$(node -v)，需要 16.0.0 或更高版本"
    exit 1
fi

echo "✅ Node.js 版本：$(node -v)"

# 检查是否存在 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖包..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖包已存在"
fi

echo ""
echo "🎉 准备启动开发服务器..."
echo "📱 系统将在 http://localhost:3000 运行"
echo "🔧 开发模式支持热重载"
echo ""
echo "按 Ctrl+C 可停止服务器"
echo "=================================="
echo ""

# 启动开发服务器
npm run dev