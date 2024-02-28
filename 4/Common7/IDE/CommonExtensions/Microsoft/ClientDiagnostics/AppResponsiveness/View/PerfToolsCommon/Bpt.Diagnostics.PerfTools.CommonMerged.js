// 
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/enumHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Enum = void 0;
    class Enum {
        static GetName(enumType, value) {
            var result;
            if (enumType) {
                for (var enumKey in enumType) {
                    if (enumType.hasOwnProperty(enumKey)) {
                        var enumValue = enumType[enumKey];
                        if (enumValue === value) {
                            result = enumKey;
                            break;
                        }
                    }
                }
            }
            if (!result) {
                result = value.toString();
            }
            return result;
        }
        static Parse(enumType, name, ignoreCase = true) {
            var result;
            if (enumType) {
                if (ignoreCase) {
                    name = name.toLowerCase();
                }
                for (var enumKey in enumType) {
                    if (enumType.hasOwnProperty(enumKey)) {
                        var compareAginst = enumKey.toString();
                        if (ignoreCase) {
                            compareAginst = compareAginst.toLowerCase();
                        }
                        if (name === compareAginst) {
                            result = enumType[enumKey];
                            break;
                        }
                    }
                }
            }
            return result;
        }
        static GetValues(enumType) {
            var result = [];
            if (enumType) {
                for (var enumKey in enumType) {
                    if (enumType.hasOwnProperty(enumKey)) {
                        var enumValue = enumType[enumKey];
                        if (typeof enumValue === "number") {
                            result.push(enumValue);
                        }
                    }
                }
            }
            return result;
        }
    }
    exports.Enum = Enum;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/eventHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Publisher = void 0;
    /**
     * List of supported events.
     */
    class Publisher {
        /**
         * constructor
         * @param events List of supported events.
         */
        constructor(events) {
            /**
             * List of all registered events.
             */
            this._events = {};
            this._listeners = {};
            if (events && events.length > 0) {
                for (var i = 0; i < events.length; i++) {
                    var type = events[i];
                    if (type) {
                        this._events[type] = type;
                    }
                }
            }
            else {
                throw Error("Events are null or empty.");
            }
        }
        /**
         * Add event Listener
         * @param eventType Event type.
         * @param func Callback function.
         */
        addEventListener(eventType, func) {
            if (eventType && func) {
                var type = this._events[eventType];
                if (type) {
                    var callbacks = this._listeners[type] ? this._listeners[type] : this._listeners[type] = [];
                    callbacks.push(func);
                }
            }
        }
        /**
         * Remove event Listener
         * @param eventType Event type.
         * @param func Callback function.
         */
        removeEventListener(eventType, func) {
            if (eventType && func) {
                var callbacks = this._listeners[eventType];
                if (callbacks) {
                    for (var i = 0; i < callbacks.length; i++) {
                        if (func === callbacks[i]) {
                            callbacks.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
        /**
         * Invoke event Listener
         * @param args Event argument.
         */
        invokeListener(args) {
            if (args.type) {
                var callbacks = this._listeners[args.type];
                if (callbacks) {
                    for (var i = 0; i < callbacks.length; i++) {
                        var func = callbacks[i];
                        if (func) {
                            func(args);
                        }
                    }
                }
            }
        }
    }
    exports.Publisher = Publisher;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/formattingHelpers", ["require", "exports", "plugin-vs-v2"], function (require, exports, Plugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormattingHelpers = void 0;
    class FormattingHelpers {
        static getDecimalLocaleString(numberToConvert, includeGroupSeparators, signficantDigits) {
            var numberString = Math.abs(numberToConvert).toString();
            // Get any exponent
            var split = numberString.split(/e/i);
            numberString = split[0];
            var exponent = (split.length > 1 ? parseInt(split[1], 10) : 0);
            // Get any decimal place
            split = numberString.split(".");
            numberString = (numberToConvert < 0 ? "-" : "") + split[0];
            // Get whole value
            var right = split.length > 1 ? split[1] : "";
            if (exponent > 0) {
                right = FormattingHelpers.zeroPad(right, exponent, false);
                numberString += right.slice(0, exponent);
                right = right.substr(exponent);
            }
            else if (exponent < 0) {
                exponent = -exponent;
                numberString = FormattingHelpers.zeroPad(numberString, exponent + 1, true);
                right = numberString.slice(-exponent, numberString.length) + right;
                numberString = numberString.slice(0, -exponent);
            }
            // Number format
            var nf = Plugin.Culture.numberFormat;
            if (!nf) {
                nf = { numberDecimalSeparator: ".", numberGroupSizes: [3], numberGroupSeparator: "," };
            }
            if (signficantDigits) {
                right = right.padEnd(signficantDigits, "0");
            }
            if (right.length > 0) {
                right = nf.numberDecimalSeparator + right;
            }
            // Grouping (e.g. 10,000)
            if (includeGroupSeparators === true) {
                var groupSizes = nf.numberGroupSizes, sep = nf.numberGroupSeparator, curSize = groupSizes[0], curGroupIndex = 1, stringIndex = numberString.length - 1, ret = "";
                while (stringIndex >= 0) {
                    if (curSize === 0 || curSize > stringIndex) {
                        if (ret.length > 0) {
                            return numberString.slice(0, stringIndex + 1) + sep + ret + right;
                        }
                        else {
                            return numberString.slice(0, stringIndex + 1) + right;
                        }
                    }
                    if (ret.length > 0) {
                        ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1) + sep + ret;
                    }
                    else {
                        ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1);
                    }
                    stringIndex -= curSize;
                    if (curGroupIndex < groupSizes.length) {
                        curSize = groupSizes[curGroupIndex];
                        curGroupIndex++;
                    }
                }
                return numberString.slice(0, stringIndex + 1) + sep + ret + right;
            }
            else {
                return numberString + right;
            }
        }
        static stripNewLine(text) {
            return text.replace(/[\r?\n]/g, "");
        }
        static zeroPad(stringToPad, newLength, padLeft) {
            var zeros = [];
            for (var i = stringToPad.length; i < newLength; i++) {
                zeros.push("0");
            }
            return (padLeft ? (zeros.join("") + stringToPad) : (stringToPad + zeros.join("")));
        }
    }
    exports.FormattingHelpers = FormattingHelpers;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/hostShell", ["require", "exports", "plugin-vs-v2"], function (require, exports, Plugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LocalHostShell = exports.HostShellProxy = void 0;
    //
    // HostDisplayProxy provides access to the Display which is implemented in the host
    //
    class HostShellProxy {
        constructor() {
            this._hostShellProxy = Plugin.JSONMarshaler.attachToMarshaledObject("Microsoft.VisualStudio.WebClient.Diagnostics.PerformanceToolHost.Package.Extensions.Core.HostShell", {}, true);
        }
        setStatusBarText(text, highlight) {
            return this._hostShellProxy._call("setStatusBarText", text, highlight || false);
        }
    }
    exports.HostShellProxy = HostShellProxy;
    //
    // LocalDisplay implements a local display object without the need to use the host
    //
    class LocalHostShell {
        setStatusBarText(statusText, highlight) {
            return Promise.resolve(null);
        }
    }
    exports.LocalHostShell = LocalHostShell;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenExtractor = exports.AssignmentRegexGroup = exports.HtmlRegexGroup = exports.TokenType = void 0;
    var TokenType;
    (function (TokenType) {
        TokenType[TokenType["General"] = 0] = "General";
        TokenType[TokenType["String"] = 1] = "String";
        TokenType[TokenType["Number"] = 2] = "Number";
        TokenType[TokenType["Html"] = 3] = "Html";
        TokenType[TokenType["HtmlTagName"] = 4] = "HtmlTagName";
        TokenType[TokenType["HtmlTagDelimiter"] = 5] = "HtmlTagDelimiter";
        TokenType[TokenType["HtmlAttributeName"] = 6] = "HtmlAttributeName";
        TokenType[TokenType["HtmlAttributeValue"] = 7] = "HtmlAttributeValue";
        TokenType[TokenType["EqualOperator"] = 8] = "EqualOperator";
    })(TokenType = exports.TokenType || (exports.TokenType = {}));
    var HtmlRegexGroup;
    (function (HtmlRegexGroup) {
        HtmlRegexGroup[HtmlRegexGroup["PreHtmlString"] = 1] = "PreHtmlString";
        HtmlRegexGroup[HtmlRegexGroup["StartDelimiter"] = 2] = "StartDelimiter";
        HtmlRegexGroup[HtmlRegexGroup["TagName"] = 3] = "TagName";
        HtmlRegexGroup[HtmlRegexGroup["IdAttribute"] = 4] = "IdAttribute";
        HtmlRegexGroup[HtmlRegexGroup["IdEqualToToken"] = 5] = "IdEqualToToken";
        HtmlRegexGroup[HtmlRegexGroup["IdAttributeValue"] = 6] = "IdAttributeValue";
        HtmlRegexGroup[HtmlRegexGroup["ClassAttribute"] = 7] = "ClassAttribute";
        HtmlRegexGroup[HtmlRegexGroup["ClassEqualToToken"] = 8] = "ClassEqualToToken";
        HtmlRegexGroup[HtmlRegexGroup["ClassAttributeValue"] = 9] = "ClassAttributeValue";
        HtmlRegexGroup[HtmlRegexGroup["SrcAttribute"] = 10] = "SrcAttribute";
        HtmlRegexGroup[HtmlRegexGroup["SrcEqualToToken"] = 11] = "SrcEqualToToken";
        HtmlRegexGroup[HtmlRegexGroup["SrcAttributeValue"] = 12] = "SrcAttributeValue";
        HtmlRegexGroup[HtmlRegexGroup["EndDelimiter"] = 13] = "EndDelimiter";
        HtmlRegexGroup[HtmlRegexGroup["PostHtmlString"] = 14] = "PostHtmlString";
    })(HtmlRegexGroup = exports.HtmlRegexGroup || (exports.HtmlRegexGroup = {}));
    var AssignmentRegexGroup;
    (function (AssignmentRegexGroup) {
        AssignmentRegexGroup[AssignmentRegexGroup["LeftHandSide"] = 1] = "LeftHandSide";
        AssignmentRegexGroup[AssignmentRegexGroup["EqualToOperator"] = 2] = "EqualToOperator";
        AssignmentRegexGroup[AssignmentRegexGroup["RightHandSide"] = 3] = "RightHandSide";
        AssignmentRegexGroup[AssignmentRegexGroup["PostString"] = 4] = "PostString";
    })(AssignmentRegexGroup = exports.AssignmentRegexGroup || (exports.AssignmentRegexGroup = {}));
    class TokenExtractor {
        static getHtmlTokens(text) {
            var tokenTypeMap = [];
            if (!text) {
                return tokenTypeMap;
            }
            var tokens = TokenExtractor.HTML_REGEX.exec(text);
            if (tokens) {
                // First token - tokens[0] is the entire matched string, skip it.
                if (tokens[HtmlRegexGroup.PreHtmlString]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[HtmlRegexGroup.PreHtmlString].toString() });
                }
                if (tokens[HtmlRegexGroup.StartDelimiter]) {
                    tokenTypeMap.push({ type: TokenType.HtmlTagDelimiter, value: tokens[HtmlRegexGroup.StartDelimiter].toString() });
                }
                if (tokens[HtmlRegexGroup.TagName]) {
                    tokenTypeMap.push({ type: TokenType.HtmlTagName, value: tokens[HtmlRegexGroup.TagName].toString() });
                }
                if (tokens[HtmlRegexGroup.IdAttribute]) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeName, value: tokens[HtmlRegexGroup.IdAttribute].toString() });
                }
                if (tokens[HtmlRegexGroup.IdEqualToToken]) {
                    tokenTypeMap.push({ type: TokenType.EqualOperator, value: tokens[HtmlRegexGroup.IdEqualToToken].toString() });
                }
                if (tokens[HtmlRegexGroup.IdAttributeValue] !== undefined) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeValue, value: tokens[HtmlRegexGroup.IdAttributeValue].toString() });
                }
                if (tokens[HtmlRegexGroup.ClassAttribute]) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeName, value: tokens[HtmlRegexGroup.ClassAttribute].toString() });
                }
                if (tokens[HtmlRegexGroup.ClassEqualToToken]) {
                    tokenTypeMap.push({ type: TokenType.EqualOperator, value: tokens[HtmlRegexGroup.ClassEqualToToken].toString() });
                }
                if (tokens[HtmlRegexGroup.ClassAttributeValue] !== undefined) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeValue, value: tokens[HtmlRegexGroup.ClassAttributeValue].toString() });
                }
                if (tokens[HtmlRegexGroup.SrcAttribute]) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeName, value: tokens[HtmlRegexGroup.SrcAttribute].toString() });
                }
                if (tokens[HtmlRegexGroup.SrcEqualToToken]) {
                    tokenTypeMap.push({ type: TokenType.EqualOperator, value: tokens[HtmlRegexGroup.SrcEqualToToken].toString() });
                }
                if (tokens[HtmlRegexGroup.SrcAttributeValue] !== undefined) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeValue, value: tokens[HtmlRegexGroup.SrcAttributeValue].toString() });
                }
                if (tokens[HtmlRegexGroup.EndDelimiter]) {
                    tokenTypeMap.push({ type: TokenType.HtmlTagDelimiter, value: tokens[HtmlRegexGroup.EndDelimiter].toString() });
                }
                if (tokens[HtmlRegexGroup.PostHtmlString]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[HtmlRegexGroup.PostHtmlString].toString() });
                }
            }
            else {
                // If for some reason regex fails just mark it as general token so that the object doesn't go missing
                tokenTypeMap.push({ type: TokenType.General, value: text });
            }
            return tokenTypeMap;
        }
        static getStringTokens(text) {
            var tokenTypeMap = [];
            if (!text) {
                return tokenTypeMap;
            }
            var tokens = TokenExtractor.STRING_REGEX.exec(text);
            if (tokens) {
                if (tokens[AssignmentRegexGroup.LeftHandSide]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.LeftHandSide].toString() });
                }
                if (tokens[AssignmentRegexGroup.EqualToOperator]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.EqualToOperator].toString() });
                }
                if (tokens[AssignmentRegexGroup.RightHandSide]) {
                    tokenTypeMap.push({ type: TokenType.String, value: tokens[AssignmentRegexGroup.RightHandSide].toString() });
                }
                if (tokens[AssignmentRegexGroup.PostString]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.PostString].toString() });
                }
            }
            else {
                tokenTypeMap.push({ type: TokenType.General, value: text });
            }
            return tokenTypeMap;
        }
        static getNumberTokens(text) {
            var tokenTypeMap = [];
            if (!text) {
                return tokenTypeMap;
            }
            var tokens = TokenExtractor.NUMBER_REGEX.exec(text);
            if (tokens) {
                if (tokens[AssignmentRegexGroup.LeftHandSide]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.LeftHandSide].toString() });
                }
                if (tokens[AssignmentRegexGroup.EqualToOperator]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.EqualToOperator].toString() });
                }
                if (tokens[AssignmentRegexGroup.RightHandSide]) {
                    tokenTypeMap.push({ type: TokenType.Number, value: tokens[AssignmentRegexGroup.RightHandSide].toString() });
                }
                if (tokens[AssignmentRegexGroup.PostString]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.PostString].toString() });
                }
            }
            else {
                tokenTypeMap.push({ type: TokenType.General, value: text });
            }
            return tokenTypeMap;
        }
        static getCssClass(tokenType) {
            switch (tokenType) {
                case TokenType.String:
                    return "valueStringToken-String";
                case TokenType.Number:
                    return "valueStringToken-Number";
                case TokenType.HtmlTagName:
                    return "perftools-Html-Element-Tag";
                case TokenType.HtmlAttributeName:
                    return "perftools-Html-Attribute";
                case TokenType.HtmlAttributeValue:
                    return "perftools-Html-Value";
                case TokenType.HtmlTagDelimiter:
                    return "perftools-Html-Tag";
                case TokenType.EqualOperator:
                    return "perftools-Html-Operator";
                default:
                    return "";
            }
        }
        static isHtmlExpression(text) {
            return TokenExtractor.GENERAL_HTML_REGEX.test(text);
        }
        static isStringExpression(text) {
            return TokenExtractor.STRING_REGEX.test(text);
        }
    }
    exports.TokenExtractor = TokenExtractor;
    TokenExtractor.GENERAL_HTML_REGEX = /^<.*>/;
    TokenExtractor.HTML_REGEX = /(^.*)?(<)([^\s]+)(?:( id)(=)(\".*?\"))?(?:( class)(=)(\".*?\"))?(?:( src)(=)(\".*?\"))?(>)(.*$)?/;
    TokenExtractor.NUMBER_REGEX = /(.*)?(=)( ?-?\d+(?:.\d+)?)(.*$)?/;
    TokenExtractor.STRING_REGEX = /(^.*?)(=)( ?\".*\")(.*$)?/;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/Notifications", ["require", "exports", "plugin-vs-v2"], function (require, exports, Plugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Notifications = void 0;
    class Notifications {
        static get isTestMode() {
            return window["TestMode"];
        }
        static get notifications() {
            if (!Notifications._notifications) {
                Notifications._notifications = new Plugin.EventManager(null);
            }
            return Notifications._notifications;
        }
        static subscribe(type, listener) {
            if (Notifications.isTestMode) {
                Notifications.notifications.addEventListener(type, listener);
            }
        }
        static unsubscribe(type, listener) {
            if (Notifications.isTestMode) {
                Notifications.notifications.removeEventListener(type, listener);
            }
        }
        static subscribeOnce(type, listener) {
            if (Notifications.isTestMode) {
                function onNotify() {
                    Notifications.unsubscribe(type, onNotify);
                    listener.apply(this, arguments);
                }
                Notifications.subscribe(type, onNotify);
            }
        }
        static notify(type, details) {
            if (Notifications.isTestMode) {
                Notifications.notifications.dispatchEvent(type, details);
            }
        }
    }
    exports.Notifications = Notifications;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/controls/SourceInfoTooltip", ["require", "exports", "plugin-vs-v2", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/formattingHelpers"], function (require, exports, Plugin, formattingHelpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SourceInfoTooltip = void 0;
    class SourceInfoTooltip {
        constructor(sourceInfo, name, nameLabelResourceId) {
            this._rootContainer = document.createElement("div");
            this._rootContainer.className = "sourceInfoTooltip";
            if (name && nameLabelResourceId) {
                this.addDiv("sourceInfoNameLabel", Plugin.Resources.getString(nameLabelResourceId));
                this.addDiv("sourceInfoName", name);
            }
            this.addDiv("sourceInfoFileLabel", Plugin.Resources.getString("SourceInfoFileLabel"));
            this.addDiv("sourceInfoFile", sourceInfo.source);
            this.addDiv("sourceInfoLineLabel", Plugin.Resources.getString("SourceInfoLineLabel"));
            this.addDiv("sourceInfoLine", formattingHelpers_1.FormattingHelpers.getDecimalLocaleString(sourceInfo.line, /*includeGroupSeparators=*/ true));
            this.addDiv("sourceInfoColumnLabel", Plugin.Resources.getString("SourceInfoColumnLabel"));
            this.addDiv("sourceInfoColumn", formattingHelpers_1.FormattingHelpers.getDecimalLocaleString(sourceInfo.column, /*includeGroupSeparators=*/ true));
        }
        get html() {
            return this._rootContainer.outerHTML;
        }
        addDiv(className, textContent) {
            var div = document.createElement("div");
            div.className = className;
            div.textContent = textContent;
            this._rootContainer.appendChild(div);
        }
    }
    exports.SourceInfoTooltip = SourceInfoTooltip;
});
//
// Copyright (C) Microsoft. All rights reserved.
//s
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/controls/API", ["require", "exports", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/controls/SourceInfoTooltip"], function (require, exports, SourceInfoTooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SourceInfoTooltip = void 0;
    Object.defineProperty(exports, "SourceInfoTooltip", { enumerable: true, get: function () { return SourceInfoTooltip_1.SourceInfoTooltip; } });
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("Bpt.Diagnostics.PerfTools.Common", ["require", "exports", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/enumHelper", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/eventHelper", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/formattingHelpers", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/hostShell", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/hostShell", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/Notifications", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/controls/API"], function (require, exports, enumHelper_1, eventHelper_1, formattingHelpers_2, hostShell_1, hostShell_2, TokenExtractor_1, TokenExtractor_2, TokenExtractor_3, TokenExtractor_4, Notifications_1, Controls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Controls = exports.Notifications = exports.TokenExtractor = exports.AssignmentRegexGroup = exports.HtmlRegexGroup = exports.TokenType = exports.LocalHostShell = exports.HostShellProxy = exports.FormattingHelpers = exports.Publisher = exports.Enum = void 0;
    Object.defineProperty(exports, "Enum", { enumerable: true, get: function () { return enumHelper_1.Enum; } });
    Object.defineProperty(exports, "Publisher", { enumerable: true, get: function () { return eventHelper_1.Publisher; } });
    Object.defineProperty(exports, "FormattingHelpers", { enumerable: true, get: function () { return formattingHelpers_2.FormattingHelpers; } });
    Object.defineProperty(exports, "HostShellProxy", { enumerable: true, get: function () { return hostShell_1.HostShellProxy; } });
    Object.defineProperty(exports, "LocalHostShell", { enumerable: true, get: function () { return hostShell_2.LocalHostShell; } });
    Object.defineProperty(exports, "TokenType", { enumerable: true, get: function () { return TokenExtractor_1.TokenType; } });
    Object.defineProperty(exports, "HtmlRegexGroup", { enumerable: true, get: function () { return TokenExtractor_2.HtmlRegexGroup; } });
    Object.defineProperty(exports, "AssignmentRegexGroup", { enumerable: true, get: function () { return TokenExtractor_3.AssignmentRegexGroup; } });
    Object.defineProperty(exports, "TokenExtractor", { enumerable: true, get: function () { return TokenExtractor_4.TokenExtractor; } });
    Object.defineProperty(exports, "Notifications", { enumerable: true, get: function () { return Notifications_1.Notifications; } });
    exports.Controls = Controls;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
//# sourceMappingURL=Bpt.Diagnostics.PerfTools.CommonMerged.js.map
// SIG // Begin signature block
// SIG // MIIoOQYJKoZIhvcNAQcCoIIoKjCCKCYCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // HRZWwKguevM8ZV4l3BWf/bAa/CDjAcwuOdmy4uwkE4+g
// SIG // gg2FMIIGAzCCA+ugAwIBAgITMwAAA64tNVHIU49VHQAA
// SIG // AAADrjANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMTExNjE5MDg1OVoX
// SIG // DTI0MTExNDE5MDg1OVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 9CD8pjY3wxCoPmMhOkow7ycCltfqYnqk4wGNApzh2dTY
// SIG // +YqxozWTzJUOB38VxsgFQmXBFhOMdrGYGpvO9kdbNPkw
// SIG // HpTrW6hZqFuLLiRwGKEx4ZM5zVSqbHJuX2fPfUJ0Xmb+
// SIG // VrVsGw/BwBV2zz0rVtiSgqj3GeeGOsG7llfWyrSjyJqm
// SIG // 5DHE3o04BAI/NuhkHOv04euiqJGvHFCL8+fXvyD9OAxq
// SIG // 4fcJKtoyBb0PBA3oMNQeCsiUyLO+voZqVTOUsAWY0bN5
// SIG // YjkK4nq5DVaNdVrrowd5AX9gmz6D/TJTssns6pDCG00Y
// SIG // +Dh3ipWpnVmkhYcByyUSEKX3PLC8DkiAQQIDAQABo4IB
// SIG // gjCCAX4wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFIcf73Spl4cHOFoll27H9COd
// SIG // 4fE/MFQGA1UdEQRNMEukSTBHMS0wKwYDVQQLEyRNaWNy
// SIG // b3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQx
// SIG // FjAUBgNVBAUTDTIzMDAxMis1MDE4MzYwHwYDVR0jBBgw
// SIG // FoAUSG5k5VAF04KqFzc3IrVtqMp1ApUwVAYDVR0fBE0w
// SIG // SzBJoEegRYZDaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraW9wcy9jcmwvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNybDBhBggrBgEFBQcBAQRVMFMwUQYIKwYB
// SIG // BQUHMAKGRWh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNydDAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQBqyWA1Eu7PKNMjaaxl0V7gJ0XBysUo
// SIG // xZluMHJXFE2LEGZIZ2zMLYVjOnAGG/4dluRjSrZZo/8v
// SIG // wk4Xt8v6NBB9ofo8H1P/XidHytWTv9lg9MYu++6lPmu5
// SIG // fCozD3cI2NLZPW2BBhGX2D0R8tQBj0FbmZRuIucpiQ7D
// SIG // K3CHKlfKcc7MP8pPzuMv55Tox8+KFQD1NG6+bfbYA/BN
// SIG // PBkg4tyOh+exbaHfcNuodDJUIjq9dF6oa+Yjy0u0pUMI
// SIG // /B1t+8m6rJo0KSoZlrpesYl0jRhpt+hmqx8uENXoGJcY
// SIG // ZVJ5N2Skq90LViKNRhi9N4U+e8c4y9uXyomUF/6viCPJ
// SIG // 7huTNEJo75ehIJba+IWd3txUEc0R3y6DT6txC6cW1nR/
// SIG // LTbo9I/8fQq538G5IvJ+e5iSiOSVVkVk0i5m03Awy5E2
// SIG // ZSS4PVdQSCcFxmN4tpEfYuR7AAy/GJVtIDFlUpSgdXok
// SIG // pSui5hYtK1R9enXXvo+U/xGkLRc+qp4De3dZbzu7pOq7
// SIG // V/jCyhuCw0bEIAU4urCGIip7TI6GBRzD7yPzjFIqeZY7
// SIG // S4rVW5BRn2oEqpm8Su6yTIQvMIk8x2pwYNUa2339Z4gW
// SIG // 5xW21eFA5mLpo7NRSKRQms5OgAA18aCgqOU7Ds0h6q/Y
// SIG // B4BmEAtoTMl/TBiyKaMGAlEcdy+5FIhmzojMGjCCB3ow
// SIG // ggVioAMCAQICCmEOkNIAAAAAAAMwDQYJKoZIhvcNAQEL
// SIG // BQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMT
// SIG // KU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhv
// SIG // cml0eSAyMDExMB4XDTExMDcwODIwNTkwOVoXDTI2MDcw
// SIG // ODIxMDkwOVowfjELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYG
// SIG // A1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0Eg
// SIG // MjAxMTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC
// SIG // ggIBAKvw+nIQHC6t2G6qghBNNLrytlghn0IbKmvpWlCq
// SIG // uAY4GgRJun/DDB7dN2vGEtgL8DjCmQawyDnVARQxQtOJ
// SIG // DXlkh36UYCRsr55JnOloXtLfm1OyCizDr9mpK656Ca/X
// SIG // llnKYBoF6WZ26DJSJhIv56sIUM+zRLdd2MQuA3WraPPL
// SIG // bfM6XKEW9Ea64DhkrG5kNXimoGMPLdNAk/jj3gcN1Vx5
// SIG // pUkp5w2+oBN3vpQ97/vjK1oQH01WKKJ6cuASOrdJXtjt
// SIG // 7UORg9l7snuGG9k+sYxd6IlPhBryoS9Z5JA7La4zWMW3
// SIG // Pv4y07MDPbGyr5I4ftKdgCz1TlaRITUlwzluZH9TupwP
// SIG // rRkjhMv0ugOGjfdf8NBSv4yUh7zAIXQlXxgotswnKDgl
// SIG // mDlKNs98sZKuHCOnqWbsYR9q4ShJnV+I4iVd0yFLPlLE
// SIG // tVc/JAPw0XpbL9Uj43BdD1FGd7P4AOG8rAKCX9vAFbO9
// SIG // G9RVS+c5oQ/pI0m8GLhEfEXkwcNyeuBy5yTfv0aZxe/C
// SIG // HFfbg43sTUkwp6uO3+xbn6/83bBm4sGXgXvt1u1L50kp
// SIG // pxMopqd9Z4DmimJ4X7IvhNdXnFy/dygo8e1twyiPLI9A
// SIG // N0/B4YVEicQJTMXUpUMvdJX3bvh4IFgsE11glZo+TzOE
// SIG // 2rCIF96eTvSWsLxGoGyY0uDWiIwLAgMBAAGjggHtMIIB
// SIG // 6TAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQUSG5k
// SIG // 5VAF04KqFzc3IrVtqMp1ApUwGQYJKwYBBAGCNxQCBAwe
// SIG // CgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB
// SIG // /wQFMAMBAf8wHwYDVR0jBBgwFoAUci06AjGQQ7kUBU7h
// SIG // 6qfHMdEjiTQwWgYDVR0fBFMwUTBPoE2gS4ZJaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNy
// SIG // bDBeBggrBgEFBQcBAQRSMFAwTgYIKwYBBQUHMAKGQmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMv
// SIG // TWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNydDCB
// SIG // nwYDVR0gBIGXMIGUMIGRBgkrBgEEAYI3LgMwgYMwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvZG9jcy9wcmltYXJ5Y3BzLmh0bTBABggr
// SIG // BgEFBQcCAjA0HjIgHQBMAGUAZwBhAGwAXwBwAG8AbABp
// SIG // AGMAeQBfAHMAdABhAHQAZQBtAGUAbgB0AC4gHTANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEAZ/KGpZjgVHkaLtPYdGcimwuW
// SIG // EeFjkplCln3SeQyQwWVfLiw++MNy0W2D/r4/6ArKO79H
// SIG // qaPzadtjvyI1pZddZYSQfYtGUFXYDJJ80hpLHPM8QotS
// SIG // 0LD9a+M+By4pm+Y9G6XUtR13lDni6WTJRD14eiPzE32m
// SIG // kHSDjfTLJgJGKsKKELukqQUMm+1o+mgulaAqPyprWElj
// SIG // HwlpblqYluSD9MCP80Yr3vw70L01724lruWvJ+3Q3fMO
// SIG // r5kol5hNDj0L8giJ1h/DMhji8MUtzluetEk5CsYKwsat
// SIG // ruWy2dsViFFFWDgycScaf7H0J/jeLDogaZiyWYlobm+n
// SIG // t3TDQAUGpgEqKD6CPxNNZgvAs0314Y9/HG8VfUWnduVA
// SIG // KmWjw11SYobDHWM2l4bf2vP48hahmifhzaWX0O5dY0Hj
// SIG // Wwechz4GdwbRBrF1HxS+YWG18NzGGwS+30HHDiju3mUv
// SIG // 7Jf2oVyW2ADWoUa9WfOXpQlLSBCZgB/QACnFsZulP0V3
// SIG // HjXG0qKin3p6IvpIlR+r+0cjgPWe+L9rt0uX4ut1eBrs
// SIG // 6jeZeRhL/9azI2h15q/6/IvrC4DqaTuv/DDtBEyO3991
// SIG // bWORPdGdVk5Pv4BXIqF4ETIheu9BCrE/+6jMpF3BoYib
// SIG // V3FWTkhFwELJm3ZbCoBIa/15n8G9bW1qyVJzEw16UM0x
// SIG // ghoMMIIaCAIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAADri01UchTj1UdAAAAAAOuMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCC1tKLK/t2GzSzO
// SIG // em2OxacZzcnHM6pveqPWjvPiHH3CeDBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBACE8trRlR+qnZCozfM6fM2YuP8Z/biE/
// SIG // WJGM2qWvkq3d5OrPoujPvOw07R6+adXQUeN2dBOODyAP
// SIG // V1b7aoEdrEdr/lTGF6OFmk5L2ohDpytGjrbdB6e16SHH
// SIG // goXRtrw7BCxn5RBZJmJtdUdf+GNA+mxwe/ZWc4AMsiK+
// SIG // y+fBKpZDaIGsuQi+xBWTzidWm1oIURoDqqedZsMDCd1R
// SIG // bDG07uw1VqE9SSTJb/JiUconsdVKrlOtBjS/hJjvTAn5
// SIG // MdFhrchnwLZiN030zyw3h/VZD8tXMuly0UIe1RqViqIi
// SIG // wgb5mEHLvN/N99zkUxOMGUa3F/sqYl208N3MOsyTWgCr
// SIG // w0ShgheWMIIXkgYKKwYBBAGCNwMDATGCF4Iwghd+Bgkq
// SIG // hkiG9w0BBwKgghdvMIIXawIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBUgYLKoZIhvcNAQkQAQSgggFBBIIBPTCCATkC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // POT4jemPtvQE0xju//FZOanrfRUh5fWna4ZT4j5jMIYC
// SIG // BmWfz6KFJRgTMjAyNDAxMTExODUxMzIuMTExWjAEgAIB
// SIG // 9KCB0aSBzjCByzELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjElMCMG
// SIG // A1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0aW9u
// SIG // czEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOkE0MDAt
// SIG // MDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBTZXJ2aWNloIIR7DCCByAwggUIoAMCAQIC
// SIG // EzMAAAHWJ2n/ci1WyK4AAQAAAdYwDQYJKoZIhvcNAQEL
// SIG // BQAwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwHhcN
// SIG // MjMwNTI1MTkxMjM0WhcNMjQwMjAxMTkxMjM0WjCByzEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9z
// SIG // b2Z0IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMe
// SIG // blNoaWVsZCBUU1MgRVNOOkE0MDAtMDVFMC1EOTQ3MSUw
// SIG // IwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2
// SIG // aWNlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKC
// SIG // AgEAzyzNjpvK+bt33GwxDl8nSbW5FuVN+ChWn7QvvEMj
// SIG // aqZTCM0kwtU6BNM3MHkArzyH6WLcjwd47enz0aa74cAp
// SIG // LFMPadDn5mc1jw75LeNAVErbvNd0Ja5aEXaZS89saZNv
// SIG // YyDmePqwWymmZAT2eEeC10IZJB53tGP2IfOWajDEWjFp
// SIG // ATOp1MFeWg4sF6nRPScpdItWlmGwqs8AUXTewk5QCcay
// SIG // eO6L97n/5RYPYZ1UHKkGIEa0RaQzRTDj9IMM+TY+mtuB
// SIG // mZ3BRBkZisCJi/uSlj51YL2nSUkaemaq2FdxZmwZmbbB
// SIG // dIUpVYy0DvJ8XpRle076iCEiLL9m0DIFAVRM/MBxclN/
// SIG // Ot4B4/AQmxKSc5u+XyybC9z+upSVDUTewkbHzRGx3V/3
// SIG // eo6KVThcBe6Jpk0I6VN+wP+2EdMCQ07embF1Po/8GJaP
// SIG // W9trdalLYao0bN9qBn9k0UwqEFi4SXt3ACGEZZWv4BCp
// SIG // W7gw7Bt/dusuBDBxcU47I63GRGw1sIwd8K6ddQ8oNUCn
// SIG // A8i1LNmpwaJb0MCUzdJjDrlzvLQc9tJ4P/l8PuMPlvTz
// SIG // JL1tX2mIuN+VYykWbB38SD4yM2dMH+BYm5lTyR2fmk8R
// SIG // rFST8cnQob7xgn+H3vF32GPT+ZW5/UnCnOGnU3eOBgqw
// SIG // ZSfyTrKAODrzR2Olvl3ClXCCBlsCAwEAAaOCAUkwggFF
// SIG // MB0GA1UdDgQWBBRhmlQ2O00AYjAioNvo/80U3GLGTjAf
// SIG // BgNVHSMEGDAWgBSfpxVdAF5iXYP05dJlpxtTNRnpcjBf
// SIG // BgNVHR8EWDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1pY3Jv
// SIG // c29mdC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBU
// SIG // aW1lLVN0YW1wJTIwUENBJTIwMjAxMCgxKS5jcmwwbAYI
// SIG // KwYBBQUHAQEEYDBeMFwGCCsGAQUFBzAChlBodHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01p
// SIG // Y3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEw
// SIG // KDEpLmNydDAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB/wQM
// SIG // MAoGCCsGAQUFBwMIMA4GA1UdDwEB/wQEAwIHgDANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEA1L/kYzYncCcUmzJNSL0vC38T
// SIG // TPFWlYacUdUpFvhUWOgCpJ9rNzp9vZxhFZWrW5SL9alU
// SIG // ypK1MS2DGdM/kQOppn17ntmO/2AW8zOZFHlIFNstTJm4
// SIG // p+sWnU/Q8xAnhOxOPt5Ng5mcblfhixWELKpA23vKMu/t
// SIG // wUolNvasmQGE/b0QwCz1AuWcMqD5DXym6o5d1YBU6iLm
// SIG // xEK+ejNGHTFpagqqtMlZZ/Zj24Rx81xzo2kLLq6IRwn+
// SIG // 1U/HLe/aaN+BXfF3LKpsoXSgctY3cpJ64pPhd7xJf/dK
// SIG // mqJ+TfCk2aBrThZWiRT52dg6kLW9llpH7gKBlqxkgONz
// SIG // Mpe/j2G1LK4vzazLwHfWfifRZarDMF0BcQAe7oyYuIT/
// SIG // AR/I+qpJsuLrpVOUkkGul5BJXGikGEqSXEo5I8kwyDqX
// SIG // +i2QU2hcennqKg2dJVEYYkajvtcqPLlzvPXupIAXgvLd
// SIG // VjeSE6l546HGIA78haabbFA4J0VIiNTP0JfztvfVZLTJ
// SIG // CC+9oukHeAQbK492foixJyj/XqVMKLD9Ztzdr/coV0NR
// SIG // 4rrCZetyH1yMnwSWlr0A4FNyZOHiGUq/9iiI+KbV7ePe
// SIG // gkYh04tNdZHMA6XY0CwEIgr6I9absoX8FX9huWcAabSF
// SIG // 4rzUW2t+CpA+aKphKBdckRUPOIg7H/4Isp/1yE+2GP8w
// SIG // ggdxMIIFWaADAgECAhMzAAAAFcXna54Cm0mZAAAAAAAV
// SIG // MA0GCSqGSIb3DQEBCwUAMIGIMQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMTIwMAYDVQQDEylNaWNyb3NvZnQgUm9vdCBDZXJ0
// SIG // aWZpY2F0ZSBBdXRob3JpdHkgMjAxMDAeFw0yMTA5MzAx
// SIG // ODIyMjVaFw0zMDA5MzAxODMyMjVaMHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwMIICIjANBgkqhkiG9w0BAQEF
// SIG // AAOCAg8AMIICCgKCAgEA5OGmTOe0ciELeaLL1yR5vQ7V
// SIG // gtP97pwHB9KpbE51yMo1V/YBf2xK4OK9uT4XYDP/XE/H
// SIG // ZveVU3Fa4n5KWv64NmeFRiMMtY0Tz3cywBAY6GB9alKD
// SIG // RLemjkZrBxTzxXb1hlDcwUTIcVxRMTegCjhuje3XD9gm
// SIG // U3w5YQJ6xKr9cmmvHaus9ja+NSZk2pg7uhp7M62AW36M
// SIG // EBydUv626GIl3GoPz130/o5Tz9bshVZN7928jaTjkY+y
// SIG // OSxRnOlwaQ3KNi1wjjHINSi947SHJMPgyY9+tVSP3PoF
// SIG // VZhtaDuaRr3tpK56KTesy+uDRedGbsoy1cCGMFxPLOJi
// SIG // ss254o2I5JasAUq7vnGpF1tnYN74kpEeHT39IM9zfUGa
// SIG // RnXNxF803RKJ1v2lIH1+/NmeRd+2ci/bfV+Autuqfjbs
// SIG // Nkz2K26oElHovwUDo9Fzpk03dJQcNIIP8BDyt0cY7afo
// SIG // mXw/TNuvXsLz1dhzPUNOwTM5TI4CvEJoLhDqhFFG4tG9
// SIG // ahhaYQFzymeiXtcodgLiMxhy16cg8ML6EgrXY28MyTZk
// SIG // i1ugpoMhXV8wdJGUlNi5UPkLiWHzNgY1GIRH29wb0f2y
// SIG // 1BzFa/ZcUlFdEtsluq9QBXpsxREdcu+N+VLEhReTwDwV
// SIG // 2xo3xwgVGD94q0W29R6HXtqPnhZyacaue7e3PmriLq0C
// SIG // AwEAAaOCAd0wggHZMBIGCSsGAQQBgjcVAQQFAgMBAAEw
// SIG // IwYJKwYBBAGCNxUCBBYEFCqnUv5kxJq+gpE8RjUpzxD/
// SIG // LwTuMB0GA1UdDgQWBBSfpxVdAF5iXYP05dJlpxtTNRnp
// SIG // cjBcBgNVHSAEVTBTMFEGDCsGAQQBgjdMg30BATBBMD8G
// SIG // CCsGAQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL0RvY3MvUmVwb3NpdG9yeS5odG0wEwYD
// SIG // VR0lBAwwCgYIKwYBBQUHAwgwGQYJKwYBBAGCNxQCBAwe
// SIG // CgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB
// SIG // /wQFMAMBAf8wHwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9
// SIG // lJBb186aGMQwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoG
// SIG // CCsGAQUFBwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNS
// SIG // b29DZXJBdXRfMjAxMC0wNi0yMy5jcnQwDQYJKoZIhvcN
// SIG // AQELBQADggIBAJ1VffwqreEsH2cBMSRb4Z5yS/ypb+pc
// SIG // FLY+TkdkeLEGk5c9MTO1OdfCcTY/2mRsfNB1OW27DzHk
// SIG // wo/7bNGhlBgi7ulmZzpTTd2YurYeeNg2LpypglYAA7AF
// SIG // vonoaeC6Ce5732pvvinLbtg/SHUB2RjebYIM9W0jVOR4
// SIG // U3UkV7ndn/OOPcbzaN9l9qRWqveVtihVJ9AkvUCgvxm2
// SIG // EhIRXT0n4ECWOKz3+SmJw7wXsFSFQrP8DJ6LGYnn8Atq
// SIG // gcKBGUIZUnWKNsIdw2FzLixre24/LAl4FOmRsqlb30mj
// SIG // dAy87JGA0j3mSj5mO0+7hvoyGtmW9I/2kQH2zsZ0/fZM
// SIG // cm8Qq3UwxTSwethQ/gpY3UA8x1RtnWN0SCyxTkctwRQE
// SIG // cb9k+SS+c23Kjgm9swFXSVRk2XPXfx5bRAGOWhmRaw2f
// SIG // pCjcZxkoJLo4S5pu+yFUa2pFEUep8beuyOiJXk+d0tBM
// SIG // drVXVAmxaQFEfnyhYWxz/gq77EFmPWn9y8FBSX5+k77L
// SIG // +DvktxW/tM4+pTFRhLy/AsGConsXHRWJjXD+57XQKBqJ
// SIG // C4822rpM+Zv/Cuk0+CQ1ZyvgDbjmjJnW4SLq8CdCPSWU
// SIG // 5nR0W2rRnj7tfqAxM328y+l7vzhwRNGQ8cirOoo6CGJ/
// SIG // 2XBjU02N7oJtpQUQwXEGahC0HVUzWLOhcGbyoYIDTzCC
// SIG // AjcCAQEwgfmhgdGkgc4wgcsxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xJTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVyaWNhIE9w
// SIG // ZXJhdGlvbnMxJzAlBgNVBAsTHm5TaGllbGQgVFNTIEVT
// SIG // TjpBNDAwLTA1RTAtRDk0NzElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEBMAcGBSsO
// SIG // AwIaAxUA+a9w1UaQBkKPbEy1B3gQvOzaSvqggYMwgYCk
// SIG // fjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDANBgkq
// SIG // hkiG9w0BAQsFAAIFAOlKTh0wIhgPMjAyNDAxMTExMTIz
// SIG // MDlaGA8yMDI0MDExMjExMjMwOVowdjA8BgorBgEEAYRZ
// SIG // CgQBMS4wLDAKAgUA6UpOHQIBADAJAgEAAgFVAgH/MAcC
// SIG // AQACAhJpMAoCBQDpS5+dAgEAMDYGCisGAQQBhFkKBAIx
// SIG // KDAmMAwGCisGAQQBhFkKAwKgCjAIAgEAAgMHoSChCjAI
// SIG // AgEAAgMBhqAwDQYJKoZIhvcNAQELBQADggEBAEuD1c/L
// SIG // AoL6OU5kA5MLsGOWxpuh90JK6BH2YwN0srmdCbka4o57
// SIG // YdcES603OC5jeGH/k8ZkjbQ5oEhBezS0gXvvZshzRyPn
// SIG // 5TaPyLB334TnyrNKRKORya9hU1A0h0RKA3YV75eSaUrD
// SIG // BCJ7jCOAVbrG+uIrkpbiY/sbIaWY/7txr+3IYCb2zewb
// SIG // xj4W8nt3xCoydsIeISM74rMLPSJi6tcAbcsYjuDB2acr
// SIG // H+TbGDTLxgCT82xJFUl65wmM5InS16jQY4DPTkC8ByCN
// SIG // aRM+n8l+m4rZlqJmWzzsbqRzuhuBRCYfkH7Qa/Wa6U5W
// SIG // f0wHyqZ706wGc67HXRSNRfT8bD8xggQNMIIECQIBATCB
// SIG // kzB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAA
// SIG // AdYnaf9yLVbIrgABAAAB1jANBglghkgBZQMEAgEFAKCC
// SIG // AUowGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMC8G
// SIG // CSqGSIb3DQEJBDEiBCCafb4mOPmu0KtH39SWQQ+ErHtF
// SIG // T8gdj9plZRBaW9ayLTCB+gYLKoZIhvcNAQkQAi8xgeow
// SIG // gecwgeQwgb0EINbLTQ1XeNM+EBinOEJMjZd0jMNDur+A
// SIG // K+O8P12j5ST8MIGYMIGApH4wfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHWJ2n/ci1WyK4AAQAAAdYw
// SIG // IgQgfOFkPXMZX0H/HNUDldLQZTQQhkPGSr/ej7jr6b5f
// SIG // VbYwDQYJKoZIhvcNAQELBQAEggIAgIaCJmWB3Sn16MUC
// SIG // ZpYyI7HA9YaQKk7QV1NOk6NfftC7UqARPvs33YESH60g
// SIG // LlxurjOZA+MX26IDMnykjFZp4C5qoe6TBFGa8RTcN9Y/
// SIG // u1yL8wucEIUCTXEPDowXlAVE9h4FCeSTa+fusjoA3EvG
// SIG // kHYT0PTgM6HkuTGn/9+Ai9gpJ48LTSGLpgyRf8rGauLf
// SIG // l8A4vjLHuWcjPQys27gJxgNzHKkKh/SdzUc6gqppuhcc
// SIG // gaq+b7QQGf0ZRaG+JttDD+oWTo/cOF2o6B5EwwKkqAmd
// SIG // y1dc6y7vzqG3KEzqrLkx5BAfAcy2a/vCMq/pHRRFIrp9
// SIG // 9ky56wVyavaxjAfnvmH0LS1IrXB6bmerx6/jBmjgq/nE
// SIG // DAMqJN2A/DzDXO0Fz/UTRwPcXZJJye/oEkxUNJxGILoz
// SIG // BrBPZvWUTruL3xs/Cm4DDOoKdaNnqoAv9SwR4A1bM8ev
// SIG // 9R41jliv3NQUSyLsMMvtYTxj2Ebp59avpzZyvHVbsuYr
// SIG // Yhxd0P08/kXF9dV5BpZAJbqdAVP54Rzgm2I9gvV+vhCV
// SIG // F00aUC/KxHmUXJDvt+E6YWqdhvvAdh5wMMs3AsZYCkXW
// SIG // myE8hfl4I1iWcUfrFKItNIQnfsUmDq5QTWUMO5IUGUMb
// SIG // JLUfW8BevN79rofDsyP1WTLyndgr79JpU95OcwLTLfNi
// SIG // 9VniS6E=
// SIG // End signature block
