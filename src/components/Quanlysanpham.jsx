import React from 'react';
import { Tabs } from 'antd';
const onChange = (key) => {
  console.log(key);
};
const Sanpham = () => (
  <Tabs
    onChange={onChange}
    type="card"
    items={new Array(3).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: `Tab ${id}`,
        key: id,
        children: `Content of Tab Pane ${id}`,
      };
    })}
  />
);
export default Sanpham;