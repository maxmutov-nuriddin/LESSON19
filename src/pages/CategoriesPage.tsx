/* eslint-disable prefer-const */
import { useEffect, useRef, useState } from "react";
import { Button, Col, Flex, Input, Modal, Row, Spin, Form } from "antd";

import CategoryCard from "../components/card/CategoryCard";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCategories } from "../redux/slices/categorySlice";
import { CategoryType } from "../types/category";
import request from "../server";

const CategoriesPage = () => {
  const { categories, loading } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCategories());
    nameRef.current?.focus();
  }, [dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    form.resetFields();
    nameRef.current?.focus();
  };

  const handleOk = async () => {
    try {
      const values: CategoryType = await form.validateFields();
      if (selected === null) {
        await request.post("category", values);
      } else {
        await request.put(`category/${selected}`, values);
      }
      closeModal();
      dispatch(getCategories());
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (id: string) => {
    setSelected(id);
    try {
      setIsModalOpen(true);
      let { data } = await request.get(`/category/${id}`);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  };


  const deleteCategory = async (id: string) => {
    try {
      await request.delete(`/category/${id}`);
      dispatch(getCategories());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <Flex justify="space-between">
        <h1>CategoriesPage {categories.length}</h1>
        <input className="ant-input" type="text" ref={nameRef} />
        <Button onClick={showModal} className="primary">
          Add
        </Button>
      </Flex>
      <Spin spinning={loading}>
        <Row gutter={8}>
          {categories.map((category) => (
            <Col
              style={{ marginBottom: "10px" }}
              key={category.id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <CategoryCard {...category} editCategory={editCategory} deleteCategory={deleteCategory} />
            </Col>
          ))}
        </Row>
      </Spin>
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleOk}
        title="Basic Modal"
      >
        <Form
          name="category"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          autoComplete="off"
        >
          <Form.Item<CategoryType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CategoryType>
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
