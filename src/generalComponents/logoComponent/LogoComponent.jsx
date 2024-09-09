import './LogoComponent.css';

const LogoComponent = ({
    className = "",
    width = "320px"
}) => {
    return (
        <div className={`logo ${className}`}
             style={{width: width}}
        >
            <img src='src/assets/img/logo_new.webp' alt="Logo" />
        </div>
    );
};

export default LogoComponent;