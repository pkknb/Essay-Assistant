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
      // 这里可以跳转到框架上传页面
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
        保存主题
      </Button>
      <div style={{ marginTop: '20px' }}>
        <Button type="link" onClick={() => navigate('/questionnaire')}>
          没有主题？点这里
        </Button>
      </div>
    </div>
  );
};

export default TopicInput;

