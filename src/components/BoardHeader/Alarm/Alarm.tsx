import styles from "./Alarm.module.css";

interface AlarmProps {
  digits: [number, number, number];
}

export default function Alarm({ digits }: AlarmProps) {
  return (
    <div className={styles.alarmContainer}>
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
