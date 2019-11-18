import React from "react";
// import { Link } from "react-router-dom";

import { Breadcrumb } from "antd";

//const breadcrumbNameMap = {};

export default function AppBreadcrumb(props) {
  //props
  const { location, history } = props;

  if (location.pathname !== "/") {
    return (
      <Breadcrumb.Item key="home">
        <a onClick={() => history.goBack()}>返回</a>
      </Breadcrumb.Item>
    );
  } else {
    return null;
  }
  // const pathSnippets = location.pathname.split("/").filter(i => i);
  // const extraBreadcrumbItems = [];
  // pathSnippets.map((_, index) => {
  //   const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
  //   return (
  //     <Breadcrumb.Item key={url}>
  //       <Link to={url}>{breadcrumbNameMap[url]}</Link>
  //     </Breadcrumb.Item>
  //   );
  // });
  // const breadcrumbItems = [
  //   <Breadcrumb.Item key="home">
  //     <Link to="/">Home</Link>
  //   </Breadcrumb.Item>
  // ].concat(extraBreadcrumbItems);
  // return (
  //   <Breadcrumb style={{ marginBottom: 20 }}>{breadcrumbItems}</Breadcrumb>
  // );
}
