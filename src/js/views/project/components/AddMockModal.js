import React, { useState } from "react";

import { Modal, Form, Input } from "antd";

//mutations
import AddMockMutation from "/js/mutations/AddMockMutation";

//default template
import { arrayTemplate } from "/js/views/mock/templates";

function AddMock(props) {
  //props
  const { visible, close, form, parentID } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;

  //state
  const [loading, setLoading] = useState(false);

  function handleOk() {
    validateFields((err, values) => {
      if (err) {
        return;
      }
      setLoading(true);
      AddMockMutation.commit({
        parentID,
        input: {
          name: values.name,
          pathKey: values.pathKey,
          projectId: parentID,
          template: arrayTemplate
        },
        onCompleted() {
          setLoading(false);
          resetFields();
          close();
        }
      });
    });
  }

  return (
    <div>
      <Modal
        title="添加数据"
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={close}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "名不能为空" }]
            })(<Input placeholder="输入名称" />)}
          </Form.Item>
          <Form.Item label="pathKey">
            {getFieldDecorator("pathKey", {
              rules: [{ required: true, message: "pathKey不能为空" }]
            })(<Input placeholder="输入pathKey" />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Form.create({ name: "add_Mock_modal" })(AddMock);
