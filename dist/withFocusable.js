'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _lifecycle = require('recompose/lifecycle');

var _lifecycle2 = _interopRequireDefault(_lifecycle);

var _withHandlers = require('recompose/withHandlers');

var _withHandlers2 = _interopRequireDefault(_withHandlers);

var _withContext = require('recompose/withContext');

var _withContext2 = _interopRequireDefault(_withContext);

var _withStateHandlers = require('recompose/withStateHandlers');

var _withStateHandlers2 = _interopRequireDefault(_withStateHandlers);

var _getContext = require('recompose/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _mapProps = require('recompose/mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

var _spatialNavigation = require('./spatialNavigation');

var _spatialNavigation2 = _interopRequireDefault(_spatialNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable react/no-find-dom-node */


var omitProps = function omitProps(keys) {
  return (0, _mapProps2.default)(function (props) {
    return (0, _omit2.default)(props, keys);
  });
};

var withFocusable = function withFocusable() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$forgetLastFocuse = _ref.forgetLastFocusedChild,
      configForgetLastFocusedChild = _ref$forgetLastFocuse === undefined ? false : _ref$forgetLastFocuse,
      _ref$trackChildren = _ref.trackChildren,
      configTrackChildren = _ref$trackChildren === undefined ? false : _ref$trackChildren;

  return (0, _compose2.default)((0, _getContext2.default)({
    /**
     * From the context provided by another higher-level 'withFocusable' component
     */
    parentFocusKey: _propTypes2.default.string
  }), (0, _withStateHandlers2.default)(function (_ref2) {
    var focusKey = _ref2.focusKey,
        parentFocusKey = _ref2.parentFocusKey;

    var realFocusKey = focusKey || (0, _uniqueId2.default)('sn:focusable-item-');

    return {
      realFocusKey: realFocusKey,

      /**
       * This method is used to imperatively set focus to a component.
       * It is blocked in the Native mode because the native engine decides what to focus by itself.
       */
      setFocus: _spatialNavigation2.default.isNativeMode() ? _noop2.default : _spatialNavigation2.default.setFocus.bind(null, realFocusKey),

      navigateByDirection: _spatialNavigation2.default.navigateByDirection,

      /**
       * In Native mode this is the only way to mark component as focused.
       * This method always steals focus onto current component no matter which arguments are passed in.
       */
      stealFocus: _spatialNavigation2.default.setFocus.bind(null, realFocusKey, realFocusKey),
      focused: false,
      hasFocusedChild: false,
      parentFocusKey: parentFocusKey || _spatialNavigation.ROOT_FOCUS_KEY
    };
  }, {
    onUpdateFocus: function onUpdateFocus() {
      return function () {
        var focused = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return {
          focused: focused
        };
      };
    },
    onUpdateHasFocusedChild: function onUpdateHasFocusedChild() {
      return function () {
        var hasFocusedChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return {
          hasFocusedChild: hasFocusedChild
        };
      };
    }
  }),

  /**
   * Propagate own 'focusKey' as a 'parentFocusKey' to it's children
   */
  (0, _withContext2.default)({
    parentFocusKey: _propTypes2.default.string
  }, function (_ref3) {
    var realFocusKey = _ref3.realFocusKey;
    return {
      parentFocusKey: realFocusKey
    };
  }), (0, _withHandlers2.default)({
    onEnterPressHandler: function onEnterPressHandler(_ref4) {
      var _ref4$onEnterPress = _ref4.onEnterPress,
          onEnterPress = _ref4$onEnterPress === undefined ? _noop2.default : _ref4$onEnterPress,
          rest = _objectWithoutProperties(_ref4, ['onEnterPress']);

      return function () {
        onEnterPress(rest);
      };
    },
    onArrowPressHandler: function onArrowPressHandler(_ref5) {
      var _ref5$onArrowPress = _ref5.onArrowPress,
          onArrowPress = _ref5$onArrowPress === undefined ? _noop2.default : _ref5$onArrowPress,
          rest = _objectWithoutProperties(_ref5, ['onArrowPress']);

      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return onArrowPress.apply(undefined, args.concat([rest]));
      };
    },
    onBecameFocusedHandler: function onBecameFocusedHandler(_ref6) {
      var _ref6$onBecameFocused = _ref6.onBecameFocused,
          onBecameFocused = _ref6$onBecameFocused === undefined ? _noop2.default : _ref6$onBecameFocused,
          rest = _objectWithoutProperties(_ref6, ['onBecameFocused']);

      return function (layout) {
        onBecameFocused(layout, rest);
      };
    },
    pauseSpatialNavigation: function pauseSpatialNavigation() {
      return _spatialNavigation2.default.pause;
    },
    resumeSpatialNavigation: function resumeSpatialNavigation() {
      return _spatialNavigation2.default.resume;
    }
  }), (0, _lifecycle2.default)({
    componentDidMount: function componentDidMount() {
      var _props = this.props,
          focusKey = _props.realFocusKey,
          parentFocusKey = _props.parentFocusKey,
          preferredChildFocusKey = _props.preferredChildFocusKey,
          _props$forgetLastFocu = _props.forgetLastFocusedChild,
          forgetLastFocusedChild = _props$forgetLastFocu === undefined ? false : _props$forgetLastFocu,
          onEnterPressHandler = _props.onEnterPressHandler,
          onArrowPressHandler = _props.onArrowPressHandler,
          onBecameFocusedHandler = _props.onBecameFocusedHandler,
          onUpdateFocus = _props.onUpdateFocus,
          onUpdateHasFocusedChild = _props.onUpdateHasFocusedChild,
          trackChildren = _props.trackChildren,
          _props$focusable = _props.focusable,
          focusable = _props$focusable === undefined ? true : _props$focusable;


      var node = _spatialNavigation2.default.isNativeMode() ? this : (0, _reactDom.findDOMNode)(this);

      _spatialNavigation2.default.addFocusable({
        focusKey: focusKey,
        node: node,
        parentFocusKey: parentFocusKey,
        preferredChildFocusKey: preferredChildFocusKey,
        onEnterPressHandler: onEnterPressHandler,
        onArrowPressHandler: onArrowPressHandler,
        onBecameFocusedHandler: onBecameFocusedHandler,
        onUpdateFocus: onUpdateFocus,
        onUpdateHasFocusedChild: onUpdateHasFocusedChild,
        forgetLastFocusedChild: configForgetLastFocusedChild || forgetLastFocusedChild,
        trackChildren: configTrackChildren || trackChildren,
        focusable: focusable
      });
    },
    componentDidUpdate: function componentDidUpdate(prevProps) {
      var _props2 = this.props,
          focused = _props2.focused,
          focusKey = _props2.realFocusKey,
          onBecameFocusedHandler = _props2.onBecameFocusedHandler,
          preferredChildFocusKey = _props2.preferredChildFocusKey,
          _props2$focusable = _props2.focusable,
          focusable = _props2$focusable === undefined ? true : _props2$focusable;


      var node = _spatialNavigation2.default.isNativeMode() ? this : (0, _reactDom.findDOMNode)(this);

      _spatialNavigation2.default.updateFocusable(focusKey, {
        node: node,
        preferredChildFocusKey: preferredChildFocusKey,
        focusable: focusable
      });

      if (!prevProps.focused && focused) {
        onBecameFocusedHandler(_spatialNavigation2.default.getNodeLayoutByFocusKey(focusKey));
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      var focusKey = this.props.realFocusKey;


      _spatialNavigation2.default.removeFocusable({
        focusKey: focusKey
      });
    }
  }), _pure2.default, omitProps(['onBecameFocusedHandler', 'onEnterPressHandler', 'onArrowPressHandler', 'onUpdateFocus', 'onUpdateHasFocusedChild', 'forgetLastFocusedChild', 'trackChildren']));
};

exports.default = withFocusable;