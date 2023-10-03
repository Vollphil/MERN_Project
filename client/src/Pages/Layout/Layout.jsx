import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li className="grow">
          <Link to="/Companies">Companies</Link>

        </li>

        <li className="grow">
          <Link to="/AddSalary">Add Salary</Link>

        </li>
        <li className="grow">
          <Link to="/Armors">Armor</Link>
        </li>
        <li className="grow">
          <Link to="/SearchEmployeeName">Search Employees</Link>
        </li>
        <li className="grow">
          <Link to="/favortieBook">Favorite Book</Link>
        </li>
        <li className="grow">
          <Link to="/AddWorkLog">WorkLog</Link>
        </li>
        <li className="grow">
          <Link to="/CreateMeal">Create Meal</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li className="grow">
          <Link to="/EquipmentCreate">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
        
      
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
