import React, { useState } from "react";
import { HeaderAdmin, Listview } from "../Components/index";
import { Helmet } from 'react-helmet';
const Dashboard = () => {
    return (
        <>
            <Helmet>
                <title>Admin dashboard</title>
            </Helmet>
            <HeaderAdmin />
            <Listview />
        </>
    );
}

export default Dashboard;