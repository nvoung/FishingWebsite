// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

// function Home({ catalog, filteredCatalog, setFilteredCatalog, addToCart, removeFromCart, howManyofThis, cartTotal }) {
//   return (
//     <div className="row">
//       {filteredCatalog.map((product) => (
//         <div key={product.id} className="col-md-4">
//           <div className="card mb-4">
//             <Link to={`/product/${product.id}`}>
//               <img
//                 src={product.image}
//                 className="card-img-top"
//                 style={{ width: "150px", margin: "auto", paddingTop: "20px" }}
//                 alt={product.title}
//               />
//             </Link>
//             <div className="card-body">
//               <h5 className="card-title">{product.title}</h5>
//               <p className="card-text">
//                 <strong>Price:</strong> ${product.price} <br />
//                 <strong>Category:</strong> {product.category} <br />
//                 <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
//               </p>
//               <div className="d-flex justify-content-between align-items-center">
//                 <Button variant="light" onClick={() => removeFromCart(product)}>-</Button>
//                 <span>{howManyofThis(product.id)}</span>
//                 <Button variant="light" onClick={() => addToCart(product)}>+</Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;
