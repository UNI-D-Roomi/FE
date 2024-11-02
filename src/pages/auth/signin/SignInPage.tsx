import styled from "@emotion/styled";
import { useNavigate } from "react-router";

import { useForm, SubmitHandler } from "react-hook-form";
import { AuthService } from "@/services/AuthService";
import { PAGE_URL } from "@/configs";
import { BlueButton, OrangeButton, Title } from "@/entities";

interface IFormInput {
  loginId: string;
  password: string;
}

const SignInPage = () => {
  const { signin } = AuthService();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signin({
      loginId: data.loginId,
      password: data.password,
    }).then(() => navigate(PAGE_URL.Home));
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <WidTitle>아이디와 비밀번호로</WidTitle>
      <WidTitle>로그인해주세요.</WidTitle>
      <div style={{ height: "50px" }}></div>
      <InputTitle>아이디</InputTitle>
      <Input
        placeholder="ID"
        {...register("loginId", { required: true, maxLength: 30 })}
      />
      <InputTitle>비밀번호</InputTitle>
      <Input
        placeholder="Password"
        type="password"
        {...register("password", { required: true, maxLength: 30 })}
      />
      <div style={{ height: "20px" }}></div>
      <BlueButton type="submit">로그인</BlueButton>
      <OrangeButton>회원가입</OrangeButton>
    </Container>
  );
};

const WidTitle = styled(Title)`
  width: 332px;
  font-weight: bold;
`;

const InputTitle = styled.span`
  width: 332px;
  font-size: 14px;

  margin-top: 7px;

  color: #c1c1c1;
`;

const Container = styled.form`
  margin-top: 60px;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;

  > button {
    margin-top: 6px;
  }
`;

const Input = styled.input`
  width: 332px;
  height: 50px;

  font-size: 19px;

  border: 2px solid #c1c1c1;
  border-radius: 7px;

  padding-left: 10px;

  ::placeholder {
    font-size: 17px;
    color: #c1c1c1;
  }
`;

export default SignInPage;
