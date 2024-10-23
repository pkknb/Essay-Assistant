// src/pages/FinalPolish.js
import React, { useState, useRef } from 'react';
import { Input, Button, Upload, Card, List, Modal, message, Space } from 'antd';
import { UploadOutlined, PictureOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const databaseImages = ['图片1', '图片2', '图片3']; // 模拟数据库中的图片资源

const FinalPolish = () => {
  const [finalText, setFinalText] = useState(''); // 终稿文字
  const [summary, setSummary] = useState(''); // 摘要
  const [keywords, setKeywords] = useState(''); // 关键词
  const [selectedImage, setSelectedImage] = useState(null); // 选择的图片
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制图片选择弹窗
  const [beautifyModalVisible, setBeautifyModalVisible] = useState(false); // 控制文字美化模态框
  const [beautifiedText, setBeautifiedText] = useState(''); // 美化后的文字
  const textAreaRef = useRef(null); // 用于获取 TextArea 的选中文字

  // 获取选中的文字
  const handleSelectText = () => {
    const textarea = textAreaRef.current.resizableTextArea.textArea;
    const selected = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );

    if (selected) {
      setBeautifiedText(selected.replace(/\./g, '。')); // 示例美化处理
      setBeautifyModalVisible(true); // 显示美化模态框
    } else {
      message.error('请先选中要美化的文字');
    }
  };

  // 替换选中的文字
  const handleReplaceText = () => {
    const textarea = textAreaRef.current.resizableTextArea.textArea;
    const { value, selectionStart, selectionEnd } = textarea;

    const newText =
      value.substring(0, selectionStart) +
      beautifiedText +
      value.substring(selectionEnd);

    setFinalText(newText); // 更新终稿文字
    setBeautifyModalVisible(false); // 关闭模态框
    message.success('文字已替换');
  };

  // 生成摘要
  const generateSummary = () => {
    setSummary('这是根据终稿生成的摘要...');
    message.success('摘要已生成');
  };

  // 生成关键词
  const generateKeywords = () => {
    setKeywords('关键词1, 关键词2, 关键词3');
    message.success('关键词已生成');
  };

  // 打开图片选择弹窗
  const showImageModal = () => {
    setIsModalVisible(true);
  };

  // 选择图片并关闭弹窗
  const handleSelectImage = (image) => {
    setSelectedImage(image);
    setIsModalVisible(false);
    message.success(`已选择 ${image}`);
  };

  // 上传图片回调
  const handleImageUpload = (info) => {
    message.success(`${info.file.name} 上传成功`);
    setSelectedImage(info.file.name); // 使用上传的图片
  };

  // 检测并插入引用文献（模拟逻辑）
  const insertCitations = () => {
    const textWithCitations = `${finalText}\n\n[1] 示例引用文献`;
    setFinalText(textWithCitations);
    message.success('引用文献已插入');
  };

  // 模拟保存终稿的操作
  const handleSaveFinal = () => {
    message.success('终稿已成功保存！');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>终稿修缮页面</h2>

      {/* 终稿输入框 */}
      <TextArea
        ref={textAreaRef}
        rows={10}
        placeholder="输入或粘贴终稿文字..."
        value={finalText}
        onChange={(e) => setFinalText(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {/* 功能按钮组 */}
      <Space wrap size="middle" style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={generateSummary}>
          生成摘要
        </Button>
        <Button type="primary" onClick={generateKeywords}>
          生成关键词
        </Button>
        <Button type="primary" onClick={showImageModal}>
          插入图片
        </Button>
        <Upload beforeUpload={() => false} onChange={handleImageUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>上传图片</Button>
        </Upload>
        <Button type="primary" onClick={insertCitations}>
          检测并插入引用文献
        </Button>
        <Button type="primary" onClick={handleSelectText}>
          文字美化
        </Button>
        <Button type="primary" onClick={handleSaveFinal}>
          保存终稿
        </Button>
      </Space>

      {/* 摘要展示 */}
      {summary && (
        <Card title="生成的摘要" style={{ marginTop: '20px' }}>
          <p>{summary}</p>
        </Card>
      )}

      {/* 关键词展示 */}
      {keywords && (
        <Card title="生成的关键词" style={{ marginTop: '20px' }}>
          <p>{keywords}</p>
        </Card>
      )}

      {/* 已选图片展示 */}
      {selectedImage && (
        <Card title="已插入的图片" style={{ marginTop: '20px' }}>
          <PictureOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
          <span>{selectedImage}</span>
        </Card>
      )}

      {/* 图片选择弹窗 */}
      <Modal
        title="选择图片"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <List
          bordered
          dataSource={databaseImages}
          renderItem={(item) => (
            <List.Item onClick={() => handleSelectImage(item)}>
              {item}
            </List.Item>
          )}
        />
      </Modal>

      {/* 文字美化模态框 */}
      <Modal
        title="美化后的文字"
        visible={beautifyModalVisible}
        onOk={handleReplaceText}
        onCancel={() => setBeautifyModalVisible(false)}
        okText="替换"
        cancelText="取消"
      >
        <TextArea
          rows={5}
          value={beautifiedText}
          onChange={(e) => setBeautifiedText(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default FinalPolish;
