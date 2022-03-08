import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import {BrowserRouter, Link, Routes} from "react-router-dom";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div
            style={{
                marginLeft: 0,
            }}
        >

            {/*<BrowserRouter>*/}
            {/*    <nav>*/}
            {/*        <li><Link to='/'>Users</Link></li>*/}
            {/*        <li><Link to='/projects'>Projects</Link></li>*/}
            {/*        <li><Link to='/todos'>Todos</Link></li>*/}
            {/*    </nav>*/}
            {/*</BrowserRouter>*/}

            <h2>Menu</h2>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                open
            </Button>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                onClose={handleClose}
                open={Boolean(anchorEl)}
            >
                <BrowserRouter>

                        <MenuItem onClick={handleClose}><Link to='/'>Users</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to='/projects'>Projects</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to='/todos'>Todos</Link></MenuItem>
                        {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}

                </BrowserRouter>
            </Menu>
        </div>
    );
};

export default Navbar;