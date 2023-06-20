"use strict";
exports.id = 203;
exports.ids = [203];
exports.modules = {

/***/ 3505:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_rx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5452);
/* harmony import */ var react_icons_rx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_rx__WEBPACK_IMPORTED_MODULE_2__);



const Header = ({ total , index , showCounter  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "w-full font-inter font-bold flex justify-between gap-x-2 py-2 items-center text-transparent text-4xl md:text-6xl bg-clip-text bg-gradient-to-bl from-purple-500 to-orange-500",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex gap-x-2 items-center justify-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-white text-2xl md:text-3xl",
                            children: [
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_rx__WEBPACK_IMPORTED_MODULE_2__.RxLetterCaseCapitalize, {})
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: " SPELLiFY "
                        })
                    ]
                }),
                showCounter && index !== undefined && total !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "w-8 h-8 z-20 md:w-12 md:h-12 text-xs md:text-lg text-center text-white md:text-md font-bold right-0 top-0 relative flex items-center justify-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "z-20 bg-zinc-900 w-full h-full rounded-full flex items-center justify-center",
                            children: [
                                index + 1,
                                "/",
                                total,
                                " "
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "absolute transform scale-110 top-0 left-0 rounded-full w-full h-full bg-gradient-to-r from-orange-500 to-purple-500"
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);


/***/ }),

/***/ 9698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ getSpellings)
});

;// CONCATENATED MODULE: ./util/getRandom.ts
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/* harmony default export */ const util_getRandom = (getRandom);

// EXTERNAL MODULE: external "random-words"
var external_random_words_ = __webpack_require__(3942);
var external_random_words_default = /*#__PURE__*/__webpack_require__.n(external_random_words_);
;// CONCATENATED MODULE: ./util/getSpellings.ts


function getSpellings(difficulty) {
    if (!difficulty) {
        return null;
    }
    const easy = difficulty === "easy";
    const medium = difficulty === "medium";
    const hard = difficulty === "hard";
    let lCount = 0;
    let minWordLength = 0;
    let maxWordLength = 0;
    if (easy) {
        lCount = util_getRandom(5, 10);
        minWordLength = 5;
        maxWordLength = 7;
    } else if (medium) {
        lCount = util_getRandom(10, 15);
        minWordLength = 6;
        maxWordLength = 8;
    } else if (hard) {
        minWordLength = 10;
        maxWordLength = 20;
        lCount = util_getRandom(10, 20);
    }
    const spellings = new Array(lCount).fill(0).map((el)=>({
            input: "",
            word: "",
            done: false
        }));
    let words = [];
    while(words.length !== lCount){
        words = external_random_words_default()({
            exactly: lCount,
            max: maxWordLength,
            min: minWordLength
        });
    }
    for(let i = 0; i < words.length; i++){
        let w = words[i];
        while(w.length < minWordLength){
            w = external_random_words_default()({
                exactly: 1,
                min: minWordLength,
                max: maxWordLength
            })[0];
        }
        spellings[i].word = w.toUpperCase();
    }
    return spellings;
}


/***/ }),

/***/ 3747:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6912);
/* harmony import */ var _getSpellings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9698);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__]);
zustand__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


let dummySpellingsRemoveThis = (0,_getSpellings__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)("medium");
dummySpellingsRemoveThis = dummySpellingsRemoveThis.map((el)=>{
    const len = el.word.length;
    const start = Math.random() * (len - 1);
    const end = Math.random() * (len - 3);
    el.input = el.word.substring(start, end);
    return el;
});
const useStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__["default"])()((set)=>({
        res: [],
        difficulty: "",
        isSaved: false,
        setRes (spellings, difficulty, isSaved) {
            set(()=>{
                return {
                    res: spellings,
                    difficulty,
                    isSaved
                };
            });
        }
    }));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useStore);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;