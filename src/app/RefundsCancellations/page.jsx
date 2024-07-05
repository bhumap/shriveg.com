import React from "react";
import "@/Style/style.css";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="about-banner">
        <h1 className="about-shrveg">REFUNDS & CANCELLATIONS</h1>
        <div className="about-banner-img about-banner-img2">
          <h4>Return</h4>
          <p>
            Product must be returned to us within ------- days from the date it
            has been delivered to the customer. Product must be returned with
            all tags attached in its original condition along with all packing
            material, courier receipt, invoice & other papers.
          </p>

          <h4>Refund</h4>
          <p>
            Once the Product is received to the company successfully, 
            <Link href="https://www.shriveg.com/">shriveg.com</Link> will
            instantly initiate the refund to your source account or chosen
            method of refund within --- working days.
          </p>
          <h4>Refund and Cancellation for Service Provider Company</h4>
          <p>
            Due to service providers in nature “NO REFUND”,“NO CANCELLATION”
            will be entertained once the Payment has been made.
          </p>
          <h4>Cancellation Policy</h4>
          <p>
            Please note an order can only be canceled within 24 hours of placing
            the order. Once the order is processed after 24 hours, no
            cancellation request will be entertained. However, return is possible
            for all orders/products.
          </p>
          <h4>OR</h4>
          <p>
            Customers can CANCEL order only before the Order has been
            shipped/Dispatched. After the Product/s have been shipped, The
            Customer CANNOT Cancel the Orders. However, return is possible for
            all orders/products.
          </p>
          <h4>Shipping & Delivery Policies</h4>
          <p>
            Shriveg ships its products to almost all parts of India. Orders
            placed will be shipped within 24* hrs. We ship on all days except
            Sunday and National Holidays.
          </p>
          <p>
            For all areas serviced by reputed couriers, the delivery time would
            be within 3 to 4 business days of shipping (business days exclude
            Sundays and other holidays). For other areas, the products will be
            shipped through --------------- and may take 1-2 weeks depending on
            location. At times there might be unexpected delays in the delivery
            of your order due to unavoidable and undetermined logistics
            challenges beyond our control for which Shriveg is not liable and
            would request its users to cooperate as Shriveg continuously tries
            to nought such instances. Also, Shriveg reserves the right to cancel
            your order at its sole discretion in cases where it takes longer
            than usual delivery time or the shipment is physically untraceable
            and refund the amount paid for canceled product(s) to your source
            account.
          </p>
          <div className="contact-us-section">
            <h3><b>Contact Us:</b></h3>
            <p>Shriveg</p>
            <p>Company Address</p>
            <p>000 000 000</p>
            <p><a href="mailto:shriveg@gmail.com">shriveg@gmail.com</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
