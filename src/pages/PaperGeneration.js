// src/pages/PaperGeneration.js
import React, { useState } from 'react';
import { Button, Input, Select, Card, message } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const subTitles = [
  '引言',
  '文献综述',
  '研究方法',
  '数据分析',
  '结论与展望'
]; // 子标题导航栏的选项

const PaperGeneration = () => {
  const [selectedSubtitle, setSelectedSubtitle] = useState('引言'); // 当前选择的子标题
  const [prompt, setPrompt] = useState(''); // 用户输入的 Prompt
  const [generatedText, setGeneratedText] = useState(''); // 生成的文本

  // 模拟生成文字的函数
  const generateText = () => {
    let text;
    if (prompt) {
      text = `根据提示 "${prompt}" 为 ${selectedSubtitle} 生成的内容：\n\n这是与提示相关的生成文本...`;
    } else {
      text = `这是 ${selectedSubtitle} 的完整生成段落：\n\n这是自动生成的完整文本...`;
    }
    setGeneratedText(text);
    message.success(`已生成 ${selectedSubtitle} 的内容`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>分段生成论文</h2>

      {/* 导航栏：选择子标题 */}
      <Select
        value={selectedSubtitle}
        onChange={setSelectedSubtitle}
        style={{ width: '300px', marginBottom: '20px' }}
      >
        {subTitles.map((title) => (
          <Option key={title} value={title}>
            {title}
          </Option>
        ))}
      </Select>

      {/* Prompt 输入框 */}
      <TextArea
        placeholder="输入提示词（可选）"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        style={{ marginBottom: '10px' }}
      />

      {/* 生成按钮 */}
      <Button type="primary" onClick={generateText} style={{ marginBottom: '20px' }}>
        生成内容
      </Button>

      {/* 生成结果展示框 */}
      <Card title={`${selectedSubtitle}内容生成`} bordered={false}>
        <pre>{generatedText}</pre>
      </Card>
    </div>
  );
};

export default PaperGeneration;
