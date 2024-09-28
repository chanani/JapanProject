import "../../styles/translatorPage/Translator.css";
import {FaExchangeAlt} from "react-icons/fa";
import {GrCopy} from "react-icons/gr";
import Select from "react-select";
import {useEffect, useRef, useState} from "react";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import Audio from "../../component/Audio";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const TranslatorPage = (props) => {
    const [fromValue, setFromValue] = useState([{value: 'ko', label: '한국어'}]);
    const [toValue, setToValue] = useState([{value: 'ja', label: '일본어'}]);
    const textareaRef = useRef(null);
    const timeoutRef = useRef(null);
    const responseTextareaRef = useRef(null);
    const [inputFromValue, setInputFromValue] = useState("");
    const [inputToValue, setInputToValue] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [heightInput, setHeightInput] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    // select box option list
    const options = [
        {value: 'ko', label: '한국어'},
        {value: 'ja', label: '일본어'},
        {value: 'en', label: '영어'},
    ];
    // from -> to, to -> from
    const changeFromToHandle = () => {
        let newFrom = fromValue;
        setFromValue(toValue);
        setToValue(newFrom);
        // 내용 변경
        if (!inputToValue) return;
        let newValue = inputFromValue;
        setInputFromValue(inputToValue);
        setInputToValue(newValue);
    }

    // textarea onchange 핸들러
    const handleTextareaChange = (e) => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null;
        }
        timeoutRef.current = setTimeout(() => {
            translatorAPI();
            timeoutRef.current = null;
        }, 2000);
        setInputFromValue(e.target.value);
        if (textareaRef.current) {
            setHeightInput(textareaRef.current.scrollHeight);
        }
    };

    // 번역하기 버튼 핸들러
    const translatorHandle = async () => {
        try {
            translatorAPI();
            setIsLoading(true);
        } catch {

        } finally {
            setIsLoading(false);
        }
    }

    // textarea focus 핸들러
    const focusHandle = () => {
        textareaRef.current.focus();
    }

    // 번역 요청 API
    const translatorAPI = () => {
        axiosInstance.get('translator/changeWord', {
            params: {
                word: textareaRef.current.value,
                from: fromValue[0].value,
                to: toValue[0].value,
            }
        })
            .then((res) => {
                setInputToValue(res.data[0].translations[0].text);
            })
            .catch((e) => toast.error('번역 중 오류가 발생하였습니다. 관리자에게 문의해주세요.'))
    }

    // timeoutRef kill 하는 useEffect
    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }
    }, []);

    // 높이 계산 useEffect
    useEffect(() => {
        if (!textareaRef?.current) return;
        textareaRef.current.style.height = 'auto'
        responseTextareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        responseTextareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }, [heightInput]);

    return (
        <div className="translator-container">
            <div className={`translator-box ${isFocused ? 'active_border' : ''}`}>
                <div className="translator-title-box">
                    <div className="translator-select-box translator-write-box">
                        <Select
                            defaultValue={options[0]}
                            isClearable={false}
                            isSearchable={false}
                            options={options}
                            classNamePrefix="custom-select"
                            value={fromValue}
                            onChange={(selectedOption) => setFromValue([selectedOption])}
                            style={{zIndex : "0 !important"}}
                        />
                    </div>
                    <div className='translator-icon-box'>
                        <FaExchangeAlt onClick={changeFromToHandle}/>
                    </div>
                    <div className="translator-select-box" style={{width: "auto", display: "none"}}>
                        <Select
                            defaultValue={options[1]}
                            isClearable={false}
                            isSearchable={false}
                            options={options}
                            classNamePrefix="custom-select"
                            value={toValue}
                            onChange={(selectedOption) => setToValue([selectedOption])}
                        />
                    </div>
                </div>
                <div className="translator-content-box" onClick={focusHandle}>
                    <textarea
                        className="translator-content-write-input"
                        ref={textareaRef}
                        value={inputFromValue}
                        placeholder="번역할 내용을 입력해주세요."
                        onChange={handleTextareaChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    >
                    </textarea>
                </div>
                <div className="translator-button-box">
                    <div className="translator-button-other">
                        <div className="translator-button-other-audio-box">
                            <div>
                                <Audio inputData={textareaRef.current?.value}/>
                            </div>
                        </div>
                        <div className="translator-button-other-copy-box">
                            <div>
                                <CopyToClipboard text={inputFromValue} onCopy={() => toast.success("클립보드에 복사되었습니다.")}>
                                    <GrCopy/>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                    <div className="translator-button-submit">
                        <button onClick={translatorHandle}>번역하기</button>
                    </div>
                </div>
            </div>

            <div className="translator-box translator-read-box">
                <div className="translator-title-box">
                    <div className="translator-select-box">
                        <Select
                            defaultValue={options[1]}
                            isClearable={false}
                            isSearchable={false}
                            options={options}
                            classNamePrefix="custom-select"
                            value={toValue}
                            onChange={(selectedOption) => setToValue([selectedOption])}
                        />
                    </div>
                </div>
                <div className="translator-content-box">
                    <textarea
                        ref={responseTextareaRef}
                        value={inputToValue}
                        className="translator-content-read-input"
                        readOnly
                    >
                    </textarea>
                </div>
                <div className="translator-button-box">
                    <div className="translator-button-other">
                        <div className="translator-button-other-audio-box">
                            <div>
                                <Audio inputData={inputToValue}/>
                            </div>
                        </div>
                        <div className="translator-button-other-copy-box">
                            <div>
                                <CopyToClipboard text={inputToValue} onCopy={() => toast.success("클립보드에 복사되었습니다.")}>
                                    <GrCopy/>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TranslatorPage;
