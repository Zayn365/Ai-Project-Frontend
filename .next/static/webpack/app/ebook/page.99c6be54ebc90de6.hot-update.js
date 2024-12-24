"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/ebook/page",{

/***/ "(app-pages-browser)/./app/ebook/page.tsx":
/*!****************************!*\
  !*** ./app/ebook/page.tsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ AiEbookPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_pages_sections_AiEbookForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/pages/sections/AiEbookForm */ \"(app-pages-browser)/./components/pages/sections/AiEbookForm.tsx\");\n/* harmony import */ var _utils_ToastMessages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/ToastMessages */ \"(app-pages-browser)/./utils/ToastMessages.tsx\");\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./components/ui/card.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction AiEbookPage() {\n    _s();\n    const [submittedData, setSubmittedData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [content, setContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [images, setImages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    async function handleSubmit(values) {\n        console.log(\"\\uD83D\\uDE80 ~ handleSubmit ~ values:\", values);\n        console.log(\"\\uD83D\\uDE80 ~ handleSubmit ~ !values.level && values.audience.length === 0 && !values.theme:\", !values.level && values.audience.length === 0 && !values.theme);\n        if (values.audience.length === 0) {\n            (0,_utils_ToastMessages__WEBPACK_IMPORTED_MODULE_3__.fail)(\"Please Define All Values\");\n            return;\n        }\n        try {\n            // const res = await Axios.post(\"/ebook/ai\", {\n            //   prompt: {\n            //     title: values.title,\n            //     audience: `${values.audience.concat()}`,\n            //     theme: `${values.theme.concat()}`,\n            //     level: values.level[0].toLowerCase(),\n            //   },\n            // });\n            // const image = await Axios.post(\"/images/ai\", {\n            //   userId: 1,\n            //   imagedetails: {\n            //     title: values.title,\n            //     size: values.size,\n            //     noOfImagesL: 1,\n            //   },\n            //   imagesurl: { url: values.imagesurl },\n            // });\n            // setImages(image?.data?.message?.imagesurl?.url);\n            // setSubmittedData(values as any);\n            // setContent(res?.data?.message?.content);\n            (0,_utils_ToastMessages__WEBPACK_IMPORTED_MODULE_3__.success)(\"Successfully Created\");\n        } catch (err) {\n            console.log(err);\n            (0,_utils_ToastMessages__WEBPACK_IMPORTED_MODULE_3__.fail)(\"Submission failed\");\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        className: \"container pt-24\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_pages_sections_AiEbookForm__WEBPACK_IMPORTED_MODULE_2__.AiEbookForm, {\n                onSubmit: handleSubmit\n            }, void 0, false, {\n                fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                lineNumber: 65,\n                columnNumber: 7\n            }, this),\n            submittedData && content && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.Card, {\n                className: \"mt-8\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardHeader, {\n                        className: \"text-primary text-2xl\",\n                        children: \"Submitted eBook\"\n                    }, void 0, false, {\n                        fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                        lineNumber: 68,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardContent, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                className: \"text-xl font-bold\",\n                                children: submittedData.title\n                            }, void 0, false, {\n                                fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                                lineNumber: 72,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex justify-center\",\n                                children: (images === null || images === void 0 ? void 0 : images.length) > 0 && images.map((item, key)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                        className: \"rounded-md\",\n                                        src: item,\n                                        alt: \"\".concat(key),\n                                        width: 500,\n                                        height: 500\n                                    }, key, false, {\n                                        fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                                        lineNumber: 76,\n                                        columnNumber: 19\n                                    }, this))\n                            }, void 0, false, {\n                                fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                                lineNumber: 73,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Theme: \",\n                                    submittedData.theme\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                                lineNumber: 86,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Audience: \",\n                                    submittedData.audience\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                                lineNumber: 87,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Difficulty: \",\n                                    submittedData.level\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                                lineNumber: 88,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"Ebook:\"\n                            }, void 0, false, {\n                                fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                                lineNumber: 89,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: content ? content : \"Sorry! Something went wrong\"\n                            }, void 0, false, {\n                                fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                                lineNumber: 90,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                        lineNumber: 71,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n                lineNumber: 67,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/zayn/Applications/Ai-Project-Frontend/app/ebook/page.tsx\",\n        lineNumber: 64,\n        columnNumber: 5\n    }, this);\n}\n_s(AiEbookPage, \"ZaSsrU6gdU25Yjim84pJZeF/Bnk=\");\n_c = AiEbookPage;\nvar _c;\n$RefreshReg$(_c, \"AiEbookPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9lYm9vay9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ2lDO0FBSWdCO0FBRUs7QUFFZTtBQUN0QztBQVdoQixTQUFTUTs7SUFDdEIsTUFBTSxDQUFDQyxlQUFlQyxpQkFBaUIsR0FBR1YsK0NBQVFBLENBQXFCO0lBQ3ZFLE1BQU0sQ0FBQ1csU0FBU0MsV0FBVyxHQUFHWiwrQ0FBUUEsQ0FBUztJQUMvQyxNQUFNLENBQUNhLFFBQVFDLFVBQVUsR0FBR2QsK0NBQVFBLENBQVcsRUFBRTtJQUNqRCxlQUFlZSxhQUFhQyxNQUF5QztRQUNuRUMsUUFBUUMsR0FBRyxDQUFDLHlDQUErQkY7UUFDM0NDLFFBQVFDLEdBQUcsQ0FDVCxpR0FDQSxDQUFDRixPQUFPRyxLQUFLLElBQUlILE9BQU9JLFFBQVEsQ0FBQ0MsTUFBTSxLQUFLLEtBQUssQ0FBQ0wsT0FBT00sS0FBSztRQUVoRSxJQUFJTixPQUFPSSxRQUFRLENBQUNDLE1BQU0sS0FBSyxHQUFHO1lBQ2hDbEIsMERBQUlBLENBQUM7WUFDTDtRQUNGO1FBQ0EsSUFBSTtZQUNGLDhDQUE4QztZQUM5QyxjQUFjO1lBQ2QsMkJBQTJCO1lBQzNCLCtDQUErQztZQUMvQyx5Q0FBeUM7WUFDekMsNENBQTRDO1lBQzVDLE9BQU87WUFDUCxNQUFNO1lBQ04saURBQWlEO1lBQ2pELGVBQWU7WUFDZixvQkFBb0I7WUFDcEIsMkJBQTJCO1lBQzNCLHlCQUF5QjtZQUN6QixzQkFBc0I7WUFDdEIsT0FBTztZQUNQLDBDQUEwQztZQUMxQyxNQUFNO1lBQ04sbURBQW1EO1lBQ25ELG1DQUFtQztZQUNuQywyQ0FBMkM7WUFDM0NELDZEQUFPQSxDQUFDO1FBQ1YsRUFBRSxPQUFPcUIsS0FBSztZQUNaTixRQUFRQyxHQUFHLENBQUNLO1lBQ1pwQiwwREFBSUEsQ0FBQztRQUNQO0lBQ0Y7SUFDQSxxQkFDRSw4REFBQ3FCO1FBQVFDLFdBQVU7OzBCQUNqQiw4REFBQ3hCLCtFQUFXQTtnQkFBQ3lCLFVBQVVYOzs7Ozs7WUFDdEJOLGlCQUFpQkUseUJBQ2hCLDhEQUFDUCxxREFBSUE7Z0JBQUNxQixXQUFVOztrQ0FDZCw4REFBQ25CLDJEQUFVQTt3QkFBQ21CLFdBQVU7a0NBQXdCOzs7Ozs7a0NBRzlDLDhEQUFDcEIsNERBQVdBOzswQ0FDViw4REFBQ3NCO2dDQUFHRixXQUFVOzBDQUFxQmhCLGNBQWNtQixLQUFLOzs7Ozs7MENBQ3RELDhEQUFDQztnQ0FBSUosV0FBVTswQ0FDWlosQ0FBQUEsbUJBQUFBLDZCQUFBQSxPQUFRUSxNQUFNLElBQUcsS0FDaEJSLE9BQU9pQixHQUFHLENBQUMsQ0FBQ0MsTUFBTUMsb0JBQ2hCLDhEQUFDekIsa0RBQUtBO3dDQUVKa0IsV0FBVTt3Q0FDVlEsS0FBS0Y7d0NBQ0xHLEtBQUssR0FBTyxPQUFKRjt3Q0FDUkcsT0FBTzt3Q0FDUEMsUUFBUTt1Q0FMSEo7Ozs7Ozs7Ozs7MENBU2IsOERBQUNLOztvQ0FBRTtvQ0FBUTVCLGNBQWNhLEtBQUs7Ozs7Ozs7MENBQzlCLDhEQUFDZTs7b0NBQUU7b0NBQVc1QixjQUFjVyxRQUFROzs7Ozs7OzBDQUNwQyw4REFBQ2lCOztvQ0FBRTtvQ0FBYTVCLGNBQWNVLEtBQUs7Ozs7Ozs7MENBQ25DLDhEQUFDa0I7MENBQUU7Ozs7OzswQ0FDSCw4REFBQ0E7MENBQUcxQixVQUFVQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNcEM7R0ExRXdCSDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvZWJvb2svcGFnZS50c3g/MzExNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBBaUVib29rRm9ybSxcbiAgZm9ybUFpRWJvb2tTY2hlbWEsXG59IGZyb20gXCJAL2NvbXBvbmVudHMvcGFnZXMvc2VjdGlvbnMvQWlFYm9va0Zvcm1cIjtcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5pbXBvcnQgeyBzdWNjZXNzLCBmYWlsIH0gZnJvbSBcIkAvdXRpbHMvVG9hc3RNZXNzYWdlc1wiO1xuaW1wb3J0IHsgQXhpb3MgfSBmcm9tIFwiQC91dGlscy9BeGlvc1wiO1xuaW1wb3J0IHsgQ2FyZCwgQ2FyZENvbnRlbnQsIENhcmRIZWFkZXIgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2NhcmRcIjtcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xuXG50eXBlIGVib29rU2NoZW1hID0ge1xuICB0aGVtZTpcbiAgICB8IFtcIkRyYW1hXCIsIFwiVGhyaWxsZXJcIiwgXCJUcmFnaWNcIiwgXCJBZHZlbnR1cmVcIiwgXCJDb21lZHlcIiwgXCJIb3Jyb3JcIiwgXCJHb3JlXCJdO1xuICB0aXRsZTogU3RyaW5nO1xuICBjb250ZW50OiBTdHJpbmc7XG4gIGF1ZGllbmNlOiBbXCJBZHVsdHNcIiwgXCJUZWVuc1wiLCBcIkNoaWxkcmVuXCJdO1xuICBsZXZlbDogXCJCZWdpbm5lclwiIHwgXCJJbnRlcm1lZGlhdGVcIiB8IFwiUHJvZmVzc2lvbmFsXCI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBaUVib29rUGFnZSgpIHtcbiAgY29uc3QgW3N1Ym1pdHRlZERhdGEsIHNldFN1Ym1pdHRlZERhdGFdID0gdXNlU3RhdGU8ZWJvb2tTY2hlbWEgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2NvbnRlbnQsIHNldENvbnRlbnRdID0gdXNlU3RhdGU8U3RyaW5nPihcIlwiKTtcbiAgY29uc3QgW2ltYWdlcywgc2V0SW1hZ2VzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdCh2YWx1ZXM6IHouaW5mZXI8dHlwZW9mIGZvcm1BaUVib29rU2NoZW1hPikge1xuICAgIGNvbnNvbGUubG9nKFwi8J+agCB+IGhhbmRsZVN1Ym1pdCB+IHZhbHVlczpcIiwgdmFsdWVzKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwi8J+agCB+IGhhbmRsZVN1Ym1pdCB+ICF2YWx1ZXMubGV2ZWwgJiYgdmFsdWVzLmF1ZGllbmNlLmxlbmd0aCA9PT0gMCAmJiAhdmFsdWVzLnRoZW1lOlwiLFxuICAgICAgIXZhbHVlcy5sZXZlbCAmJiB2YWx1ZXMuYXVkaWVuY2UubGVuZ3RoID09PSAwICYmICF2YWx1ZXMudGhlbWVcbiAgICApO1xuICAgIGlmICh2YWx1ZXMuYXVkaWVuY2UubGVuZ3RoID09PSAwKSB7XG4gICAgICBmYWlsKFwiUGxlYXNlIERlZmluZSBBbGwgVmFsdWVzXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gY29uc3QgcmVzID0gYXdhaXQgQXhpb3MucG9zdChcIi9lYm9vay9haVwiLCB7XG4gICAgICAvLyAgIHByb21wdDoge1xuICAgICAgLy8gICAgIHRpdGxlOiB2YWx1ZXMudGl0bGUsXG4gICAgICAvLyAgICAgYXVkaWVuY2U6IGAke3ZhbHVlcy5hdWRpZW5jZS5jb25jYXQoKX1gLFxuICAgICAgLy8gICAgIHRoZW1lOiBgJHt2YWx1ZXMudGhlbWUuY29uY2F0KCl9YCxcbiAgICAgIC8vICAgICBsZXZlbDogdmFsdWVzLmxldmVsWzBdLnRvTG93ZXJDYXNlKCksXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyB9KTtcbiAgICAgIC8vIGNvbnN0IGltYWdlID0gYXdhaXQgQXhpb3MucG9zdChcIi9pbWFnZXMvYWlcIiwge1xuICAgICAgLy8gICB1c2VySWQ6IDEsXG4gICAgICAvLyAgIGltYWdlZGV0YWlsczoge1xuICAgICAgLy8gICAgIHRpdGxlOiB2YWx1ZXMudGl0bGUsXG4gICAgICAvLyAgICAgc2l6ZTogdmFsdWVzLnNpemUsXG4gICAgICAvLyAgICAgbm9PZkltYWdlc0w6IDEsXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIGltYWdlc3VybDogeyB1cmw6IHZhbHVlcy5pbWFnZXN1cmwgfSxcbiAgICAgIC8vIH0pO1xuICAgICAgLy8gc2V0SW1hZ2VzKGltYWdlPy5kYXRhPy5tZXNzYWdlPy5pbWFnZXN1cmw/LnVybCk7XG4gICAgICAvLyBzZXRTdWJtaXR0ZWREYXRhKHZhbHVlcyBhcyBhbnkpO1xuICAgICAgLy8gc2V0Q29udGVudChyZXM/LmRhdGE/Lm1lc3NhZ2U/LmNvbnRlbnQpO1xuICAgICAgc3VjY2VzcyhcIlN1Y2Nlc3NmdWxseSBDcmVhdGVkXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIGZhaWwoXCJTdWJtaXNzaW9uIGZhaWxlZFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJjb250YWluZXIgcHQtMjRcIj5cbiAgICAgIDxBaUVib29rRm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSAvPlxuICAgICAge3N1Ym1pdHRlZERhdGEgJiYgY29udGVudCAmJiAoXG4gICAgICAgIDxDYXJkIGNsYXNzTmFtZT1cIm10LThcIj5cbiAgICAgICAgICA8Q2FyZEhlYWRlciBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgdGV4dC0yeGxcIj5cbiAgICAgICAgICAgIFN1Ym1pdHRlZCBlQm9va1xuICAgICAgICAgIDwvQ2FyZEhlYWRlcj5cbiAgICAgICAgICA8Q2FyZENvbnRlbnQ+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGRcIj57c3VibWl0dGVkRGF0YS50aXRsZX08L2gzPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgIHtpbWFnZXM/Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICBpbWFnZXMubWFwKChpdGVtLCBrZXkpID0+IChcbiAgICAgICAgICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1tZFwiXG4gICAgICAgICAgICAgICAgICAgIHNyYz17aXRlbX1cbiAgICAgICAgICAgICAgICAgICAgYWx0PXtgJHtrZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezUwMH1cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXs1MDB9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cD5UaGVtZToge3N1Ym1pdHRlZERhdGEudGhlbWV9PC9wPlxuICAgICAgICAgICAgPHA+QXVkaWVuY2U6IHtzdWJtaXR0ZWREYXRhLmF1ZGllbmNlfTwvcD5cbiAgICAgICAgICAgIDxwPkRpZmZpY3VsdHk6IHtzdWJtaXR0ZWREYXRhLmxldmVsfTwvcD5cbiAgICAgICAgICAgIDxwPkVib29rOjwvcD5cbiAgICAgICAgICAgIDxwPntjb250ZW50ID8gY29udGVudCA6IFwiU29ycnkhIFNvbWV0aGluZyB3ZW50IHdyb25nXCJ9PC9wPlxuICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiQWlFYm9va0Zvcm0iLCJzdWNjZXNzIiwiZmFpbCIsIkNhcmQiLCJDYXJkQ29udGVudCIsIkNhcmRIZWFkZXIiLCJJbWFnZSIsIkFpRWJvb2tQYWdlIiwic3VibWl0dGVkRGF0YSIsInNldFN1Ym1pdHRlZERhdGEiLCJjb250ZW50Iiwic2V0Q29udGVudCIsImltYWdlcyIsInNldEltYWdlcyIsImhhbmRsZVN1Ym1pdCIsInZhbHVlcyIsImNvbnNvbGUiLCJsb2ciLCJsZXZlbCIsImF1ZGllbmNlIiwibGVuZ3RoIiwidGhlbWUiLCJlcnIiLCJzZWN0aW9uIiwiY2xhc3NOYW1lIiwib25TdWJtaXQiLCJoMyIsInRpdGxlIiwiZGl2IiwibWFwIiwiaXRlbSIsImtleSIsInNyYyIsImFsdCIsIndpZHRoIiwiaGVpZ2h0IiwicCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/ebook/page.tsx\n"));

/***/ })

});