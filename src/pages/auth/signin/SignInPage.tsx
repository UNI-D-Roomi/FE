import styled from "@emotion/styled";

const SignInPage = () => {
  /* const navigate = useNavigate();
  const { signin } = AuthService();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signin({
      username: data.username,
      password: data.password,
    }).then(() => navigate("/home"));
  }; */

  return <div>Signsin</div>;
};

{
  /* <SignInContainer>
      <SignInSubContainer>
        <Logo />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="아이디"
            {...register("username", { required: true, maxLength: 30 })}
          />
          <Input
            placeholder="비밀번호"
            type="password"
            {...register("password", { required: true, maxLength: 30 })}
          />
          <SignButton type="submit">로그인</SignButton>
        </Form>
        <SignupContainer>
          <Register>기업 등록</Register>|
          <SignIn onClick={() => navigate("/signup")}>회원 가입</SignIn>
        </SignupContainer>
      </SignInSubContainer>
    </SignInContainer> */
}

export default SignInPage;
