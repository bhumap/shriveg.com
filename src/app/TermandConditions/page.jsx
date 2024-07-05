import React from "react";
import "@/Style/style.css";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="about-banner">
        <h1 className="about-shrveg">TERMS & CONDITIONS</h1>
        <div className="about-banner-img about-banner-img2">
          <p>
            Welcome to <Link href="https://www.shriveg.com/">shriveg.com</Link>!
            We are thrilled to have you here and hope you enjoy shopping with
            us. By accessing or using our website, you agree to comply with and
            be bound by the following terms and conditions. Please take a few
            minutes to read them carefully.
          </p>

          <h4>1. Acceptance of Terms</h4>
          <p>
            By using <Link href="https://www.shriveg.com/">shriveg.com</Link>,
            you agree to these terms and conditions. We reserve the right to
            change these terms at any time, and such changes will be effective
            immediately upon being posted on the site. It&apos;s a good idea to check
            this page regularly to stay informed about any updates.
          </p>

          <h4>2. Eligibility to Use Our Site</h4>
          <p>
            To shop with us, you must be at least 18 years old and capable of
            forming legally binding contracts under applicable law. If you are
            under 18, you may use our services only with the involvement of a
            parent or guardian.{" "}
            <Link href="https://www.shriveg.com/">shriveg.com</Link> reserves
            the right to terminate your access if it discovers you do not meet
            these criteria.
          </p>

          <h4>3. Your Account</h4>
          <p>
            While you can browse{" "}
            <Link href="https://www.shriveg.com/">shriveg.com</Link> without
            creating an account, registering with us will make your shopping
            experience more enjoyable. As a registered user, you&apos;re responsible
            for keeping your account information secure and up-to-date. Please
            make sure to use a strong password and protect your account from
            unauthorized access.
          </p>

          <h4>4. Electronic Communications</h4>
          <p>
            When you use our site or send emails to us, you are communicating
            with us electronically. You consent to receive communications from
            us electronically. We will communicate with you by email or by
            posting notices on the site. You agree that all agreements, notices,
            disclosures, and other communications that we provide to you
            electronically satisfy any legal requirement that such
            communications be in writing.
          </p>

          <h4>5. User Reviews and Comments</h4>
          <p>
            We love hearing from you! When you submit reviews, comments, or any
            other content, you&apos;re giving us the right to use it. This means we
            can use, modify, and share your content in any way we see fit.
            Remember, your feedback helps us improve and grow.
          </p>

          <h4>6. Product Information</h4>
          <p>
            We strive to provide accurate and up-to-date information about our
            products. However, we do not guarantee that the product
            descriptions, images, or other content on our site are entirely
            accurate, complete, reliable, current, or error-free. If you find a
            product is not as described, your sole remedy is to return it in
            unused condition.
          </p>

          <h4>7. Pricing</h4>
          <p>
            All prices listed on our site are subject to change without notice.
            We make every effort to ensure that the prices are accurate, but
            errors may occur. If we discover an error in the price of any item
            you have ordered, we will inform you as soon as possible and give
            you the option of reconfirming your order at the correct price or
            canceling it. If we are unable to contact you, we will treat the
            order as canceled.
          </p>

          <h4>8. Payment</h4>
          <p>
            We accept various forms of payment, including credit/debit cards,
            net banking, and digital wallets. By submitting an order, you
            authorize us to charge your selected payment method. We take
            reasonable care to make our site secure, but in the absence of
            negligence on our part, we will not be held liable for any loss you
            may suffer if a third party procures unauthorized access to any data
            you provide when accessing or ordering from our site.
          </p>

          <h4>9. Shipping and Delivery</h4>
          <p>
            We aim to deliver your orders as quickly as possible. Shipping times
            may vary based on your location and the availability of products. We
            are not responsible for delays caused by unforeseen circumstances,
            such as natural disasters, strikes, or transportation issues. For
            detailed information on our shipping and delivery policies, please
            visit our{" "}
            <Link href="https://www.shriveg.com/shipping-policy">
              Shipping Policy
            </Link>{" "}
            page.
          </p>

          <h4>10. Returns and Cancellations</h4>
          <p>
            If you are not satisfied with your purchase, you can return the
            product in its original condition within the specified return
            period. Please refer to our{" "}
            <Link href="https://www.shriveg.com/return-policy">
              Return Policy
            </Link>{" "}
            for more details. Note that certain products may not be eligible for
            return due to hygiene or other reasons.
          </p>

          <h4>11. Use of Platform Services</h4>
          <p>
            Our platform offers various services to enhance your shopping
            experience. This includes personalized recommendations,
            notifications about offers, and customer support. By using these
            services, you agree to receive notifications and updates from us. We
            strive to make these services beneficial for you, but you can opt
            out of non-essential notifications anytime through your account
            settings.
          </p>

          <h4>12. Limitation of Liability</h4>
          <p>
            To the fullest extent permitted by law,{" "}
            <Link href="https://www.shriveg.com/">shriveg.com</Link> shall not
            be liable for any indirect, incidental, special, or consequential
            damages arising out of or in connection with the use of our site or
            the purchase of products from us.
          </p>

          <h4>13. Governing Law</h4>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of India. Any disputes arising out of or in
            connection with these terms shall be subject to the exclusive
            jurisdiction of the courts of [Your City].
          </p>

          <h4>14. Contact Us</h4>
          <p>
            If you have any questions or concerns about these terms and
            conditions, please feel free to reach out to us at:
          </p>
          <div className="contact-us-section">
            <p>
              <strong>Shriveg</strong>
            </p>
            <p>Company Address</p>
            <p>000 000 000</p>
            <p>
              <a href="mailto:shriveg@gmail.com">shriveg@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
