import "./style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardData from "./CardData";
import { useState } from "react";
import {addToCart} from '../redux/feature/cartSlice';
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';

const Home = () => {
  const [cartData, setCartData] = useState(CardData);
  const dispatch = useDispatch()


  //addtocart
  const send = (e)=>{
      dispatch(addToCart(e));
      toast.success("Item added In your cart");
  }
  return (
    <>
      <section className="item_section mt-4 container">
        <h2 className="px-4" style={{ fontWeight: 400, color: "gray" }}>
          Restaurant In Kolkata Open Now !!
        </h2>
        <div className="d-flex justify-content-between row mt-2 align-items-center">
          {cartData.map((Element, index) => {
            return (
              <>
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className="hove mt-2 mb-4"
                >
                  <Card.Img src={Element.imgdata} variant="top" className="cd" />
                  <div className="card_body">
                    <div className="upper_data d-flex justify-content-between align-items-center">
                      <h4 className="mt-2">{Element.dish}</h4>
                      <span>{Element.rating}&nbsp;★</span>
                    </div>
                    <div className="lower_data d-flex justify-content-between">
                      <h5>{Element.address}</h5>
                      <span>{Element.price} ₹</span>
                    </div>
                    <div className="extra"></div>
                    <div className="last_data d-flex justify-content-between mt-2 align-items-center">
                      <img src={Element.arrimg} className="limg" alt="" />
                      <Button
                      
                        style={{
                          width: "150px",
                          background: "#ff3054db",
                          border: "none",
                        }}
                        onClick={()=> send(Element)}
                        variant="outline-light"
                        className="mt-2 mb-2"
                      >
                        ADD TO CART
                      </Button>
                      <img src={Element.delimg} className="laimg" alt="" />
                    </div>
                  </div>
                </Card>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
