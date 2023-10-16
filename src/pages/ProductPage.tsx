/* eslint-disable prefer-const */
import { useEffect, useRef, useState } from "react";
import { Button, Col, Flex, Input, Modal, Row, Spin, Form } from "antd";


import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ProductType } from "../types/product";
import request from "../server";
import { useParams } from "react-router-dom";
import ProductCard from "../components/card/ProductCrad";
import { getProduct } from "../redux/slices/productSlice";

const ProductPage = () => {
  const { product, loading } = useAppSelector((state) => state.product);
  const params = useParams();
  const [ids, setIds] = useState()


  const dispatch = useAppDispatch();



  const nameRef = useRef<HTMLInputElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setIds(params.id)
    dispatch(getProduct(ids));
    nameRef.current?.focus();
  }, [dispatch, ids]);

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
      const values: ProductType = await form.validateFields();
      if (selected === null) {
        await request.post(`/category/${params.id}/product`, values);
      } else {
        await request.put(`/category/${params.id}/product/${selected}`, values);
      }
      dispatch(getProduct(ids));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (id: string) => {
    setSelected(id);
    try {
      setIsModalOpen(true);
      let { data } = await request.get(`/category/${params.id}/product/${id}`);
      form.setFieldsValue(data);
      dispatch(getProduct(ids));
    } catch (err) {
      console.log(err);
    }
  };


  const deleteCategory = async (id: string) => {

    try {
      await request.delete(`/category/${params.id}/product/${id}`);
      dispatch(getProduct(ids));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <Flex justify="space-between">
        <h1>ProductPage {product.length}</h1>
        <input className="ant-input" type="text" ref={nameRef} />
        <Button onClick={showModal} className="primary">
          Add
        </Button>
      </Flex>
      <Spin spinning={loading}>
        <Row gutter={8}>
          {product.map((category) => (
            <Col
              style={{ marginBottom: "10px" }}
              key={category.id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <ProductCard {...category} editCategory={editCategory} deleteCategory={deleteCategory} />
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
          <Form.Item<ProductType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ProductType>
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

export default ProductPage;
