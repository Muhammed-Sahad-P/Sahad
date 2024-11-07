import React, { useEffect } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 80%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.card_light};
  border-radius: 10px;
  padding: 20px;
  position: relative;
`;

const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 28px;
  color: ${({ theme }) => theme.text_primary};
`;

const DescriptionContainer = styled.div`
  margin-top: 10px;
`;

const DescriptionTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
`;

const DescriptionList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  color: ${({ theme }) => theme.text_secondary};
`;

const DescriptionItem = styled.li`
  font-size: 16px;
  margin: 5px 0;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const Tag = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 4px 8px;
  border-radius: 8px;
`;

const Modal = ({ project, onClose }) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <ModalOverlay onClick={handleOutsideClick}>
      <ModalContent>
        <CloseIcon onClick={onClose} />
        <Title>{project.title}</Title>

        <DescriptionContainer>
          <DescriptionTitle>Project Highlights</DescriptionTitle>
          <DescriptionList>
            {project.descriptionPoints?.map((point, index) => (
              <DescriptionItem key={index}>{point}</DescriptionItem>
            ))}
          </DescriptionList>
        </DescriptionContainer>

        <Tags>
          {project.tags?.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
