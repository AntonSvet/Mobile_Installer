import './customInput.css';
const CustomInput = ({ placeholder = "" }: { placeholder?: string }) => {
    return (
        <input className={` ${placeholder?.length ? "custom-medium-input" : "custom-small-input"}`} placeholder={placeholder} />
    );
}
export default CustomInput;