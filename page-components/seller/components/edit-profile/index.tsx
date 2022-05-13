import React, { useState } from 'react';
import styles from "./index.module.scss";

import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { TimePicker } from 'antd';

const { Option } = Select;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Edit_Profile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="98">+98</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="98">98</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
  

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Form className={styles["form"]}
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '98',
      }}
      scrollToFirstError
    >
      <Form.Item 
        name="nickname"
        label="نام و نام خانوادگی"
        rules={[
          {
            required: true,
            // message: 'لطفا نام و نام خانوادگی خود را وارد کنید',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="شماره همراه"
        rules={[
          {
            required: true,
            // message: 'لطفا شماره تلفن خود را وارد کنید',
          },
        ]}
      >
       <Input
          addonAfter={suffixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="nationalID"
        label="کد ملی"
        rules={[
          {
            required: true,
            // message: 'لطفا کد ملی خود را وارد کنید',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="آدرس"
        rules={[
          {
            required: true,
            // message: 'لطفا آدرس خود را وارد کنید',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
        
      <Form.Item >
      <TimePicker.RangePicker  />
      </Form.Item>
      
      <Form.Item {...tailFormItemLayout}>
        <Button className={styles["submit-btn"]} type="primary" htmlType="submit">
          ویرایش پروفایل
        </Button>
      </Form.Item>
    </Form>
  );
};

export default () => <Edit_Profile />;