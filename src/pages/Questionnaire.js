// src/pages/Questionnaire.js
import React, { useState } from 'react';
import { Input, Button, List, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const questions = [
  '问题 1：你感兴趣的领域是什么？',
  '问题 2：你对哪些技术比较了解？',
  '问题 3：你希望研究什么样的问题？',
  '问题 4：你有实践经验的领域是什么？',
  '问题 5：你对哪些社会问题感兴趣？',
  '问题 6：你擅长数据分析吗？',
  '问题 7：你更倾向于理论研究还是实践研究？',
  '问题 8：你希望研究的主题有多新颖？',
  '问题 9：你是否希望研究与行业相关的内容？',
  '问题 10：你的研究时间有多充足？'
];

const Questionnaire = () => {
  const [answers, setAnswers] = useState(Array(10).fill(''));
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    message.success('问卷提交成功！正在生成主题建议...');
    
    // 模拟生成 5 个主题建议
    const generatedSuggestions = [
      '人工智能与医疗应用',
      '大数据在金融分析中的应用',
      '区块链技术的未来发展',
      '无人驾驶汽车的技术挑战',
      '机器学习在教育中的应用'
    ];
    setSuggestions(generatedSuggestions);
  };

  return (
    <div>
      <h2>问卷生成主题</h2>
      <List
        bordered
        dataSource={questions}
        renderItem={(question, index) => (
          <List.Item>
            <div style={{ width: '100%' }}>
              <p>{question}</p>
              <Input
                placeholder={`输入你的回答...`}
                value={answers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                style={{ marginBottom: '10px' }}
              />
            </div>
          </List.Item>
        )}
      />
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
        提交问卷
      </Button>

      {suggestions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>推荐的研究主题：</h3>
          <List
            bordered
            dataSource={suggestions}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Button
            type="primary"
            onClick={() => navigate('/topic-input')}
            style={{ marginTop: '10px' }}
          >
            返回输入主题
          </Button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;

