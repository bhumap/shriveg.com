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
            Thank you for accessing/shopping at{" "}
            <Link href="https://www.shriveg.com/">shriveg.com</Link>. This site
            is owned by Shriveg (hereinafter referred to as
            <Link href="https://www.shriveg.com/">shriveg.com</Link>). By
            accessing, shopping on this site, you indicate your unconditional
            acceptance of these terms & conditions. We reserve this right, in
            our sole discretion, to update or revise these terms & conditions.
            Continued use of the site following the posting of any changes to
            the terms & conditions, constitutes your acceptance of those
            changes. At
            <Link href="https://www.shriveg.com/">shriveg.com</Link>, we try our
            best to create a space where you can explore and shop for all your
            favorite things in a safe and secure environment. All products and
            information displayed on{" "}
            <Link href="https://www.shriveg.com/">shriveg.com</Link> constitutes
            an invitation to offer.{" "}
            <Link href="https://www.shriveg.com/">shriveg.com</Link> reserves
            the right to accept or reject your offer. Your order for purchase,
            constitutes your offer which shall be subject to the terms and
            conditions as listed below.
          </p>
          <h4>1. Eligibility to use our site</h4>
          <p>
            Use of the Site is available only to persons who can legally enter
            into contracts under applicable laws. Persons who are incompetent to
            contract, within the meaning of the Indian Contract Act, 1872
            including un-discharged insolvents etc. are not eligible to use the
            Site. <Link href="https://www.shriveg.com/">shriveg.com</Link>{" "}
            reserves the right to terminate your access to the Site if it
            discovers that you are under the age of 18 years or suffers from any
            other disability, as recognized under Indian Contract Act, 1872.
          </p>

          <h4>2. Membership</h4>
          <p>
            Although it's not essential to have an account to shop with
            <Link href="https://www.shriveg.com/">shriveg.com</Link>, you can
            shop as a guest. As a member, you agree to provide true, accurate,
            current, and complete information about yourself as prompted by the
            site's registration form. Registration where prohibited under any
            law shall be void.
            <Link href="https://www.shriveg.com/">shriveg.com</Link> reserves
            the right to revoke or terminate your registration for any reason at
            any time, without notice.
          </p>

          <h4>3. Electronic Communications</h4>
          <p>
            When you use the site or send emails or other data, information or
            communicate to us, you agree and understand that you are
            communicating with us electronically and give your consent to
            receive communications electronically from us periodically, when
            required.
          </p>

          <h4>3. Electronic Communications</h4>
          <p>
            All reviews, comments, feedback, postcards, suggestions, ideas, and
            other submissions disclosed, submitted or offered to{" "}
            <Link href="https://www.shriveg.com/">shriveg.com</Link> directly or
            otherwise disclosed, submitted or offered in connection with your
            use of this Site (collectively referred to Comments) will remain
            <Link href="https://www.shriveg.com/">shriveg.com</Link> property.
            Such disclosure, submission or offer of any comments shall
            constitute an assignment to{" "}
            <Link href="https://www.shriveg.com/">shriveg.com</Link> of all
            worldwide rights, titles and interests in all copyrights and other
            intellectual properties in the comments,thus, it exclusively owns
            all such rights, titles and interests and shall not be limited in
            any way in its use, commercial or otherwise.{" "}
            <Link href="https://www.shriveg.com/">shriveg.com</Link>
            will be entitled to use, reproduce, disclose, modify, adapt, create
            derivative works from, publish, display and distribute any
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
