/**
 * Created by Totooria Hyperion on 2016/10/11.
 */

let _frontJSVersion = "{front_version}";
let _orderJSHost = "testserver/api/";
let _qiniuDomain = "http://7xlovk.com2.z0.glb.qiniucdn.com/";

//测试服
//_orderJSHost = "192.168.10.220/ebooking/";

//配置
_frontJSVersion = "{front_version}";
_qiniuDomain = "http://7xlovk.com2.z0.glb.qiniucdn.com/";

window.qiniuDomain = _qiniuDomain;

export const frontJSVersion = _frontJSVersion;
export const orderJSHost = _orderJSHost;
export const qiniuDomain = _qiniuDomain;

export default {
	frontJSVersion: _frontJSVersion,
	orderJSHost: _orderJSHost,
	qiniuDomain: _qiniuDomain
}