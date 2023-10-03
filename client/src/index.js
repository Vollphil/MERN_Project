import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import Companies from "./Pages/Companies"
import SearchEmployeeName from "./Pages/SearchEmployeeName";
import AddSalary from "./Pages/Salary";
import FavortieBook from "./Pages/FavoriteBook";
import ArmorUpdate from "./Pages/ArmorCreate";
import UpdateArmor from "./Pages/UpdateArmor";
import CreateNotes from "./Pages/Notes";
import AddWorkLogEntries from "./Pages/WorkLog";
import WorklogEntries from "./Pages/WorkLogEntries";
import CreateMeal from "./Pages/CreateMeal";


import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import EquipmentCreator from "./Pages/EquipmentCreator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
      path:"/armorUpdate/:id",
      element: <UpdateArmor />
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path:"/EquipmentCreate",
        element: <EquipmentCreator />

      },
      {
      path:"/Companies",
      element:<Companies />
      },
      {
        path:"/SearchEmployeeName",
        element:<SearchEmployeeName />
      },
      {
        path:"/AddSalary",
        element:<AddSalary />
      },
      {
      path:"/favortieBook",
      element: <FavortieBook /> 
      },
      {
        path:"/Armors",
        element:<ArmorUpdate />
      },
      {
        path:"/employee/:employeeId/notes",
        element:<CreateNotes />
      },
      {
        path:"/AddWorkLog",
        element:<AddWorkLogEntries/>
      },
      {
        path:"/WorkLogEntries/:employeeId",
        element:<WorklogEntries />
      },
      {
        path:"/CreateMeal",
        element: <CreateMeal />
        
      }
     
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
