import { ChildrenType } from "../../types/children";

const Layout = ({ children }: ChildrenType) => {
  return (
    <div>
      <header></header>
      {children}
      <footer></footer>
    </div>
  );
};

export default Layout;
