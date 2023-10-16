import { Button, Card } from "antd";
import { ProductType } from "../../types/product";
import { message, Popconfirm } from 'antd';

const { Meta } = Card;


const ProductCard = ({ name, image, id, description, discount, price, editCategory, deleteCategory }: ProductType) => {
  const confirm = () => {
    deleteCategory(id)
    message.success('Click on Yes');
  };

  const cancel = () => {
    message.error('Click on No');
  };
  return (
    <Card hoverable cover={<img height={200} src={image} alt={name} />}>
      <Meta title={name} style={{ marginBottom: "20px" }} />
      <p>{description}</p>
      <p>{discount}</p>
      <p>{price}</p>
      <Button onClick={() => editCategory(id)} >Edit</Button>
      <Popconfirm

        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    </Card>
  );
};

export default ProductCard;
