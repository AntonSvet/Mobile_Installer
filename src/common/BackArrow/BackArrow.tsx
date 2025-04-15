import { IoIosArrowBack } from 'react-icons/io';
import './backArrow.css';
const BackArrow = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
    return (
        <div onClick={handleCloseModal} className="back-arrow">
            <IoIosArrowBack className="back-arrow-icons" />
        </div>
    );
}
export default BackArrow;