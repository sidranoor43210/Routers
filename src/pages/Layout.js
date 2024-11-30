import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
            <Link to="/">Home</Link>
         
            <Link to="/products">Products</Link>
          
            <Link to="/blogs">Blogs</Link>
          
            <Link to="/contact">Contact</Link>
          
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
