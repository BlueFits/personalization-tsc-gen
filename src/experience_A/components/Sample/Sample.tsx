import React, { useState } from "react";
import styles from "./Sample.module.css";

import AvatarIcon from "../../../assets/avatar-cap-fashion-svgrepo-com.svg";

const Sample = () => {
	const [clicked, isClicked] = useState(false);
	return (
		<div
			className={styles.sample_style}
		>
			<AvatarIcon />
			<h1>
				Hello PERS <span className={styles.span_text} onClick={() => isClicked(!clicked)}>{ clicked ? ":)" : "CLICK ME" }</span>
			</h1>
		</div>
	);
};

export default Sample;