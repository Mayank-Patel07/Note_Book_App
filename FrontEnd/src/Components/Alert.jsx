import React from "react";

export default function Alert(props) {
  return (
    <div style={{ height: "45px" }}>
      {/* props.alert means if props is pass to the Alert then show the alert other wise not */}
      {props.Alert && (
        <div>
          <div
            className={`alert alert-${props.Alert.alerttype} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{props.Alert.alertmsg}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
