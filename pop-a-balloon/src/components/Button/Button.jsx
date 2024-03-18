/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const Button = ({ width, onClick, children }) => {
    const widthMap = {
        wide: "btn--wide",
        full: "btn--full"
    };
    const buttonClassName = `btn ${widthMap[width] || ""}`;
    return (
        <button className={buttonClassName} onClick={onClick}>
            {children}
        </button>
    );
};
export default Button;