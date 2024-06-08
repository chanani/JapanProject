import {$getRoot, $getSelection} from "lexical";
import {useEffect, useRef, useState} from "react";

import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {MuiContentEditable, placeHolderSx} from "./styles";
import {Box, Button, Divider} from "@mui/material";
import {lexicalEditorConfig} from "../Editor/lexicalEditorConfig";
import LexicalEditorTopBar from "../LexicalEditorTopBar";
import TreeViewPlugin from "../CustomNodes/CustomPlugins/TreeViewPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import FloatingTextFormatToolbarPlugin from "../../component/CustomNodes/CustomPlugins/FloatingTextFormatPlugin";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {Overlap} from "../../hook/Overlap";

function LexicalEditorWrapper({
                                  inquiryTitle,
                                  inquiryWriter,
                                  inquiryEmail,
                                  inquiryPassword,
                                  inquiryPasswordCheck,
                                  infoCheck
                              }) {
    const [editorContent, setEditorContent] = useState("");

    const onChange = (editorState) => {

        editorState.read(() => {
            // Read the contents of the EditorState here.
            const root = $getRoot();
            const selection = $getSelection();

            const jsonString = JSON.stringify(root);
            setEditorContent(jsonString);
        });
    }
    // 글 등록하기 API
    const inquirySaveAPI = () => {
        axiosInstance.post("inquiry/insertData", {
            inquiry_title : inquiryTitle,
            inquiry_content: editorContent,
            inquiry_writer : inquiryWriter,
            inquiry_email : inquiryEmail,
            inquiry_password : inquiryPassword,
        })
            .then((res) => {
                toast.success("정상적으로 글이 등록되었습니다.");
            })
            .catch(e => toast.error("글 등록 중 에러가 발생하였습니다."))
    }

    const submitHandler = () => {
        if(!inquiryTitle) return toast.error("제목을 입력해주세요.");
        if(!inquiryWriter) return toast.error("작성자를 입력해주세요.");
        if(!inquiryEmail) return toast.error("이메일을 입력해주세요.");
        if(!inquiryPassword) return toast.error("비밀번호를 입력해주세요.");
        if(!inquiryPasswordCheck) return toast.error("비밀번호 확인란을 입력해주세요.");
        if(!infoCheck) return toast.error("개인정보 수집 및 이용에 동의해주세요.");
        if(!Overlap("email", inquiryEmail)) return;
        if(inquiryPassword.length !== 4) return toast.error("비밀번호는 4자리에 맞춰 입력해주세요.");
        if(inquiryPassword !== inquiryPasswordCheck) return toast.error("비밀번호가 일치하지 않습니다.");
        inquirySaveAPI();
    }
    return (
        <LexicalComposer initialConfig={lexicalEditorConfig}>
            <LexicalEditorTopBar/>
            <Divider/>
            <Box sx={{position: "relative", background: "white"}}>
                <RichTextPlugin // #312D4B
                    contentEditable={<MuiContentEditable/>}
                    placeholder={<Box sx={placeHolderSx}>Enter some text...</Box>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={onChange}/>
                <HistoryPlugin/>
                <ListPlugin/>
                <LinkPlugin/>
                <FloatingTextFormatToolbarPlugin/>
                <Box style={{textAlign: "center"}}>
                    <Button onClick={submitHandler}
                            style={{
                                background: "#A0D995",
                                color: "white",
                                width: "80px",
                                height: "40px",
                                fontSize: "16px",
                                borderRadius: "8px"
                            }}
                    >글쓰기</Button>
                </Box>
            </Box>
        </LexicalComposer>
    );
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!


// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

export default LexicalEditorWrapper;