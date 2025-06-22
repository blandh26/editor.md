(function(){
    var factory = function (exports) {
        var lang = {
            name : "ko",
            description : "온라인 오픈 소스 마크다운 편집기.",
            tocTitle    : "목차",
            toolbar : {
                undo             : "실행 취소(Ctrl+Z)",
                redo             : "다시 실행(Ctrl+Y)",
                bold             : "굵게",
                del              : "취소선",
                italic           : "기울임꼴",
                quote            : "인용 블록",
                ucwords          : "단어 첫 글자 대문자로 변환",
                uppercase        : "선택 텍스트 대문자로 변환",
                lowercase        : "선택 텍스트 소문자로 변환",
                h1               : "제목 1",
                h2               : "제목 2",
                h3               : "제목 3",
                h4               : "제목 4",
                h5               : "제목 5",
                h6               : "제목 6",
                "list-ul"        : "순서 없는 목록",
                "list-ol"        : "순서 있는 목록",
                hr               : "구분선",
                link             : "링크",
                "reference-link" : "참조 링크",
                image            : "이미지",
                code             : "인라인 코드",
                "preformatted-text" : "서식 있는 텍스트 / 코드 블록 (탭 들여쓰기)",
                "code-block"     : "코드 블록 (다중 언어 지원)",
                table            : "표",
                datetime         : "날짜 및 시간",
                emoji            : "이모티콘",
                "html-entities"  : "HTML 엔티티",
                pagebreak        : "페이지 나누기",
                watch            : "감시 중단",
                unwatch          : "감시 시작",
                preview          : "HTML 미리보기 (Shift + ESC로 종료)",
                fullscreen       : "전체 화면 (ESC로 종료)",
                clear            : "초기화",
                search           : "검색",
                help             : "도움말",
                info             : exports.title + " 정보"
            },
            buttons : {
                enter  : "확인",
                cancel : "취소",
                close  : "닫기"
            },
            dialog : {
                link : {
                    title    : "링크",
                    url      : "URL 주소",
                    urlTitle : "제목",
                    urlEmpty : "오류: 링크 주소를 입력해주세요."
                },
                referenceLink : {
                    title    : "참조 링크",
                    name     : "이름",
                    url      : "URL 주소",
                    urlId    : "ID",
                    urlTitle : "제목",
                    nameEmpty: "오류: 참조 이름이 비어 있습니다.",
                    idEmpty  : "오류: 참조 링크 ID를 입력해주세요.",
                    urlEmpty : "오류: 참조 링크 URL 주소를 입력해주세요."
                },
                image : {
                    title    : "이미지",
                    url      : "URL 주소",
                    link     : "링크",
                    alt      : "대체 텍스트",
                    uploadButton     : "업로드",
                    imageURLEmpty    : "오류: 이미지 URL 주소가 비어 있습니다.",
                    uploadFileEmpty  : "오류: 업로드할 이미지가 없습니다!",
                    formatNotAllowed : "오류: 허용되지 않는 이미지 형식입니다. 업로드 가능한 형식:"
                },
                preformattedText : {
                    title             : "서식 있는 텍스트 / 코드 블록", 
                    emptyAlert        : "오류: 텍스트 또는 코드 내용을 입력해주세요.",
                    placeholder       : "여기에 코드를 입력하세요..."
                },
                codeBlock : {
                    title             : "코드 블록",         
                    selectLabel       : "프로그래밍 언어:",
                    selectDefaultText : "언어 선택...",
                    otherLanguage     : "기타 언어",
                    unselectedLanguageAlert : "오류: 코드 언어를 선택해주세요.",
                    codeEmptyAlert    : "오류: 코드 내용을 입력해주세요.",
                    placeholder       : "여기에 코드를 입력하세요..."
                },
                htmlEntities : {
                    title : "HTML 엔티티"
                },
                help : {
                    title : "도움말"
                }
            }
        };
        
        exports.defaults.lang = lang;
    };
    
	// CommonJS/Node.js
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    { 
        module.exports = factory;
    }
	else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
		if (define.amd) { // for Require.js

			define(["editormd"], function(editormd) {
                factory(editormd);
            });

		} else { // for Sea.js
			define(function(require) {
                var editormd = require("../editormd");
                factory(editormd);
            });
		}
	} 
	else
	{
        factory(window.editormd);
	}
    
})();