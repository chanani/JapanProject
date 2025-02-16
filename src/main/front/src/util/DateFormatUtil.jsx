
import dayjs from "dayjs";

/**
 * 날짜를 주어진 형식으로 변환
 * @param {string | Date} date 변환할 날짜
 * @param {string} format 적용할 포맷 (예: "YYYY-MM-DD HH:mm:ss")
 * @returns {string} 포맷된 날짜 문자열
 */
export const formatDate = (date, format = "YYYY. MM. DD") => {
    return dayjs(date).format(format);
};

/**
 * 현재 날짜를 특정 형식으로 반환
 * @param {string} format 적용할 포맷 (기본값: "YYYY-MM-DD")
 * @returns {string} 포맷된 현재 날짜
 */
export const getCurrentDate = (format = "YYYY. MM. DD") => {
    return dayjs().format(format);
};
