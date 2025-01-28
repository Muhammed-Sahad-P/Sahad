import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 5;
  align-items: center;
  padding: 40px 0px 80px 0px;
  @media (max-width: 960px) {
    padding: 20px 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1350px;
  padding: 80px 20px;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 40px 10px;
    gap: 16px;
  }
`;

const Title = styled.div`
  font-size: 2.5rem;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 2rem;
  }
`;

const Desc = styled.div`
  font-size: 1rem;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    gap: 16px;
  }
`;

const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: #333;
    color: white;
    font-size: 16px;
    border-radius: 10px;
    padding: 12px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .Toastify__toast--success {
    background: linear-gradient(
        38.73deg,
        rgba(204, 0, 187, 0.15) 0%,
        rgba(201, 32, 184, 0) 50%
      ),
      linear-gradient(
        141.27deg,
        rgba(0, 70, 209, 0) 50%,
        rgba(0, 70, 209, 0.15) 100%
      );
    color: white;
  }

  .Toastify__toast--error {
    background-color: #f44336;
    color: white;
  }

  .Toastify__toast--info {
    background-color: #2196f3;
    color: white;
  }

  .Toastify__toast--warning {
    background-color: #ff9800;
    color: white;
  }

  .Toastify__toast-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #854ce6;
  color: white;
  border-radius: 5px;
  outline: none;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  &::placeholder {
    color: rgb(152, 150, 155);
  }

  &:focus {
    border-color: #854ce6;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #854ce6;
  border-radius: 5px;
  color: white;
  outline: none;
  resize: vertical;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;

  &:focus {
    border-color: #854ce6;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  border: 1.8px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  background-color: transparent;
  border-radius: 10px;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px;
  }
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceID = "service_2gj7qk5";
    const templateID = "template_zgikncf";
    const publicKey = "1wc00cW7WhwFxJxs-";

    if (formData.name && formData.email && formData.message) {
      emailjs
        .send(
          serviceID,
          templateID,
          {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
          publicKey
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            toast.success("Message Sent Successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });
          },
          (error) => {
            console.error("FAILED...", error);
            toast.error("Failed to send the message. Please try again.");
          }
        );
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact Me</Title>
        <Desc>
          I would love to hear from you! Please fill out the form below and I
          will get back to you as soon as possible.
        </Desc>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <TextArea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </StyledForm>
      </Wrapper>
      <CustomToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
};

export default ContactForm;
