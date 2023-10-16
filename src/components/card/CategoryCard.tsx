import { Button, Card } from "antd";
import { CategoryType } from "../../types/category";
import { message, Popconfirm } from 'antd';
import { Link } from "react-router-dom";

const { Meta } = Card;

const CategoryCard = ({ name, image, id, editCategory, deleteCategory }: CategoryType) => {
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
      <Button><Link to={`/product/${id}`}>Product</Link></Button>
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

export default CategoryCard;
