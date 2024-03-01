import styles from "./Alarm.module.css";
import CSS from "csstype";

interface AlarmProps {
  digits: [number, number, number];
  style?: CSS.Properties;
}

export default function Alarm({ digits, style }: AlarmProps) {
  return (
    <div className={styles.alarmContainer} style={style}>
      <div className={styles.placeholder}>
        <div className={styles.digit}>8</div>
        <div className={styles.digit}>8</div>
        <div className={styles.digit}>8</div>
      </div>
      <div className={styles.alarmText}>
        <div className={styles.digit}>{digits[0]}</div>
        <div className={styles.digit}>{digits[1]}</div>
        <div className={styles.digit}>{digits[2]}</div>
      </div>
    </div>
  );
}
