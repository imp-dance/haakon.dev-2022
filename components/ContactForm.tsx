import {
  Button,
  TextArea,
  TextInput,
  toast,
} from "@ryfylke-react/ui";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

type ContactFormProps = {
  onClose: () => void;
};

type FormInputs = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm({ onClose }: ContactFormProps) {
  const [fs, setFs] = useState<FormInputs>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormInputs>({
    name: "",
    email: "",
    message: "",
  });
  const [hasSubmitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateForm = () => {
    let errorsThrown = 0;
    const newErrors = {
      ...errors,
    };
    if (fs.name.length === 0) {
      newErrors.name = "Name is required";
      errorsThrown += 1;
    } else {
      newErrors.name = "";
    }
    if (fs.email.length === 0) {
      newErrors.email = "Email is required";
      errorsThrown += 1;
    } else if (!validateEmail(fs.email)) {
      newErrors.email = "Please enter a valid email";
      errorsThrown += 1;
    } else {
      newErrors.email = "";
    }
    if (fs.message.length === 0) {
      newErrors.message = "Message is required";
      errorsThrown += 1;
    } else {
      newErrors.message = "";
    }
    setErrors(newErrors);
    return errorsThrown === 0;
  };

  useEffect(() => {
    if (hasSubmitted) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fs.name, fs.email, fs.message]);

  const register = (key: keyof FormInputs) => ({
    value: fs[key],
    onChange: (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => setFs({ ...fs, [key]: e.target.value }),
  });

  const listener = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const onSubmit = () => {
    if (!hasSubmitted) {
      setSubmitted(true);
    }
    if (validateForm()) {
      setLoading(true);
      fetch(
        "https://ewxpkphj05.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fs),
        }
      )
        .then(() => {
          setLoading(false);
          onClose();
          toast({
            text: "Message recieved!",
            kind: "success",
          });
        })
        .catch((err) => {
          setLoading(false);
          onClose();
          toast({
            text: "Message recieved!",
            kind: "success",
          });
        });
    }
  };

  useEffect(() => {
    const el = document.querySelector(".contact-first-input");
    if (el) {
      const input = el as HTMLInputElement;
      input.focus?.();
    }
    document.body.addEventListener("keydown", listener);
    return () => {
      document.body.removeEventListener("keydown", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container
      initial={{
        translateY: 50,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        ease: "anticipate",
      }}
    >
      <TextInput
        inverted
        label="Your name"
        placeholder="John Smith"
        className="contact-first-input"
        invalid={errors.name}
        disabled={loading}
        {...register("name")}
      />
      <TextInput
        inverted
        label="Your email"
        placeholder="johnsmith@gmail.com"
        invalid={errors.email}
        disabled={loading}
        {...register("email")}
      />
      <TextArea
        inverted
        label="Message"
        placeholder="I wanted to reach out to hear about..."
        invalid={errors.message}
        disabled={loading}
        {...register("message")}
      />
      <ButtonGroup>
        <Button kind="primary" onClick={onSubmit}>
          Contact me
        </Button>
        <Button kind="ghost" onClick={() => onClose()}>
          Cancel
        </Button>
      </ButtonGroup>
    </Container>
  );
}

const Container = styled(motion.div)`
  position: fixed;
  bottom: var(--s-09);
  right: var(--s-07);
  left: calc(50% - 200px);
  width: 400px;
  background: var(--c-ui-01);
  padding: var(--s-07);
  padding-bottom: var(--s-09);
  display: flex;
  flex-direction: column;
  gap: var(--s-05);
  @media screen and (max-width: 400px) {
    width: auto;
    left: 0;
    right: 0;
    top: 0;
    padding-top: var(--s-09);
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: var(--s-09) var(--s-09) 0 0;
    border-color: var(--c-ui-01) transparent transparent
      transparent;
    left: 0;
    bottom: calc(var(--s-07) * -1);
  }

  > label,
  > label > div {
    width: 100%;
  }
  textarea,
  input {
    width: 100%;
    max-width: 100%;
  }
  textarea {
    max-height: 150px;
    min-height: 100px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--s-05);
`;
