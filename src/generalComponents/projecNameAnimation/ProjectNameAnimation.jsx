import "./ProjectNameAnimation.css";

const ProjectNameAnimation = ({ text, style }) => {   
    return (
        <div 
            class="gradient-text"
            style={style}
        >
            {text}
        </div>
    );
};

export default ProjectNameAnimation;