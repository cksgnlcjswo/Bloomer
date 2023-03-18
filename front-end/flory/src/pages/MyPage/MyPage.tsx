import React from "react";
import { SMain } from "./styles";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BasicTabs from "../../components/common/Tabs/BasicTabs";
import BasicModal from "../../components/User/UserLoginErrorModal/UserLoginErrorModal";

const MyPage = () => {
  const onClick = () => {};

  return (
    <SMain>
      <div className="header">
        <div className="inner-header flex"></div>
      </div>
      {/* 뒤로 가기 아이콘 */}
      <FontAwesomeIcon
        className="back-icon"
        onClick={onClick}
        icon={faArrowLeft}
      />

      <BasicModal modalButton={<button>모달 열기</button>}>
        <h3>그룹 설정</h3>
      </BasicModal>

      <BasicTabs
        tabs={[
          {
            label: "나의 감정 분포",
            panel: <div>나의 감정 분포 내용</div>,
          },
          { label: "그룹 목록 보기", panel: <div>그룹 목록 보기 내용</div> },
        ]}
      />
    </SMain>
  );
};

export default MyPage;
