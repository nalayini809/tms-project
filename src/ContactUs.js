import React, { useState } from "react";
import styled from "styled-components";
import { FaFacebook, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  color: white;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const ContentSection = styled.div`
  flex: 1.5;
  min-width: 400px;
  padding: 40px;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 15px;
`;

const InfoSection = styled.div`
  margin-top: 20px;
`;

const InfoItem = styled.p`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  height: 120px;
  width: 100%;
`;

const Button = styled.button`
  background: #ff9800;
  color: white;
  font-size: 18px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #e68900;
  }
`;

const SocialLinks = styled.div`
  margin-top: 20px;
  font-size: 24px;
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  color: white;
  transition: color 0.3s;

  &:hover {
    color: #ff9800;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container>
      <Wrapper>
       
        <ImageSection>
          <Image
            src="https://img.freepik.com/free-vector/contact-us-concept-landing-page_52683-12860.jpg"
            alt="Contact Us" height ="400px" width = '900px'
          />
        </ImageSection>

        
        <ContentSection>
          <Title>Contact Us</Title>
          <Paragraph>We are here to assist you! Reach out via the form below or through our contact details.</Paragraph>

          <InfoSection>
            <InfoItem><FaMapMarkerAlt /> Address: 123 Task Street, Productivity City</InfoItem>
            <InfoItem><FaPhone /> Phone: +93540 88855</InfoItem>
            <InfoItem><FaEnvelope /> Email: support@taskmanager.com</InfoItem>
            <InfoItem><FaClock /> Business Hours: Mon-Fri, 9 AM - 6 PM</InfoItem>
          </InfoSection>

          <ContactForm onSubmit={handleSubmit}>
            <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            <TextArea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
            <Button type="submit">Send Message</Button>
          </ContactForm>

          <SocialLinks>
            <SocialIcon href="https://facebook.com" target="_blank"><FaFacebook /></SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank"><FaTwitter /></SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank"><FaLinkedin /></SocialIcon>
          </SocialLinks>
        </ContentSection>
      </Wrapper>
    </Container>
  );
};

export default Contact;
