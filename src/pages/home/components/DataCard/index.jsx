import { Card } from "antd";
import * as Icon from '@ant-design/icons';
import { createElement } from "react";
import styles from  "./index.module.scss";

const iconToElement = (name) => createElement(Icon[name]);
const DataCard = ({name,value,icon,color}) => {
    return (
        <Card >
            <div className={styles.container}>

                <div className={styles.icon_box} style={{ backgroundColor: color }}>
                    {iconToElement(icon)}
                </div>
                <div className={styles.detail}>
                    <p className={styles.num}>¥{value}</p>
                    <p className={styles.txt}>{name}</p>
                </div>
            </div>
        </Card>
    )
}

export default DataCard;