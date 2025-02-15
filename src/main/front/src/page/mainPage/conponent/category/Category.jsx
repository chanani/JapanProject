import './Category.css';
import {useNavigate} from "react-router-dom";

const Category = () => {
    const navigate = useNavigate();
    const categories = [
        ["단어 학습", "/study", "/svg/main/word.svg"],
        ["단어 선택 학습", "/choice", "/svg/main/choice.svg"],
        ["단어장", "/set-study", "/svg/main/note.svg"],
        ['단어 테스트', '/choice-test', '/svg/main/test.svg'],
        ["AI 학습", "/chatAi", "/svg/main/ai.svg"],
        ['번역기', '/translator', '/svg/main/translate.svg']
    ];

    // 카테고리 클릭 시 페이지 이동
    const movePage = (link) => {
        navigate(link);
    }

    return (
        <div className={"category-container"}>

            {categories.map((category, index) => (
                <div className={"category-box"}
                     key={index}
                     onClick={() => movePage(category[1])}>
                    <div className={"category-icon-box"}>
                        <img src={category[2]}/>
                    </div>
                    <div className={"category-title-box"}>
                        <p>{category[0]}</p>
                    </div>
                </div>
            ))}


        </div>
    )
}

export default Category;