# 🌎 The Japan 일본어 단어 학습 서비스

   <h4>
      일본어 공부하고 싶은데 시작하기 어려우신가요?<br/>
   </h4>

<blockquote>
   <p>
    The Janpan을 통해 간단한 단어부터 시작해보세요!<br/>
    나만의 단어장을 만들어 일본어 단어를 체계적으로 학습하고,<br/> 
    수준에 맞는 테스트와 AI를 활용해 질문하며 학습할 수 있는 서비스입니다. 
   </p>
</blockquote>

`📖 맞춤 단어 학습` &nbsp; `📚 공유 가능한 나만의 단어장` &nbsp; `🤖 질문하며 AI와 학습`

<br/><br/>

<div align="center">
   <table>
      <td align="center" width="600px" height="180px">
         <h4>서비스 이용 해보기 👉 <a href="https://lg.thejapan.today/"> [ The Japan 바로가기 ] </a></h4>
         <h6>
            <em>
               <strong>
                  &nbsp;&nbsp;&nbsp;
                  📢 일부 기능은 로그인 후 이용 할 수 있습니다.
                  &nbsp;&nbsp;&nbsp;&nbsp;
               </strong>
            </em>
         </h6>
         <br/>
      </td>
   </table>
</div>

<br/>

## 🚀 프로젝트 목표

<p>서비스의 기능을 구현하는 것 자체도 중요하지만, <strong style="background-color: #656c7633">어떤 과정을 통해 어떻게 구현했는지</strong>가 그 이상으로 중요하다고 생각합니다. 예를 들어, 실무에서는 개인이 아닌 팀 단위로 개발을 진행하기 때문에 합의된 코딩 스타일과 개발 프로세스를 유지해야 하고 효율적인 협업 방식을 고려해야합니다. 또 실무에서의 서비스 규모는 훨씬 크고 복잡하기 때문에 유지보수성 고려하여 일정 좋은 코드 퀄리티와 유연한 설계를 유지해야 합니다.</p>

<p>따라서 <strong style="background-color: #656c7633">The Japan</strong> 개발 프로젝트에서는 아래와 같은 목표들을 세운 후, 팀 단위로 실제 운영 중인 서비스를 개발하는 상황에서 어떻게 이와 같은 목표를 달성할 수 있을지 고민하며 개발을 진행하고 있습니다.</p>

1. <strong style="background-color: #656c7633">유연한 설계와 확장성 높은 코드로 유지보수성을 높이자</strong>
    - 여기저기 중복되는 코드들, 기능을 수정하고 추가할 때 마다 불필요한 수정을 필요로 하는 상황들을 최소화하고 유지보수성을 높이기 위해 노력합니다.
    - 이를 위해 SOLID 원칙과 디자인 패턴에 대한 이해를 바탕으로 객체지향의 장점을 최대한 활용하는 코드를 작성합니다.
2. <strong style="background-color: #656c7633">문서화를 통해 협업 효율성을 높이자</strong>
    - 프론트엔드-백엔드 팀이 협업하는 환경에서 요청과 응답 방식에 대해 잘 정리된 API 문서는 원활한 커뮤니케이션을 도와주는 좋은 자료가 됩니다. 뿐만 아니라 외부의 사용자가 우리가 개발한 API를 호출하기 위해서도 API 문서는 필수적입니다.
    - 하지만 개발을 진행하며 API 문서를 함께 직접 작성하는 것은 비효율적이기 때문에 Swagger와 같은 툴을 활용하여 문서 작업을 자동화할 수 있는 방법을 고민합니다.
3. <strong style="background-color: #656c7633">CI/CD를 구축하여 개발 프로세스의 효율성을 높이자</strong>
    - 다수의 개발자가 하나의 서비스를 개발해나가는 환경에서는 각자의 코드를 머지하고 충돌을 해결하고 테스트하고 빌드, 배포하는 과정에도 많은 리소스가 소요됩니다. 이러한 문제를 해결하기 위한 방법으로 CI/CD를 직접 구축하여 애자일한 개발 프로세스를 실현하기 위해 노력합니다.
4. <strong style="background-color: #656c7633">성능 테스트를 통한 성능을 개선하자</strong>
    - 실제 서비스 환경에서 트래픽이 몰리는 경우 예상치 못한 문제들이 발생할 수 있기 때문에 성능 테스트 역시 반드시 병행되어야 합니다. 성능 테스트를 통해 병목 지점을 개선하고 컴퓨팅 자원을 더 효율적을 활용할 수 있는 방안들을 고민하여 성능을 향상시키기 위해 노력합니다.
    - K9과 같은 툴을 이용해 높은 트래픽을 발생시키고 성능을 모니터링하여 개선점을 찾아냅니다.

<br/>

## 😎 서비스 주요기능

#### ✅ AI 프롬프트를 통해 학습 및 질문 기능 제작했습니다.
#### ✅ 사용자만의 단어장을 만들어 다른 사용자와 공유할 수 있는 기능 제작했습니다.
#### ✅ 원하는 수준의 단어를 랜덤으로 학습할 수 있는 기능 제작했습니다.
#### ✅ 학습의 흥미를 위해 단어 객관식 학습 및 주관식 테스트 제작했습니다
#### ✅ Azure Translator API를 통한 번역 기능 제작했습니다.


<br/>


## ⚙ 사용된 기술 스택

<table border="1">
   <th align="center">CATEGORY</th>
   <th align="center" width="142px">STACK</th>
   <th align="center">ETC</th>
   <tr>
      <td rowspan="7" align="center">Backend</td>
      <td> <img src="https://github.com/user-attachments/assets/f1210a0a-6fff-41bd-bce5-7d64e555e394" width="15px" alt="Spring Boot"/> Spring Boot</td>
      <td> 스프링 프레임워크 기반의 간소화된 개발 환경을 사용하여 REST API와 비즈니스 로직을 효율적으로 구현하였습니다.</td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/4cf9b956-e6e5-4044-a2e0-b696e1b3db92" width="15px" alt="MySQL"/> MySQL</td>
      <td>데이터베이스 테이블 설계 시 정규화를 고려하여 데이터를 구조화하였으며, 트랜잭션 관리를 통해 데이터의 무결성을 유지하였습니다.</td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/75019069-30d9-4cfb-b289-d10b1919044b" width="15px" alt="Mybatis"/> Mybatis</td>
      <td> MyBatis의 동적 쿼리 기능을 활용하여 다양한 조건의 데이터를 효율적조회 하며 코드 가독성을 높이기 위해 지속적으로 리팩토링을 진행했습니다.</td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/0d546cc5-e50b-4a00-9ec9-cadfa767a84b" width="15px" alt="Redis"/> Redis</td>
      <td> 사용 빈도가 높은 데이터의 캐싱과 세션 관리를 위해 Redis를 선택하였습니다.</td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/68ff8a13-2471-4fe2-a967-6003ed424a74" width="15px" alt="Swagger"/> Kafka</td>
      <td> 메시지 큐를 활용해 안정적인 알림 기능 구조를 설계하였습니다.</td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/6be522ce-1cb2-40f8-b559-f1e01976e44d" width="15px" alt="Swagger"/> Swagger</td>
      <td> 개발 중인 API 명세서를 자동으로 생성하고, 클라이언트 요청에 맞는 응답을 검증하기 위해 Swagger를 선택했습니다.</td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/f1f9f344-f860-4bb6-885b-91e7e6a2cfc2" width="15px" alt="JWT Token"/> JWT Token</td>
      <td>인증 및 권한 관리를 위해 JWT를 사용하였으며, Refresh Token을 추가하여 보안성을 강화하였습니다.</td>
   </tr>
   <tr>
      <td rowspan="3" align="center">Frontend</td>
      <td><img src="https://github.com/user-attachments/assets/be4801b7-8f57-4186-9689-96ffba8a8c23" width="16px" alt="React.js"/> React.js</td>
      <td>Context API를 활용한 상태 관리, React Router를 통한 </td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/6d26291a-2308-48f4-9006-be0635337695" width="15px" alt="ReactQuery"/> Aixos</td>
      <td> 처음으로 Interceptor를 제작하고 활용하여 요청과 응답 시 공통 처리가 필요한 데이터를 자동으로 추가하여 보안을 강화할 수 있었습니다.</td>
   </tr>
   <tr>
      <td> <img src="https://github.com/user-attachments/assets/d9df2786-d025-4553-a96a-edbece61cf28" width="15px" alt="ReactQuery"/> CSS3</td>
      <td> CSS3를 활용하여 반응형 디자인을 구현했으며, 유연한 레이아웃과 애니메이션 효과를 추가하여 사용자 경험을 개선하였습니다.</td>
   </tr>

   <tr>
      <td rowspan="3" align="center">Deploy</td>
      <td><img src="https://github.com/user-attachments/assets/d56eff15-6497-43be-905c-6785a06229cd" width="15px" alt="Linux Ubuntu"/> Ubuntu</td>
      <td> Ubuntu 서버에서 Spring Boot와 Nginx를 배포하여 안정적인 애플리케이션 운영 환경을 조성하였습니다.</td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/855b62f3-5c48-4bd2-afd3-f516d47ebd97" width="15px" alt="PM2"> Nginx</td>
      <td> SSL 인증서를 사용하여 HTTPS를 활성화하고, 데이터 보안을 강화하였습니다.</td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/a079d166-457d-43cd-ba82-6dbd3f5806e8" width="15px" alt="PM2"> Jenkins</td>
      <td> Jenkins를 통해 코드 푸시 후 빌드와 배포 과정을 자동화하였습니다.</td>
   </tr>
</table>


<br/>

