import React from "react";
import styled from "styled-components";
import { projects } from "../../data/constants"; 
import ProjectCard from "../Cards/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Description = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  margin-top: 2.5rem;
`;

const Projects = () => (
  <Container id="projects">
    <Wrapper>
      <Title>Projects</Title>
      <Description>Here are some of my Projects.</Description>
      <CardContainer>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </CardContainer>
    </Wrapper>
  </Container>
);

export default Projects;
