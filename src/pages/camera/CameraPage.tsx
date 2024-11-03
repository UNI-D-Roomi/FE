import styled from "@emotion/styled";
import { Camera } from "react-camera-pro";
import { useState, useRef, useEffect } from "react";
import CameraIcon from "@mui/icons-material/Camera";
import { useLocation, useNavigate } from "react-router-dom";

import { RedButton, Loading } from "@/entities";
import { UserService } from "@/services/UserService";
import { dataURLtoFile, PAGE_URL } from "@/configs";

const CameraPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { upload, startDish, endDish, endRoom, setImg } = UserService();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: "environment" } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let stream = videoRef.current.srcObject;
        let tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캡처한 이미지를 데이터 URL로 변환하여 상태에 저장
      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl);

      // 데이터 URL을 파일로 변환하고 서버에 전송
      const file = dataURLtoFile(imageDataUrl, "captured-image.png");
      uploadToServer(file);
    }
  };

  // 데이터 URL을 파일로 변환하는 함수
  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // 서버에 파일 업로드하는 함수
  const uploadToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", dataURLtoFile(file, "file"));
    upload(formData).then((res) => {
      if (location.state.mode === "BEFOREDISH")
        startDish(res).then(() => {
          navigate("/dish", { state: { stage: 2, score: 0, comment: "" } });
        });
      else if (location.state.mode === "AFTERDISH")
        endDish(res).then((res) => {
          navigate("/dish", {
            state: { stage: 3, score: res.score, comment: res.comment },
          });
        });
      else if (location.state.mode === "ROOM")
        endRoom(res).then((res) => {
          navigate("/room", {
            state: { stage: 1, score: res.score, comment: res.comment },
          });
        });
      else
        setImg(res).then(() => {
          navigate(PAGE_URL.SignIn);
        });
    });
  };

  return (
    <>
      {capturedImage ? <Loading /> : null}
      <Target1>
        <img src="/icons/target1.svg" alt="target" />
      </Target1>
      <Target2>
        <img src="/icons/target2.svg" alt="target" />
      </Target2>
      <Target3>
        <img src="/icons/target3.svg" alt="target" />
      </Target3>
      <Target4>
        <img src="/icons/target4.svg" alt="target" />
      </Target4>
      <CameraContainer>
        <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
        <SubmitButton onClick={capturePhoto}>
          <CameraIcon fontSize="large" />
        </SubmitButton>
      </CameraContainer>
    </>
  );
};

const CameraContainer = styled.div`
  height: 100%;
  video {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;

    z-index: -1;
  }
`;

const Target1 = styled.div`
  position: absolute;
  top: 50px;
  left: 37px;
`;

const Target2 = styled.div`
  position: absolute;
  top: 50px;
  right: 37px;
`;

const Target3 = styled.div`
  position: absolute;
  bottom: 120px;
  right: 37px;
`;

const Target4 = styled.div`
  position: absolute;
  bottom: 120px;
  left: 37px;
`;

const SubmitButton = styled(RedButton)`
  position: absolute;
  transform: translate(-50%, 0%);
  left: 50%;
  bottom: 30px;
`;

export default CameraPage;
