import {$getRoot, $getSelection} from "lexical";
import {useEffect, useRef, useState} from "react";

import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {Overlap} from "../../hook/Overlap";
import {useNavigate} from "react-router-dom";
import {$generateHtmlFromNodes} from '@lexical/html';
import EditorCommand from "./EditorCommand";

function LexicalEditorWrapper({setEditorContent, submitHandler, historyPath}) {

    return (
        <EditorCommand
            setEditorContent={setEditorContent}
            submitHandler={submitHandler}
            historyPath={historyPath}
        />
    );
}

export default LexicalEditorWrapper;