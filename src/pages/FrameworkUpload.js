// src/pages/FrameworkUploadEdit.js
import React, { useState, useEffect } from 'react';
import { Upload, Button, Input, message, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const defaultFramework = `
1. 引言
2. 文献综述
3. 研究方法
4. 数据分析
5. 结论与展望
`;

const FrameworkUploadEdit = () => {
  const location = useLocation(); // 获取当前页面的路由参数
  const navigate = useNavigate(); // 用于页面跳转
  const [framework, setFramework] = useState(''); // 存储上传或生成的框架
  const [uploaded, setUploaded] = useState(false); // 判断是否上传成功
  const [currentTopic, setCurrentTopic] = useState(''); // 当前研究主题

  // 获取传递过来的主题（如果有的话）
  useEffect(() => {
    if (location.state?.topic) {
      setCurrentTopic(location.state.topic);
    }
  }, [location.state]);

  // 上传文件后的回调
  const handleUpload = (info) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFramework(content);
      setUploaded(true);
      message.success('框架上传成功！');
    };
    reader.readAsText(info.file);
  };

  // 生成默认框架的回调
  const generateFramework = () => {
    setFramework(defaultFramework);
    setUploaded(true);
    message.success('已生成默认框架！');
  };

  // 编辑框架的回调
  const handleFrameworkChange = (e) => {
    setFramework(e.target.value);
  };

  return (
    <div>
      <h2>上传或生成框架</h2>

      {/* 显示当前研究主题 */}
      <Card title="当前研究主题" style={{ marginBottom: '20px' }}>
        {currentTopic ? (
          <p>{currentTopic}</p>
        ) : (
          <p>暂无研究主题，请先输入主题。</p>
        )}
        <Button type="link" onClick={() => navigate('/topic-input')}>
          修改主题
        </Button>
      </Card>

      {/* 上传框架部分 */}
      <Upload
        beforeUpload={(file) => {
          handleUpload({ file });
          return false; // 阻止自动上传
        }}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>上传框架文件（txt 或 word）</Button>
      </Upload>

      <Button 
        type="default" 
        onClick={generateFramework} 
        style={{ marginLeft: '10px' }}
      >
        暂无框架？自动生成
      </Button>

      {/* 框架展示与编辑部分 */}
      {uploaded && (
        <Card title="查看并编辑框架" style={{ marginTop: '20px' }}>
          <Input.TextArea
            rows={10}
            value={framework}
            onChange={handleFrameworkChange}
          />
          <Button 
            type="primary" 
            style={{ marginTop: '10px' }}
            onClick={() => message.success('框架已保存！')}
          >
            保存框架
          </Button>
        </Card>
      )}
    </div>
  );
};

export default FrameworkUploadEdit;


