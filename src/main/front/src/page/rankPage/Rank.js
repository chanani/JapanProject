import { useContext, useEffect } from "react";
import "../../styles/rank/Rank.css"
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Rank = () => {
  const {userRole, username} = useContext(tokenInfoContext);
  const navigate = useNavigate();

  useEffect(() =>{
    if(userRole === "none"){
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  });

  const handleTest = () => {
    axios({
      url : "/notifications/subscribe/1",
      method : "GET"
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => console.log(e));
  }

  

  const handleSseTest = () => {
    const eventSource = new EventSource(`localhost:8889/notifications/subscribe/` + username)
    eventSource.addEventListener('sse', event => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      (async () => {
        // 브라우저 알림
        const showNotification = () => {
            
            const notification = new Notification('코드 봐줘', {
                body: data.content
            });
            
            setTimeout(() => {
                notification.close();
            }, 10 * 1000);
            
            notification.addEventListener('click', () => {
                window.open(data.url, '_blank');
            });
        }

        // 브라우저 알림 허용 권한
        let granted = false;

        if (Notification.permission === 'granted') {
            granted = true;
        } else if (Notification.permission !== 'denied') {
            let permission = await Notification.requestPermission();
            granted = permission === 'granted';
        }

        // 알림 보여주기
        if (granted) {
            showNotification();
        }
    })();
    })
  }


  return (
    <div>공사중이에요ㅠㅠ
          <button onClick={handleTest}>kafka test</button>
          <button onClick={handleSseTest}>sse test</button>

    </div>
  );
}

export default Rank;