import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  color: white;
  padding: 40px;
  overflow: hidden;
`;
const Navbar = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(to right, rgb(31, 24, 227), #9333ea);
  padding: 15px 0;
`;

const NavButton = styled.button`
  background: transparent;
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 10px;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding-top: 20px;
`;

const Content = styled.div`max-width: 45%;`;

const Heading = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
font-size: 18px; 
margin-bottom: 16px;`;

const List = styled.ul`
font-size: 18px; 
margin-bottom: 16px; 
padding-left: 20px;`;

const ListItem = styled.li`margin-bottom: 8px;`;

const Button = styled.button`
  background-color: rgb(221, 15, 135);
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 24px;
  
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #16a34a;
    transform: scale(1.05);
  }
`;

const CarouselContainer = styled.div`
width: 50%; `;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 400px;
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;

const FeatureText = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`;

const FeatureImage = styled.img`
  width: auto;
  max-width: 80%;
  height: 300px;
  object-fit: contain;
  
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    const isAuthenticated = localStorage.getItem("user"); 
    if (isAuthenticated) {
      navigate("/dashboard"); 
    } else {
      navigate("/login"); 
    }
  };

  const features = [
    {
      text: "✅ Smart Task Scheduling",
      img: "https://static.vecteezy.com/system/resources/previews/028/130/680/non_2x/concept-of-effective-time-management-with-task-schedule-planning-completing-work-and-tasks-on-time-or-work-efficiently-with-high-productivity-smart-businessman-flat-illustration-vector.jpg",
    },
    {
      text: "✅ Task Categories for Better Organization",
      img: "https://img.freepik.com/premium-vector/collection-people-successfully-organizing-their-tasks-appointments-set-scenes-with-efficient-effective-time-management-multitasking-work-flat-cartoon-vector-illustration_118813-35.jpg",
    },
    {
      text: "✅ Task Progress Tracking",
      img: "https://media.licdn.com/dms/image/v2/D4E12AQGPQ_ufluY8hQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1689299959631?e=2147483647&v=beta&t=nqMQPr0YVqnFwRwwga-M10BsRmXVmMnOnkqXtw8i0LE",
    },
    {
      text: "✅ Recurring Tasks & Reminders",
      img: "https://reliex.com/blog/wp-content/uploads/2024/02/image-20.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <HomeContainer>

      <Navbar>
        <NavButton onClick={() => navigate("/")}>Home</NavButton>
        <NavButton onClick={() => navigate("/about")}>About</NavButton>
        <NavButton onClick={() => navigate("/contact")}>Contact Us</NavButton>
        <NavButton onClick={() => navigate("/services")}>Services</NavButton>
        <NavButton onClick={() => navigate("/help")}>Help</NavButton>
      </Navbar>

    
      <ContentContainer>
        <Content>
          <Heading>PLAN YOUR DAY</Heading>
          <Paragraph>
            Stay organized and boost your productivity with our smart task
            management system. Create, manage, and track your daily tasks with ease.
          </Paragraph>
          <Paragraph>
            Our platform helps you break down your goals into achievable tasks.
            Whether it's work, learning, or personal projects, we make it easy
            to stay on track and meet your deadlines efficiently.
          </Paragraph>
          <Paragraph>With our system, you can:</Paragraph>
          <List>
            <ListItem>📅 Plan your tasks effectively with a structured approach.</ListItem>
            <ListItem>📊 Monitor progress and adjust your workflow accordingly.</ListItem>
            <ListItem>🔔 Set reminders and notifications to stay on track.</ListItem>
            <ListItem>🤝 Collaborate with teammates and share responsibilities.</ListItem>
            <ListItem>📌 Prioritize tasks to focus on what matters most.</ListItem>
          </List>
          <Button onClick={handleGetStarted}>Get Started</Button>
        </Content>

        <CarouselContainer>
          <Slider {...settings}>
            {features.map((feature, index) => (
              <Slide key={index}>
                <FeatureText>{feature.text}</FeatureText>
                <FeatureImage src={feature.img} alt="Feature" />
              </Slide>
            ))}
          </Slider>
        </CarouselContainer>
      </ContentContainer>
    </HomeContainer>
  );
};

export default HomePage;
