import "./sensorInfoBlock.css"
interface SensorInfoBlockProps {
    headerHeight: number;
    currentDeviceName: string;
    currentDeviceNumber: number;
    currentDeviceImage: string;
    versionPo: string;
    versionAp: string | null;
    sn: string | null;
    imageClassName: string | undefined;
}

const SensorInfoBlock = ({ headerHeight, currentDeviceName, currentDeviceNumber, currentDeviceImage, versionPo, versionAp, sn, imageClassName }: SensorInfoBlockProps) => {
    return (
        <div className="sensor-info-block" style={{ marginTop: `${headerHeight}px` }}>
            <div>
                <img className={imageClassName} src={currentDeviceImage} alt="logo2084" />
            </div>
            <div className="sensor-info">
                <div>
                    <span>
                        {currentDeviceName} № {currentDeviceNumber}
                    </span>
                    {sn && <span>S/N: {sn}</span>}
                </div>
                <div>
                    <span>Версия ПО - {versionPo}</span>
                    {versionAp && <span>Версия АЧ - {versionAp}</span>}
                </div>
            </div>
        </div>
    )
}

export default SensorInfoBlock;

