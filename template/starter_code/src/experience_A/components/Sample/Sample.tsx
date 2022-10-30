import React, { useState } from "react";
import styles from "./Sample.module.css";

const Sample = () => {
	const [clicked, isClicked] = useState(false);
	return (
		<div
			className={styles.sample_style}
		>
			<h1>
				Hello PERS <span className={styles.span_text} onClick={() => isClicked(!clicked)}>{ clicked ? ":)" : "CLICK ME" }</span>
			</h1>
		</div>
	);
};

export default Sample;