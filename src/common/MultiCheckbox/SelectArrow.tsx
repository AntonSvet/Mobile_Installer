const SelectArrow = (isOpen: any) => {
    return (
        <div
            style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                transition: "transform 0.3s ease",
                transformOrigin: "center",
                color: "black"
            }}
        >
            <svg
                style={{
                    transform: !isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s ease",

                }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0e0e0e"
                strokeWidth="2"
            >
                <path
                    d="M6 9L12 15L18 9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}
export default SelectArrow;
