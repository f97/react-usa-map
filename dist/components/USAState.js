(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.USAState = mod.exports;
  }
})(this, function (exports, _react) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function useDims(ref) {
    var isSvg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _useState = (0, _react.useState)({
      height: 0,
      width: 0,
      top: 0,
      left: 0
    }),
        _useState2 = _slicedToArray(_useState, 2),
        dim = _useState2[0],
        setDim = _useState2[1];

    (0, _react.useLayoutEffect)(function () {
      if (ref && ref.current) {
        var _ref$current$getBBox = ref.current.getBBox(),
            height = _ref$current$getBBox.height,
            width = _ref$current$getBBox.width,
            x = _ref$current$getBBox.x,
            y = _ref$current$getBBox.y;

        setDim({
          height: height,
          width: width,
          top: y,
          left: x
        });
      }
    }, [ref]);

    return dim;
  };

  var USAState = function USAState(props) {
    // pull translation from dimensions first Move command
    var dimensions = props.dimensions.split(" ");
    var groupOffset = dimensions[0].replace("M", "");
    var groupDimensions = "M0,0 " + dimensions.slice(1).join(" ");

    // get rendered dimensions
    var stateRef = _react2.default.useRef(null);

    var _useDims = useDims(stateRef),
        width = _useDims.width,
        height = _useDims.height,
        top = _useDims.top,
        left = _useDims.left;

    var offset = props.offset;

    var textX, textY;
    if (offset) {
      textX = left + width / 2 + offset.x;
      textY = top + height / 2 + offset.y;
    } else {
      textX = left + width / 2;
      textY = top + height / 2;
    }

    return _react2.default.createElement(
      "g",
      { ref: stateRef, id: props.state, transform: "translate(" + groupOffset + ")", width: width, height: height },
      _react2.default.createElement(
        "path",
        { d: groupDimensions, fill: props.fill, stroke: props.stroke, "data-name": props.state, className: props.state + " state", onClick: props.onClickState, onMouseOver: props.onMouseOverState },
        _react2.default.createElement(
          "title",
          null,
          props.stateName
        )
      ),
      _react2.default.createElement(
        "text",
        { textAnchor: "middle", style: { pointerEvents: "none" }, x: textX, y: textY },
        props.state
      )
    );
  };
  exports.default = USAState;
});