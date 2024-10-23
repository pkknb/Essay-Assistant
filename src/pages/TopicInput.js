// src/pages/TopicInput.js
import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const TopicInput = () => {
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (!topic) {
      message.error('请输入研究主题！');
    } else {
      message.success(`主题保存成功：${topic}`);
      // 跳转到上传和编辑框架页面，并传递主题
      navigate('/framework-upload-edit', { state: { topic } });
    }
  };

  return (
    <div>
      <h2>请输入研究主题</h2>
      <Input
        placeholder="输入主题"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <Button type="primary" onClick={handleSave} style={{ marginTop: '10px' }}>
        保存并上传框架
      </Button>
    </div>
  );
};

export default TopicInput;

