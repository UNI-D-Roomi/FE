import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import CameraIcon from "@mui/icons-material/Camera";
import { useLocation, useNavigate } from "react-router-dom";

import { RedButton, Loading } from "@/entities";
import { UserService } from "@/services/UserService";
import { PAGE_URL } from "@/configs";

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
          video: { facingMode: { exact: "environment" } }, // 후면 카메라 설정
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera: ", error);
        alert("카메라 접근에 실패했습니다. 권한을 확인해주세요.");
      }
    };

    startCamera();

    // 컴포넌트가 언마운트될 때 스트림을 정리하여 카메라를 중지합니다.
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
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

      const imageDataUrl = canvas.toDataURL("image/png");
      if (!imageDataUrl || !imageDataUrl.startsWith("data:image")) {
        console.error("올바르지 않은 데이터 URL입니다:", imageDataUrl);
        return;
      }
      setCapturedImage(imageDataUrl);

      const file = dataURLtoFile(imageDataUrl, "captured-image.png");
      uploadToServer(file);
    }
  };

  const dataURLtoFile = (dataUrl, filename) => {
    try {
      const arr = dataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } catch (error) {
      console.error("파일 변환 중 오류 발생:", error);
      return null;
    }
  };

  const uploadToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
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
        <canvas ref={canvasRef} style={{ display: "none" }} />
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
