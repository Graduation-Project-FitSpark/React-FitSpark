import React, { useState } from "react";
import "./FAQcomponent-section.css";

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqData = [
    {
      question: "Faucibus dui duis feugiat tempor. Lorem interdum vive?",
      answer:
        "Korem ipsum dolor sit amet consectetur. Ut amet ipsum turpis sed arcu vitae urna nisl. Consequat erat risus sagittis diam morbi non scelerisque. Aenean arcu vivamus scelerisque risus euismod amet.",
    },
    {
      question: "Kaucibus dui duis feugiat tempor. Lorem interdum vive?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Baucibus dui duis feugiat tempor. Lorem interdum?",
      answer:
        "Pellentesque ac tristique lectus. Fusce vulputate sapien nec mi facilisis.",
    },
  ];

  return (
    <div className="faq-container-0">
      <div className="faq-container">
        <div className="faq-containerheader">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className={`faq-question ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? "l" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer ${activeIndex === index ? "show" : ""}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;
