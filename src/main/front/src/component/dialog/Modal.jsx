/**
 * 컴포넌트 다발적 사용으로 인한 참조 순환을 방지하기 위해
 * index.js에서 import해주어 참조 순환 방지
 * */
import ModalHeader from "./ModalHeader";
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useLayoutEffect, useRef} from "react";

/**
 * @desc 스타일 지정하여 사용 가능한 모달 컴포넌트이며 width, height 를 반드시 지정해주어야 함
 * @param {{ setIsOpen: any, children: any, modalStyle: CSSProperties, isOpen: boolean, closeFunction: any }}
 *  */

export default function Modal({
  children,
  modalStyle = {},
  modalTitle,
  setIsOpen,
  isOpen,
  closeFunction,
  isOverlayClose = true, // 배경 클릭 시 닫기
  hasBackground = false, // 모달 header backgroud color 적용
}) {
  const overlay = useRef(null);
  const modalContent = useRef(null);

  // 모달 close 함수
  const onClose = () => {
    if (isOpen) {
      if (closeFunction) closeFunction();
      if (setIsOpen) setIsOpen(false);
    }
  };

  // *modal 내부에서 selectBox 등 다른 컨텐츠가 모달 밖으로 안나가짐으로
  // overflow를 수정함
  useLayoutEffect(() => {
    if (modalContent.current) {
      const modalHeight = modalContent.current.scrollHeight; // clientHeight로 높이 가져오기
      if (modalHeight > 800) {
        modalContent.current.style.overflow = "auto"; // 스크롤 가능
        modalContent.current.style.maxHeight = "800px"; // max-height 설정
      } else {
        modalContent.current.style.overflow = "visible"; // 스크롤 없음
        modalContent.current.style.maxHeight = "none"; // max-height 해제
      }
    }
  }, [children]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlay}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2, ease: "easeInOut"}}
          className="OverlaySection "
          onClick={isOverlayClose ? onClose : null}
        >
          <div className="modal_wrapper" style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <ModalHeader modalTitle={modalTitle} onClose={onClose} hasBackground={hasBackground} />
            <div className="modal_content vertical_custom_scroll" ref={modalContent}>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// export default React.memo(Modal);
