let editor;

// 모나코 에디터

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }});

require(["vs/editor/editor.main"], function () {
   editor = monaco.editor.create(document.getElementById("editor"), {
        value: `print("헬로우 월드");`,
        language: "python",
        theme: "vs-dark"
    });

    console.log("Monaco Editor 로드 완료")

    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
        saveBtn.addEventListener("click", saveCodeToFile);
        console.log("addEventListener(저장) 추가됨")
    } else {
        console.error("addEventListener(저장) - 찾을 수 없음")
    }
});

// 저장 버튼

function saveCodeToFile() {
    if (!editor) {
        console.error("Editor 로드되지 않음");
        alert("Editor가 로드되지 않았음. 나중에 다시 시도하셈.");
        return;
    }

    const code = editor.getValue();
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "code.py";
    a.click();
    URL.revokeObjectURL(a.href);

    console.log("파일 저장 완료:", code);
}