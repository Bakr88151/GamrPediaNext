"use client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

export default function Nav_bar(){

    const user = localStorage.getItem("user");
    const login_logout_styles = {
        color: "red",
        marginRight: "20px",
        marginLeft: "auto",
        fontWeight:"bold"
    }

    const logout_function = () => {
        localStorage.removeItem("user");
        window.location.href = '/';
    }

    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{color:'white'}}>
            <div class="container-fluid">
                <a class="navbar-brand" href="#">GamePedia</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">Home</a>
                    </li>
                </ul>
                {
                        user?(
                            <li class="d-flex" style={login_logout_styles}>
                            <a class="nav-link" href="#" onClick={logout_function}>Logout</a>
                            </li>
                        ):
                        (
                            <li class="d-flex" style={{...login_logout_styles, color:"white"}}>
                            <a class="nav-link" href="/login">Login</a>
                            </li>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}