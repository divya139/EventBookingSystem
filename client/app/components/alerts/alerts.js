import React, { Component } from "react";
import swal from "sweetalert";

export function alert(title, message, icon) {
  swal({
    title: title,
    text: message,
    icon: icon
  });
}
