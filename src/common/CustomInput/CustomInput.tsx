import './customInput.css';
const CustomInput = ({ placeholder = "", type, size }: { placeholder?: string, type?: string, size?: string }) => {
    return (
        <input className={` ${size === "big" ? "custom-big-input" : (size === "medium" ? "custom-medium-input" : "custom-small-input")}`} placeholder={placeholder} type={type} />
    );
}
export default CustomInput;