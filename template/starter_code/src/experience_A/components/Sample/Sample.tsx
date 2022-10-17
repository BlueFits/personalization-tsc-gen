import React, { useState } from "react";
import "./styles.css";

const Sample = () => {
	const [clicked, isClicked] = useState(false);
	return (
		<div
		className="sample_style"
		>
			<h1>
				Hello PERS <span className="span_text" onClick={() => isClicked(!clicked)}>{ clicked ? ":)" : "CLICK ME" }</span>
			</h1>
		</div>
	);
};

export default Sample;