import React from "react";

function About() {
  return (
    <div className="about-page" style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)', 
        maxWidth: '800px', 
        margin: '40px auto', 
        textAlign: 'center' 
    }}>
      <h2 style={{ color: '#e91e63', marginBottom: '20px', fontSize: '32px' }}>About Radha Beauty Co</h2>
      <p style={{ color: '#555', lineHeight: '1.8', fontSize: '18px', marginBottom: '20px' }}>
        Welcome to <strong>Radha Beauty Co</strong>, your ultimate destination for top-tier cosmetics and skincare.
        Founded with a passion for helping everyone feel confident in their own skin, we curate only the best 
        products from trusted brands worldwide.
      </p>
      <p style={{ color: '#555', lineHeight: '1.8', fontSize: '18px' }}>
        Whether you are looking for the perfect matte lipstick, a glowing highlighter, or a soothing daily cleanser, 
        we have you covered. Thank you for shopping with us and embracing your unique beauty! 💄✨
      </p>
    </div>
  );
}

export default About;