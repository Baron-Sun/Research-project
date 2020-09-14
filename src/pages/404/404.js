import React from "react";
import { Result, Button } from "antd"
import { withRouter } from "react-router-dom";

const Page404 = (props) => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, Need to log in again"
            extra={<Button type="primary" onClick={() => props.history.push('/')}>Back Home</Button>}
        />
    )
}

export default withRouter(Page404)