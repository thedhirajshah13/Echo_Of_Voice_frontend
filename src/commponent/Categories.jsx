import React from "react";
import { Category } from "../Category.js";
import { Link } from "react-router-dom";
import "./categories.css";

const Categories = () => {
  return (
    <>
      <div className="categories">
        <Link to="/createpost">
          <button>+ Create Blog</button>
        </Link>

        <table>
          <tbody>
            {Category.map((cate) => (
              <tr key={cate.id}>
                <td style={{ borderBottom: "1px solid black" }}>
                  {cate.categories}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Categories;
