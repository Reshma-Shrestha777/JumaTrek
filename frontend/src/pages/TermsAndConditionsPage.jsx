import React from 'react';

const TermsAndConditionsPage = () => {
  const sections = [
    {
      title: "1. Booking and Payment",
      items: [
        "A deposit of 20% of the total trip cost is required to confirm your booking.",
        "Full payment must be made at least 30 days before the departure date.",
        "We accept payments via bank transfer, credit card, and other electronic payment methods.",
        "All prices are in USD unless otherwise specified and are subject to change without notice."
      ]
    },
    {
      title: "2. Cancellation Policy",
      items: [
        "Cancellation 60+ days before departure: Full refund minus $100 administration fee.",
        "Cancellation 30-59 days before departure: 50% refund of total trip cost.",
        "Cancellation less than 30 days before departure: No refund.",
        "No refunds for unused services or early departure from the trip."
      ]
    },
    {
      title: "3. Health and Fitness",
      items: [
        "Participants must be in good physical condition and disclose any medical conditions before booking.",
        "We recommend consulting with a physician before undertaking any trekking activities.",
        "Participants are responsible for bringing any necessary medications.",
        "Our guides reserve the right to require a participant to leave the trip if their health condition may affect the safety or enjoyment of others."
      ]
    },
    {
      title: "4. Travel Insurance",
      content: "Comprehensive travel insurance is mandatory for all treks. Your insurance must cover:",
      items: [
        "Emergency medical expenses (including evacuation and repatriation)",
        "Personal accident and liability",
        "Trip cancellation and curtailment",
        "Loss of or damage to personal belongings"
      ],
      footer: "Proof of insurance must be provided before the trip departure."
    },
    {
      title: "5. Itinerary Changes",
      content: "While we make every effort to follow the published itinerary, we reserve the right to modify or cancel any aspect of the trip due to:",
      items: [
        "Adverse weather conditions",
        "Political unrest or natural disasters",
        "Route conditions or other factors beyond our control",
        "Safety concerns"
      ],
      footer: "No refunds will be given for itinerary changes made for these reasons, but we will make reasonable efforts to provide suitable alternatives."
    },
    {
      title: "6. Responsibility",
      content: "JumaTrek acts only as an agent for the various independent suppliers that provide transportation, accommodation, and other services related to the tour. We are not responsible for any injury, damage, loss, accident, delay, or other irregularity which may be caused by:",
      items: [
        "The defect of any vehicle or the negligence or default of any third party",
        "Any cause beyond our direct control",
        "Loss or damage to baggage or personal effects",
        "Changes in schedules, accommodation, or itinerary"
      ]
    },
    {
      title: "7. Privacy Policy",
      items: [
        "We respect your privacy and are committed to protecting your personal information. We will only use your information to process your booking and to provide you with information about our services. We will not share your information with third parties except as necessary to provide our services."
      ]
    },
    {
      title: "8. Governing Law",
      items: [
        "These terms and conditions shall be governed by and construed in accordance with the laws of Nepal. Any disputes shall be subject to the exclusive jurisdiction of the courts of Nepal."
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa' }}>
      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: '900px', margin: '0 auto', padding: '60px 24px', width: '100%' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: '0 0 12px 0',
            letterSpacing: '-0.5px'
          }}>
            Terms & Conditions
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#999',
            margin: 0,
            fontWeight: '400'
          }}>
            Last updated: January 9, 2025
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {sections.map((section, index) => (
            <section key={index} style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '36px 40px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f0f0f0'
            }}>
              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: '0 0 20px 0',
                letterSpacing: '-0.3px'
              }}>
                {section.title}
              </h2>
              
              {section.content && (
                <p style={{
                  fontSize: '15px',
                  color: '#444',
                  lineHeight: '1.7',
                  margin: '0 0 16px 0'
                }}>
                  {section.content}
                </p>
              )}
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} style={{
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: '1.7',
                    paddingLeft: '24px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: '#999',
                      fontWeight: '600'
                    }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              {section.footer && (
                <p style={{
                  fontSize: '15px',
                  color: '#444',
                  lineHeight: '1.7',
                  margin: '16px 0 0 0',
                  fontStyle: 'italic'
                }}>
                  {section.footer}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* Agreement Statement */}
        <div style={{
          marginTop: '48px',
          padding: '32px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          borderLeft: '4px solid #1a1a1a'
        }}>
          <p style={{
            fontSize: '15px',
            color: '#444',
            lineHeight: '1.7',
            margin: 0,
            fontWeight: '500'
          }}>
            By booking with JumaTrek, you acknowledge that you have read, understood, and agreed to these terms and conditions.
          </p>
        </div>

        {/* Back to Home Button */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <a href="/" style={{
            display: 'inline-block',
            padding: '14px 32px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}>
            ← Back to Home
          </a>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditionsPage;