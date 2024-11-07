import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye } from "react-icons/ai";
import Modal from "../Modals/Modal";

const Card = styled.div`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 2px 8px;
  border-radius: 10px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled(AiOutlineEye)`
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;

const Button = styled.button`
  width: 48%;
  padding: 10px;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text_black};
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.8s ease-in-out;
  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleButtonClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <Card>
        <Image
          src={require(`../../images/${project.image}`)}
          alt={project.title}
        />
        <Tags>
          {project.tags?.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
        <Details>
          <Title>
            {project.title}
            <Icon onClick={handleModalToggle} />
          </Title>
          <Description>{project.shortDesc}</Description>
        </Details>
        <Members>
          {project.member?.map((member, index) => (
            <Avatar key={index} src={member.img} alt="member avatar" />
          ))}
        </Members>
        <ButtonContainer>
          <Button onClick={() => handleButtonClick(project.webapp)}>
            Live
          </Button>
          <Button onClick={() => handleButtonClick(project.github)}>
            Code
          </Button>
        </ButtonContainer>
      </Card>

      {isModalOpen && <Modal project={project} onClose={handleModalToggle} />}
    </>
  );
};

export default ProjectCard;
