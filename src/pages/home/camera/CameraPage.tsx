import styled from "@emotion/styled";
import { Camera } from "react-camera-pro";
import { useState, useRef, useEffect } from "react";

import { dataURLtoFile } from "@/configs";

const CameraPage = () => {
  const camera = useRef<{
    width: string;
    height: string;
    takePhoto: () => React.SetStateAction<null>;
  }>(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image) {
      const formData = new FormData();
      formData.append("multipartFile", dataURLtoFile(image, "image"));
      //upload(formData);
    }
  }, [image]);

  return (
    <>
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
        <Camera
          ref={camera}
          errorMessages={{
            noCameraAccessible:
              "No camera device accessible. Please connect your camera or try a different browser.",
            permissionDenied:
              "Permission denied. Please refresh and give camera permission.",
            switchCamera:
              "It is not possible to switch camera to different one because there is only one video device accessible.",
            canvas: "Canvas is not supported.",
          }}
        />
        <ScanSubmitButton
          onClick={() => {
            setImage(camera.current!.takePhoto());
          }}
        >
          전송하기
        </ScanSubmitButton>
      </CameraContainer>
    </>
  );
};

const CameraContainer = styled.div`
  background-color: red;
  height: 800px;
  div {
    position: absolute;

    top: 42px;

    width: 100%;
    height: 617px;

    z-index: -1;
  }
`;

const Target1 = styled.div`
  position: absolute;
  top: 120px;
  left: 37px;
`;

const Target2 = styled.div`
  position: absolute;
  top: 120px;
  right: 37px;
`;

const Target3 = styled.div`
  position: absolute;
  top: 620px;
  right: 37px;
`;

const Target4 = styled.div`
  position: absolute;
  top: 620px;
  left: 37px;
`;

const SubmitButton = styled.button`
  display: flex;
  width: 300px;
  height: 50px;

  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  font-size: 16px;
  font-weight: bold;

  text-align: center;

  border: 0px;
  border-radius: 12px;
  background: #98fb98;

  margin-top: 15px;
  margin-bottom: 25px;
`;

const ScanSubmitButton = styled(SubmitButton)`
  position: absolute;

  width: 205px;
  height: 35px;
  border-radius: 12px;

  bottom: 10%;
  left: 50%;
  transform: translate(-50%);
`;

export default CameraPage;
