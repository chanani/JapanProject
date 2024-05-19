import '../styles/component/FindInfo.css'
import {IoCloseOutline} from "react-icons/io5";
import {useState} from "react";

const FindInfo = ({info}) => {
  const [result, setResult] = useState(false);

  const resultHandle = () => {
    setResult(current => !current);
  }

  return (
    <div className='find_background'>

      <div className='find_box_all'>
        {!!result ? <IdFind/> :
            <div>
              <div className='find_title_box'>
                <p>{info === 'ID' ? '아이디 찾기' : '비밀번호 재설정'}</p>
                <IoCloseOutline size={25}/>

              </div>

              <div className='find_box'>

                <p>가입하신 이메일을 입력해 주세요.</p>

                <div className='find_input_box'>
                  <input type="email" placeholder='이메일'/>
                  <input type="text" placeholder='인증번호 6자리 입력' disabled/>
                </div>

                <div className='find_btn_box'>
                  <button>인증번호 받기</button>
                </div>

              </div>

              <div className='find_result_box'>
                <button onClick={resultHandle}>확인</button>
              </div>
            </div>
        }

      </div>
    </div>
  );
}

export default FindInfo

export const IdFind = () => {
  return (
      <div>
        <div className="find_title_box">
          <p>가입된 아이디</p>
          <IoCloseOutline size={25}/>
        </div>
      </div>
  )
}

export const PwReset = () => {
  return (
      <div>
        <div className="find_title_box">
          <p>비밀번호 재설정</p>
          <IoCloseOutline size={25}/>
        </div>
        <div>
          <input type="text" />
        </div>
      </div>
  )
}