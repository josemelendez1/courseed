const Container = ({ ...props }) => {
    return (
        <div
            className={`container mx-auto ${props.className ? props.className : ""}`}>
            {props.children}
        </div>
    );
}

export default Container;