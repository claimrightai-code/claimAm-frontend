"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_ssr_app_agent_components_AgentSearchParams_tsx";
exports.ids = ["_ssr_app_agent_components_AgentSearchParams_tsx"];
exports.modules = {

/***/ "(ssr)/./app/agent/components/AgentSearchParams.tsx":
/*!****************************************************!*\
  !*** ./app/agent/components/AgentSearchParams.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AgentSearchParams)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"(ssr)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nfunction AgentSearchParams({ onOpenLogin }) {\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useSearchParams)();\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"AgentSearchParams.useEffect\": ()=>{\n            const action = searchParams?.get(\"action\");\n            const email = searchParams?.get(\"email\") || \"\";\n            if (action === \"login\") {\n                onOpenLogin(email);\n                if (false) {}\n            }\n        }\n    }[\"AgentSearchParams.useEffect\"], [\n        searchParams,\n        onOpenLogin\n    ]);\n    return null;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9hcHAvYWdlbnQvY29tcG9uZW50cy9BZ2VudFNlYXJjaFBhcmFtcy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs2REFFeUM7QUFDUztBQUVuQyxTQUFTRyxrQkFBa0IsRUFDeENDLFdBQVcsRUFHWjtJQUNDLE1BQU1DLGVBQWVILGdFQUFlQTtJQUVwQ0QsZ0RBQVNBO3VDQUFDO1lBQ1IsTUFBTUssU0FBU0QsY0FBY0UsSUFBSTtZQUNqQyxNQUFNQyxRQUFRSCxjQUFjRSxJQUFJLFlBQVk7WUFFNUMsSUFBSUQsV0FBVyxTQUFTO2dCQUN0QkYsWUFBWUk7Z0JBRVosSUFBSSxLQUE2REcsRUFBRSxFQUVsRTtZQUNIO1FBQ0Y7c0NBQUc7UUFBQ047UUFBY0Q7S0FBWTtJQUU5QixPQUFPO0FBQ1QiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcRmFtaWx5XFxPbmVEcml2ZVxcRGVza3RvcFxcQ29kZXhcXG5ldyBjbGFpbVxcY2xhaW1BbS1mcm9udGVuZFxcYXBwXFxhZ2VudFxcY29tcG9uZW50c1xcQWdlbnRTZWFyY2hQYXJhbXMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VTZWFyY2hQYXJhbXMgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBZ2VudFNlYXJjaFBhcmFtcyh7XHJcbiAgb25PcGVuTG9naW4sXHJcbn06IHtcclxuICBvbk9wZW5Mb2dpbjogKGVtYWlsPzogc3RyaW5nKSA9PiB2b2lkO1xyXG59KSB7XHJcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdXNlU2VhcmNoUGFyYW1zKCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSBzZWFyY2hQYXJhbXM/LmdldChcImFjdGlvblwiKTtcclxuICAgIGNvbnN0IGVtYWlsID0gc2VhcmNoUGFyYW1zPy5nZXQoXCJlbWFpbFwiKSB8fCBcIlwiO1xyXG5cclxuICAgIGlmIChhY3Rpb24gPT09IFwibG9naW5cIikge1xyXG4gICAgICBvbk9wZW5Mb2dpbihlbWFpbCk7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuaGlzdG9yeT8ucmVwbGFjZVN0YXRlKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIFwiL2FnZW50XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW3NlYXJjaFBhcmFtcywgb25PcGVuTG9naW5dKTtcclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU2VhcmNoUGFyYW1zIiwiQWdlbnRTZWFyY2hQYXJhbXMiLCJvbk9wZW5Mb2dpbiIsInNlYXJjaFBhcmFtcyIsImFjdGlvbiIsImdldCIsImVtYWlsIiwid2luZG93IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./app/agent/components/AgentSearchParams.tsx\n");

/***/ })

};
;