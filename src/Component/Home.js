import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  text-align: center;
  color: white;
  flex-direction: column;
  padding: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
  max-width: 600px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const HeroButton = styled(Link)`
  padding: 12px 24px;
  font-size: 1.2rem;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: white;
    color: #6a11cb;
  }
`;

const FeaturesSection = styled.div`
  padding: 50px 20px;
  text-align: center;
  background: white;
  color: black;
`;

const FeatureCard = styled.div`
  max-width: 300px;
  padding: 20px;
  margin: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TestimonialsSection = styled.div`
  background: #eee;
  padding: 50px 20px;
  text-align: center;
`;

const Testimonial = styled.p`
  font-style: italic;
  max-width: 600px;
  margin: 10px auto;
`;

const Home = () => {
  return (
    <>
      <HeroContainer>
        <HeroTitle>Welcome to TenseMap</HeroTitle>
        <HeroSubtitle>
          Master your tenses with ease and confidence.
        </HeroSubtitle>
        <ButtonContainer>
          <HeroButton to="/tensemap">Explore Tense Map</HeroButton>
          <HeroButton to="/login_register">Get Started</HeroButton>
        </ButtonContainer>
      </HeroContainer>

      <FeaturesSection>
        <h2>Why Choose TenseMap?</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <FeatureCard>
            <h3>Interactive Learning</h3>
            <p>Engage with interactive exercises and quizzes.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>AI-Powered Feedback</h3>
            <p>Get instant feedback and suggestions for improvement.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Community Support</h3>
            <p>Connect with a global community of learners.</p>
          </FeatureCard>
        </div>
      </FeaturesSection>

      <TestimonialsSection>
        <h2>What Our Users Say</h2>
        <Testimonial>
          "TenseMap made learning English tenses so easy and fun!" - Sarah L.
        </Testimonial>
        <Testimonial>
          "A must-have tool for anyone looking to improve their grammar." - Mark
          T.
        </Testimonial>
        <Testimonial>
          "Highly recommend this platform for all levels!" - Emily R.
        </Testimonial>
      </TestimonialsSection>
    </>
  );
};

export default Home;
