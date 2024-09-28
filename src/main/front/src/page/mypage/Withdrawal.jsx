import "../../styles/mypage/Withdrawal.css"
import Logo from "../../image/logo_image.png";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";
import {Cookies} from "react-cookie";

const Withdrawal = () => {
    const navigator = useNavigate();
    const {username} = useContext(tokenInfoContext);
    const [agree, setAgree] = useState(false);
    const cookies = new Cookies();
    // 홈버튼 핸들러
    const handleHome = () => {
        navigator("/");
    }
    // 뒤로가기 핸들러
    const backHandle =() => {
        navigator("/mypage");
    }
    // 탈퇴 요청 핸들러
    const withdrawalHandle = () => {
        if(!agree) return toast.error('탈퇴 약관에 동의 후 진행할 수 있습니다.');
        let check = window.confirm('정말 탈퇴 하시겠습니까?');
        if(check) withdrawalAPI();
    }
    // 탈퇴 요청 API
    const withdrawalAPI = () => {
        axiosInstance.post('mypage/withdrawal', {username})
            .then((res) => {
                console.log(res);
                if(res.status === 200){
                    toast.success('정상적으로 탈퇴가 진행되었습니다.');
                    cookies.remove('accessToken');
                    cookies.remove('refreshToken');
                    cookies.remove('username');
                    window.location = ('/');
                }
            })
            .catch(e => toast('탈퇴 중 오류가 발생하였습니다. 관리자에게 문의해주세요.'));
    }

    return (
        <div className='withdrawal-container'>
            <div className='withdrawal-box-all'>

                <div className='withdrawal-title-box'>
                    <img src={Logo} alt=""/>
                </div>

                <div className='withdrawal-info'>
                    <p>회원탈퇴</p>
                </div>

                <div className='withdrawal-content-box'>
                    <div className='withdrawal-content'>
                        <p>※ The Japan 회원 탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</p>
                        <p className='depth-one'>- 사용하고 계신 아이디[{username}]는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</p>
                        <p className='depth-one'>- 탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.</p>
                        <p className='depth-two'>(1) 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.</p>
                        <p className='depth-two'>(2) 삭제된 데이터는 복구가 불가하오니 신중하게 선택하시기 바랍니다.</p>
                        <p className='depth-one'>- 탈퇴 후에도 게시판형 서비스에 등록한 게시물 및 댓글은 그대로 남아 있습니다.</p>
                        <p className='depth-two'>(1) 등록한 문의글은 탈퇴시 자동 삭제되지 않습니다.</p>
                        <p className='depth-two'>(2) 삭제를 원하는 문의글이 있다면 반드시 탈퇴 전 삭제하시기 바랍니다.</p>
                    </div>
                </div>

                <div className='withdrawal-checkbox'>
                    <label htmlFor="checkAgree">
                        <input type="checkbox" id="checkAgree" checked={agree}
                               onChange={e => setAgree(prevState => !prevState)}/>
                        <span><strong>필수</strong> 회원탈퇴 안내 사항을 모두 확인하였으며, 탈퇴에 동의합니다.</span>
                    </label>
                </div>

                <div className='withdrawal-btn-box'>
                     <button className='withdrawal-close-btn' onClick={backHandle}>취소</button>
                     <button
                         className={`${!agree ? 'withdrawal-check-off' : 'withdrawal-check-on'}`}
                         onClick={withdrawalHandle}
                     >회원탈퇴</button>
                </div>

            </div>
        </div>
    )
}

export default Withdrawal