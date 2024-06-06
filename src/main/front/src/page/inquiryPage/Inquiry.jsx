import "../../styles/inquiry/Inquiry.css";
import {useEffect, useState} from "react";
import {FaLock, FaSearch} from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

const Inquiry = () => {

    // 문의사항 목록
    const [data, setData] = useState([]);


    // 작성자 이름 처리 함수
    const formatWriterName = (name) => {
        if (name.length > 3) {
            return `${name[0] }**..`;
        } else {
            return `${name[0]}${'**'.repeat(name.length - 2)}`;
        }
    };

    useEffect(() => {
        let newData = [
            {
                "inquiry_num": 1,
                "inquiry_title": "문의 제목 테스트합니다 !",
                "inquiry_content": "문의 내용을 테스트합니다~",
                "inquiry_writer": "차나니",
                "inquiry_password": "1234",
                "inquiry_secret": "y",
                "inquiry_regdate": "24.04.05",
                "inquiry_kind": "기타",
                "inquiry_comment" : "안녕하십니까~"
            }, {
                "inquiry_num": 2,
                "inquiry_title": "문의 제목 테스트2",
                "inquiry_content": "문의 내용을 테스트합니다2~",
                "inquiry_writer": "맹구영",
                "inquiry_password": "12345",
                "inquiry_secret": "n",
                "inquiry_regdate": "24.04.05",
                "inquiry_kind": "기타",
                "inquiry_comment" : ""

            }

        ];

        setData(newData);
    }, []);


    return (
        <div className="inquiry-container">
            <div className="inquiry-box">

                <div className="inquiry-title-box">
                    <h2>문의하기</h2>
                </div>

                <div className="inquiry-content-box">

                    <div className="inquiry-content-title">
                        <p style={{width: "7%"}}>번호</p>
                        <p style={{width: "10%"}}>분류</p>
                        <p style={{width: "50%"}}>제목</p>
                        <p style={{width: "13%"}}>글쓴이</p>
                        <p style={{width: "20%"}}>등록일</p>
                    </div>

                    <div className="inquiry-content-detail">
                        {data.length === 0 ?
                            <div className="inquiry-notData-box">
                                <p>목록이 없습니다.</p>
                            </div>
                            :
                            <div className="inquiry-inData-box">
                                {data.map((item, index) => (
                                    <div className="inquiry-data-box" key={index}>
                                        <p style={{width: "7%", textAlign : "center"}}
                                        className="inquiry_num">{item.inquiry_num}</p>
                                        <p style={{width: "10%", textAlign : "center"}}
                                        className="inquiry_kind">{item.inquiry_kind}</p>
                                        <p
                                        className="inquiry_title">
                                            {item.inquiry_secret === 'y' ? <FaLock /> : <FaLockOpen /> }
                                            {item.inquiry_comment !== "" ? <span style={{marginRight : "5px"}}>[답변완료]</span> : ""}
                                            {item.inquiry_title}
                                        </p>
                                        <p style={{ textAlign : "center"}}
                                        className="inquiry_writer">{formatWriterName(item.inquiry_writer)}</p>
                                        <p style={{width: "20%", textAlign : "center"}}
                                        className="inquiry_regdate">{item.inquiry_regdate}</p>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>

                    <div className="inquiry-search-button-box">
                        <div className="inquiry-search-box">
                            <input type="text"/>
                            <FaSearch size={18}/>
                        </div>

                        <div className="inquiry-button-box">
                            <button>글쓰기</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Inquiry;