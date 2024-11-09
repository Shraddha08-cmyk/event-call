"use client";

import Faq from "./Faq";
import faq from "./FaqData";
import Container from "../Container/Container";

function FaqPage() {
  return (
    <>
      <div className="faq-container">
        <Container>
          <div className="accordion">
            <h3 className="accordion__heading">FAQs</h3>
            {faq.map((item) => (
              <Faq title={item.question} description={item.answer} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export default FaqPage;
