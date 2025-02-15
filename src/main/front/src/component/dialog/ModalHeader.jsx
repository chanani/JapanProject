import CloseIcon from "@/assets/svg/icon_close.svg?react";

// * TopSubTitle 대신 사용 - 모달 헤더 부분
const ModalHeader = ({modalTitle = "모달 제목", onClose, hasBackground = false}) => {
  return (
    <div className={`ModalHeader ${hasBackground ? "hasBackground" : ""}`}>
      <div className="title">{modalTitle}</div>
      {/* close icon */}
      <button className="btn_close" onClick={onClose}>
        <CloseIcon width={"24px"} height={"24px"} stroke={hasBackground ? "#ffffff" : "#9A9EA7"} />
      </button>
    </div>
  );
};

export default ModalHeader;
