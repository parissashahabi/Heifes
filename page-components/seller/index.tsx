import { Layout, Menu, Space, Table, Tag } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import styles from "./index.module.scss";
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';



const { Header, Content, Footer, Sider } = Layout;
const data = [
  {
    key: '1',
    product_name: 'سوپر مارکت ستاره',
    tracking_code: 298415,
    order_status: ['ثبت وضعیت'],
  },
  {
    key: '2',
    product_name: 'سوپر مارکت ستاره',
    tracking_code: 298415,
    order_status: ['ثبت وضعیت'],
  },
  {
    key: '3',
    product_name: 'سوپر مارکت ستاره',
    tracking_code: 298415,
    order_status: ['ثبت وضعیت'],
  },
  {
    key: '4',
    product_name: 'سوپر مارکت ستاره',
    tracking_code: 298415,
    order_status: ['ثبت وضعیت'],
  },
  {
    key: '5',
    product_name: 'سوپر مارکت ستاره',
    tracking_code: 298415,
    order_status: ['ثبت وضعیت'],
  },
  {
    key: '6',
    product_name: 'سوپر مارکت ستاره',
    tracking_code: 298415,
    order_status: ['ثبت وضعیت'],
  },
  {
    key: '7',
    product_name: 'سوپر مارکت ستاره',
    tracking_code: 298415,
    order_status: ['ثبت وضعیت'],
  },
];

export default () => (
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['5']}
        items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined, UploadOutlined].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }),
        )}
      />
      
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Table dataSource={data}>
    <ColumnGroup title="نام کالا" dataIndex="product_name" key="product_name" >
    </ColumnGroup>
    <Column title="کد رهگیری" dataIndex="tracking_code" key="tracking_code" />
    <Column 
      title="وضعیت سفارش"
      dataIndex="order_status"
      key="order_status"
      render={order_status => (
        <>
          {order_status.map(tag => (
            <Tag color="#A0A0A0" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
  </Table>
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Mohammad Aghaei</Footer> */}
    </Layout>
  </Layout>
);