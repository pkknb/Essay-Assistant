// src/pages/MyDatabase.js
import React, { useState } from 'react';
import { Input, Button, List, Card, Upload, message, Tabs, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

// 模拟数据库数据，包括图片资源
const dummyData = {
  "引言": { 
    papers: ["论文1", "论文2"], 
    videos: ["视频1", "视频2"],
    images: ["https://via.placeholder.com/150", "https://via.placeholder.com/200"] 
  },
  "文献综述": { 
    papers: ["论文3"], 
    videos: ["视频3", "视频4"], 
    images: ["https://via.placeholder.com/250"] 
  },
  "研究方法": { 
    papers: [], 
    videos: ["视频5"], 
    images: [] 
  },
};

const MyDatabase = () => {
  const [keyword, setKeyword] = useState(''); // 搜索关键词
  const [filteredData, setFilteredData] = useState([]); // 搜索结果
  const [resourceRequest, setResourceRequest] = useState(''); // 补充资源需求
  const [resourceUrl, setResourceUrl] = useState(''); // 资源网址

  // 搜索数据库的回调
  const handleSearch = () => {
    if (!keyword) {
      message.error('请输入搜索关键词');
      return;
    }

    // 模拟搜索：根据关键词过滤数据库中的论文、视频和图片
    const results = Object.entries(dummyData)
      .map(([section, { papers, videos, images }]) => ({
        section,
        papers: papers.filter((p) => p.includes(keyword)),
        videos: videos.filter((v) => v.includes(keyword)),
        images: images.filter((img) => img.includes(keyword)),
      }))
      .filter((entry) => entry.papers.length || entry.videos.length || entry.images.length);

    setFilteredData(results);
  };

  // 上传文件后的回调
  const handleUpload = (info) => {
    message.success(`${info.file.name} 上传成功，已补充进知识库`);
  };

  // 提交资源网址的回调
  const handleUrlSubmit = () => {
    if (!resourceUrl.trim()) {
      message.error('请输入资源网址');
      return;
    }
    message.success(`资源网址 "${resourceUrl}" 已补充进知识库`);
    setResourceUrl(''); // 清空输入框
  };

  return (
    <div>
      <h2>我的数据库</h2>

      {/* 1. 数据展示 */}
      <Tabs defaultActiveKey="1">
        {Object.entries(dummyData).map(([section, { papers, videos, images }]) => (
          <TabPane tab={section} key={section}>
            <Card title="论文">
              <List
                bordered
                dataSource={papers}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Card>
            <Card title="视频" style={{ marginTop: '10px' }}>
              <List
                bordered
                dataSource={videos}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Card>
            <Card title="图片" style={{ marginTop: '10px' }}>
              <List
                bordered
                dataSource={images}
                renderItem={(item) => (
                  <List.Item>
                    <Image src={item} width={100} />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>
        ))}
      </Tabs>

      {/* 2. 资源搜索 */}
      <div style={{ marginTop: '20px' }}>
        <h3>资源搜索</h3>
        <Input
          placeholder="输入关键词搜索数据库中的资源"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
        <Button type="primary" onClick={handleSearch}>
          搜索
        </Button>

        {filteredData.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>搜索结果：</h4>
            <List
              bordered
              dataSource={filteredData}
              renderItem={(item) => (
                <List.Item>
                  <strong>{item.section}</strong> - 论文: {item.papers.join(', ')} | 视频: {item.videos.join(', ')}
                  {item.images.length > 0 && (
                    <>
                      <br /> 图片:
                      {item.images.map((img, index) => (
                        <Image key={index} src={img} width={50} style={{ marginLeft: '10px' }} />
                      ))}
                    </>
                  )}
                </List.Item>
              )}
            />
          </div>
        )}
      </div>

      {/* 3. 补充资源 */}
      <div style={{ marginTop: '30px' }}>
        <h3>补充资源</h3>

        {/* 文件上传 */}
        <Upload
          beforeUpload={(file) => {
            handleUpload({ file });
            return false; // 阻止自动上传
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} style={{ marginBottom: '10px' }}>
            上传文件并补充进知识库
          </Button>
        </Upload>

        {/* 资源网址输入 */}
        <Input
          placeholder="输入资源网址"
          value={resourceUrl}
          onChange={(e) => setResourceUrl(e.target.value)}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <Button type="primary" onClick={handleUrlSubmit}>
          补充到知识库
        </Button>

        {/* 提交资源需求 */}
        <Input
          placeholder="我还需要补充哪些方面的数据？"
          value={resourceRequest}
          onChange={(e) => setResourceRequest(e.target.value)}
          style={{ width: '300px', marginTop: '10px' }}
        />
        <Button
          type="primary"
          style={{ marginTop: '10px' }}
          onClick={() => message.success(`已记录需求：${resourceRequest}`)}
        >
          提交需求
        </Button>
      </div>
    </div>
  );
};

export default MyDatabase;
