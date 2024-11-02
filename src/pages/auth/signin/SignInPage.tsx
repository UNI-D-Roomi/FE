import styled from "@emotion/styled";
import { useNavigate } from "react-router";

import { useForm, SubmitHandler } from "react-hook-form";
import { AuthService } from "@/services/AuthService";
import { PAGE_URL } from "@/configs";
import { BlueButton, Title } from "@/entities";

interface IFormInput {
  id: string;
  password: string;
}

const SignInPage = () => {
  const { signin } = AuthService();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signin({
      id: data.id,
      password: data.password,
    }).then(() => navigate(PAGE_URL.Home));
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="ID"
        {...register("id", { required: true, maxLength: 30 })}
      />
      <Input
        placeholder="Password"
        type="password"
        {...register("password", { required: true, maxLength: 30 })}
      />
      <BlueButton type="submit">로그인</BlueButton>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 332px;
  height: 50px;

  font-size: 19px;

  border: 2px solid #c1c1c1;
  border-radius: 7px;

  ::placeholder {
    font-size: 17px;
    color: #c1c1c1;
  }
`;

export default SignInPage;
