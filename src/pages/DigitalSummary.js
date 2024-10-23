// src/pages/DigitalSummary.js
import React, { useState } from 'react';
import { Button, Input, Card, List, message } from 'antd';
import { VideoCameraOutlined, PlusOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const DigitalSummary = () => {
  const [videoSummary, setVideoSummary] = useState(null); // 生成的视频摘要
  const [annotations, setAnnotations] = useState([]); // 批注与笔记
  const [newAnnotation, setNewAnnotation] = useState(''); // 新批注输入框内容
  const [ideas, setIdeas] = useState([]); // 存储新想法
  const [newIdea, setNewIdea] = useState(''); // 新想法内容
  const [fullText, setFullText] = useState(''); // 全文内容
  const [isFullTextVisible, setIsFullTextVisible] = useState(false); // 控制全文展示

  // 模拟生成论文介绍视频摘要
  const generateVideoSummary = () => {
    setVideoSummary('https://www.example.com/video-summary.mp4'); // 假设的视频链接
    message.success('视频摘要已生成');
  };

  // 添加批注
  const addAnnotation = () => {
    if (newAnnotation.trim()) {
      setAnnotations([...annotations, newAnnotation]);
      setNewAnnotation('');
      message.success('批注已添加');
    } else {
      message.error('请输入批注内容');
    }
  };

  // 添加新想法
  const addIdea = () => {
    if (newIdea.trim()) {
      setIdeas([...ideas, newIdea]);
      setNewIdea('');
      message.success('新想法已记录');
    } else {
      message.error('请输入想法内容');
    }
  };

  // 模拟加载全文内容
  const loadFullText = () => {
    setFullText(`
      1. 引言：这是论文的引言部分。
      2. 文献综述：这是论文的文献综述部分。
      3. 研究方法：这是论文的研究方法部分。
      4. 数据分析：这是论文的数据分析部分。
      5. 结论与展望：这是论文的结论与展望部分。
    `);
    setIsFullTextVisible(true);
    message.success('全文已加载');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>数字化总结页面</h2>

      {/* 视频摘要部分 */}
      <Card title="论文介绍视频摘要" style={{ marginBottom: '20px' }}>
        {videoSummary ? (
          <video
            width="100%"
            controls
            src={videoSummary}
            style={{ borderRadius: '8px' }}
          />
        ) : (
          <Button
            type="primary"
            icon={<VideoCameraOutlined />}
            onClick={generateVideoSummary}
          >
            生成视频摘要
          </Button>
        )}
      </Card>

      {/* 全文呈现部分 */}
      <Card
        title="全文呈现"
        style={{ marginBottom: '20px' }}
        extra={
          <Button type="link" icon={<FileTextOutlined />} onClick={loadFullText}>
            加载全文
          </Button>
        }
      >
        {isFullTextVisible ? (
          <pre style={{ whiteSpace: 'pre-wrap' }}>{fullText}</pre>
        ) : (
          <p>点击右上角按钮加载论文全文。</p>
        )}
      </Card>

      {/* 批注与笔记部分 */}
      <Card title="批注与笔记" style={{ marginBottom: '20px' }}>
        <List
          bordered
          dataSource={annotations}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          locale={{ emptyText: '暂无批注' }}
        />
        <div style={{ marginTop: '10px' }}>
          <TextArea
            rows={2}
            placeholder="添加新的批注..."
            value={newAnnotation}
            onChange={(e) => setNewAnnotation(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={addAnnotation}>
            添加批注
          </Button>
        </div>
      </Card>

      {/* 新想法记录部分 */}
      <Card title="新想法记录">
        <List
          bordered
          dataSource={ideas}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          locale={{ emptyText: '暂无新想法' }}
        />
        <div style={{ marginTop: '10px' }}>
          <TextArea
            rows={2}
            placeholder="记录新的想法..."
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={addIdea}>
            添加想法
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DigitalSummary;
