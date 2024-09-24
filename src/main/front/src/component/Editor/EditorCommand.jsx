import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {lexicalEditorConfig} from "./lexicalEditorConfig";
import LexicalEditorTopBar from "../LexicalEditorTopBar";
import {Box, Button, Divider} from "@mui/material";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {MuiContentEditable, placeHolderSx} from "./styles";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import FloatingTextFormatToolbarPlugin from "../CustomNodes/CustomPlugins/FloatingTextFormatPlugin";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect, useState} from "react";
import {$generateHtmlFromNodes} from '@lexical/html';
import {$getRoot} from "lexical";
import {useNavigate} from "react-router-dom";

// 필수로 전달해줘야하는 prop
// 데이터를 관리할 state, submitHandler, 목록으로 눌렀을 때 갈 페이지
const EditorCommand = ({setEditorContent, submitHandler, historyPath}) =>{
    const navigator = useNavigate();

    // 입력 핸들러
    const onChange = (editorState, editor) => {
        editor.update(() => {
            const rawHTML = $generateHtmlFromNodes(editor, null)
            const editorStateTextString = editorState.read(() => $getRoot().getTextContent());
            //console.log("rawHTML : ", rawHTML);
            setEditorContent(rawHTML);
        });
    }

    // 목록으로 가기
    const listHandle = () => {
        navigator(`${historyPath}`);
        window.scroll(0, 0);
    }

    return (
        <LexicalComposer initialConfig={lexicalEditorConfig}>
            <LexicalEditorTopBar/>
            <Divider/>
            <Box sx={{position: "relative", background: "white", paddingTop : "3px"}}>
                <RichTextPlugin // #312D4B
                    contentEditable={<MuiContentEditable/>}
                    placeholder={<Box sx={placeHolderSx}>내용 입력...</Box>}
                    ErrorBoundary={LexicalErrorBoundary}

                />
                <OnChangePlugin onChange={onChange}/>
                <HistoryPlugin />
                <ListPlugin />
                <LinkPlugin />
                <FloatingTextFormatToolbarPlugin />
                <Box style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgb(0, 0, 0, 0.12)",
                    paddingTop: "15px"
                }}>
                    <Button onClick={listHandle}
                            style={{
                                background: "white",
                                color: "grey",
                                border : "1px solid #d3d3d3",
                                width: "85px",
                                height: "41px",
                                fontSize: "14px",
                                borderRadius: "3px"
                            }}>목록으로</Button>
                    <Button onClick={submitHandler}
                            style={{
                                background: "black",
                                color: "white",
                                border : "1px solid #d3d3d3",
                                width: "85px",
                                height: "41px",
                                fontSize: "14px",
                                borderRadius: "3px"
                            }}
                    >글쓰기</Button>
                </Box>
            </Box>
        </LexicalComposer>
    );
}

function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

export default EditorCommand;
