import React from "react";

const Button = ({ onClick, title, loading }) => {
    if (loading) {
        return <button className="btn-primary" disabled>Loading...</button>
    }
    return (
        <button className="btn-primary" onClick={onClick}>{title}</button>
    )
}

export default Button;